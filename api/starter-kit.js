import { createHmac, timingSafeEqual } from 'node:crypto';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

const files = {
  toolkit: ['toolkit.html', 'text/html; charset=utf-8'],
  planner: ['planner.html', 'text/html; charset=utf-8'],
  '01-workspace-starter.txt': ['downloads/01-workspace-starter.txt', 'text/plain; charset=utf-8'],
  '02-shared-github-setup.txt': ['downloads/02-shared-github-setup.txt', 'text/plain; charset=utf-8'],
  '03-weekly-document.txt': ['downloads/03-weekly-document.txt', 'text/plain; charset=utf-8'],
  'unpaste-workspace-starter-kit.zip': ['downloads/unpaste-workspace-starter-kit.zip', 'application/zip'],
};
const sign = (value, key) => createHmac('sha256', key).update(value).digest('hex');

export default async function handler(req, res) {
  res.setHeader('Cache-Control', 'private, no-store');
  res.setHeader('X-Content-Type-Options', 'nosniff');
  const reply = (code, body) => res.status(code).json(body);
  const key = process.env.STARTER_KIT_SIGNING_SECRET;
  if (!key || key.length < 32) return reply(503, { saved: false, error: 'temporarily unavailable' });

  if (req.method === 'GET' || req.method === 'HEAD') {
    const cookie = (req.headers.cookie || '').split(';').map(s => s.trim()).find(s => s.startsWith('starter_kit='));
    const token = cookie?.slice('starter_kit='.length) || '';
    const [expires, signature] = token.split('.');
    const valid = /^\d{10}$/.test(expires || '') && /^[a-f0-9]{64}$/.test(signature || '') &&
      Number(expires) > Date.now() / 1000 && timingSafeEqual(Buffer.from(signature), Buffer.from(sign(expires, key)));
    if (!valid) return res.redirect(303, '/one-on-one/november#starter-kit');
    const name = new URL(req.url, 'https://unpaste.ai').searchParams.get('file');
    if (!Object.hasOwn(files, name)) return reply(404, { error: 'not found' });
    try {
      const [file, type] = files[name];
      const data = await readFile(join(process.cwd(), 'private/starter-kit', file));
      res.setHeader('Content-Type', type);
      if (name.endsWith('.zip') || name.endsWith('.txt')) res.setHeader('Content-Disposition', `attachment; filename="${name}"`);
      return res.status(200).send(req.method === 'HEAD' ? '' : data);
    } catch {
      return reply(503, { error: 'resource temporarily unavailable' });
    }
  }
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'GET, HEAD, POST');
    return reply(405, { saved: false });
  }
  const allowedOrigins = ['https://unpaste.ai', 'https://www.unpaste.ai', ...(process.env.VERCEL_URL ? [`https://${process.env.VERCEL_URL}`] : [])];
  if (!allowedOrigins.includes(req.headers.origin)) return reply(403, { saved: false });
  if (!req.headers['content-type']?.startsWith('application/json')) return reply(415, { saved: false });
  if (Number(req.headers['content-length']) > 2048) return reply(413, { saved: false });
  let body;
  try { body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body; }
  catch { return reply(400, { saved: false }); }
  const email = typeof body?.email === 'string' ? body.email.trim().toLowerCase() : '';
  if (email.length > 254 || !/^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(email)) return reply(400, { saved: false, error: 'valid email required' });
  try {
    // Profile capture only: do not subscribe or trigger the separate Applied flow.
    const saved = await fetch('https://a.klaviyo.com/client/profiles?company_id=XwRedj', {
      method: 'POST',
      headers: { 'content-type': 'application/json', revision: '2024-10-15' },
      body: JSON.stringify({ data: { type: 'profile', attributes: {
        email,
        properties: {
          workspace_starter_kit_requested: true,
          workspace_starter_kit_requested_at: new Date().toISOString(),
          workspace_starter_kit_source: 'one-on-one-november',
          workspace_starter_kit_notice: 'Resource request only; no marketing subscription.',
        },
      } } }),
      signal: AbortSignal.timeout(10000),
    });
    if (!saved.ok) return reply(502, { saved: false, error: 'could not save request' });
    const expires = String(Math.floor(Date.now() / 1000) + 604800);
    res.setHeader('Set-Cookie', `starter_kit=${expires}.${sign(expires, key)}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=604800`);
    return reply(200, { saved: true });
  } catch {
    return reply(502, { saved: false, error: 'could not save request' });
  }
}
