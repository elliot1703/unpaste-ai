import test from 'node:test';
import assert from 'node:assert/strict';
import handler from '../api/starter-kit.js';

process.env.STARTER_KIT_SIGNING_SECRET = 'local-test-only-signing-key-with-32-characters';
const request = (overrides = {}) => ({ method: 'POST', url: '/api/starter-kit', headers: { origin: 'https://unpaste.ai', 'content-type': 'application/json' }, body: { email: 'starter-kit@example.test' }, ...overrides });
const response = () => ({ headers: {}, code: 0, setHeader(k,v){this.headers[k]=v;}, status(n){this.code=n;return this;}, json(v){this.body=v;return this;}, send(v){this.body=v;return this;}, redirect(n,url){this.code=n;this.location=url;return this;} });

test('resource request persists only a profile, then unlocks private files', async () => {
  const original = global.fetch;
  const calls = [];
  global.fetch = async (...args) => { calls.push(args); return new Response(null, {status:202}); };
  try {
    const res = response(); await handler(request(),res);
    assert.equal(res.code,200); assert.deepEqual(res.body,{saved:true});
    assert.equal(calls.length,1); assert.match(calls[0][0],/client\/profiles/);
    assert.equal(JSON.parse(calls[0][1].body).data.attributes.properties.workspace_starter_kit_requested,true);
    assert.match(res.headers['Set-Cookie'],/HttpOnly; Secure; SameSite=Lax/);
    const cookie = res.headers['Set-Cookie'].split(';')[0];
    for (const file of ['toolkit','planner','unpaste-workspace-starter-kit.zip']) {
      const download = response();
      await handler(request({method:'GET',url:`/api/starter-kit?file=${file}`,headers:{cookie}}),download);
      assert.equal(download.code,200); assert.ok(download.body.length>100);
    }
    const invalid = response();
    await handler(request({method:'GET',url:'/api/starter-kit?file=../../package.json',headers:{cookie}}),invalid);
    assert.equal(invalid.code,404);
  } finally { global.fetch = original; }
});

test('failed persistence never unlocks the kit', async () => {
  const original = global.fetch;
  global.fetch = async () => new Response(null,{status:429});
  try {
    const res = response(); await handler(request(),res);
    assert.equal(res.code,502); assert.equal(res.body.saved,false);
    assert.equal(res.headers['Set-Cookie'],undefined);
  } finally {global.fetch=original;}
});

test('invalid inputs, cross-site submissions and forged cookies are rejected', async () => {
  for (const [req,code] of [
    [request({body:{email:'bad'}}),400],
    [request({headers:{origin:'https://other.example','content-type':'application/json'}}),403],
    [request({method:'GET',headers:{cookie:'starter_kit=9999999999.'+'a'.repeat(64)}}),303],
    [request({method:'GET',headers:{}}),303],
  ]) {const res=response();await handler(req,res);assert.equal(res.code,code);}
});
