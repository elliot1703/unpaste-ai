import { writeFileSync } from 'node:fs';

// Reuse the existing site's public pixel configuration; previews send no events.
const pixel = /^\d+$/.test(process.env.VITE_META_PIXEL_ID || '') ? process.env.VITE_META_PIXEL_ID : '';
const script = `(() => {
  const id = ${JSON.stringify(pixel)};
  if (!id || !['unpaste.ai','www.unpaste.ai'].includes(location.hostname)) return;
  if (!window.fbq) {
    const n = window.fbq = function(){ n.callMethod ? n.callMethod.apply(n,arguments) : n.queue.push(arguments); };
    window._fbq = n; n.push = n; n.loaded = true; n.version = '2.0'; n.queue = [];
    const s = document.createElement('script'); s.async = true; s.src = 'https://connect.facebook.net/en_US/fbevents.js'; document.head.appendChild(s);
    n('init',id);
  }
  window.fbq('track','PageView');
  document.querySelectorAll('a[href^="https://calendly.com/"]').forEach(a => a.addEventListener('click', () => window.fbq('trackCustom','DiscoveryCallClick',{content_name:'one-on-one-november'})));
})();`;
writeFileSync('dist/public/november-training/analytics.js', script);
console.log('November page prepared; existing pixel configured:', Boolean(pixel));
