const form = document.querySelector('#starter-form');
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  const button = form.querySelector('button');
  const status = document.querySelector('#capture-status');
  button.disabled = true;
  status.textContent = 'Getting your kit ready…';
  try {
    const response = await fetch('/api/starter-kit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.elements.email.value.trim() })
    });
    const result = await response.json();
    if (!response.ok || result.saved !== true) throw new Error('save failed');
    form.hidden = true;
    if (window.fbq) window.fbq('track', 'Lead', { content_name: 'Workspace starter kit', content_category: 'one-on-one-november' });
    const success = document.querySelector('#kit-success');
    success.hidden = false;
    success.querySelector('a').focus();
  } catch {
    status.textContent = 'We couldn’t save your email. Please try again. Your kit hasn’t been unlocked yet.';
  } finally {
    button.disabled = false;
  }
});
