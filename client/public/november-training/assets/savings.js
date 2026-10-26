(() => {
  const form = document.querySelector('#savings-form');
  const money = value => new Intl.NumberFormat('en-AU', {
    style: 'currency', currency: 'AUD', currencyDisplay: 'code', maximumFractionDigits: 0
  }).format(value).replace('AUD', 'A$');
  const set = (id, value) => { document.getElementById(id).textContent = value; };
  const calculate = (edited = false) => {
    if (!form.checkValidity()) {
      set('savings-total', '—');
      set('savings-title', 'Enter a valid amount in each field');
      ['spend-total', 'avoided-total', 'tools-total'].forEach(id => set(id, '—'));
      return;
    }
    const read = name => Number(form.elements.namedItem(name).value);
    const annual = (read('seo') + read('content')) * 12 + read('web');
    const avoided = annual * read('share') / 100;
    const tools = read('tools') * 12;
    const difference = avoided - tools;
    set('scenario-label', edited ? 'YOUR SCENARIO' : 'ILLUSTRATIVE EXAMPLE');
    set('savings-title', difference < 0 ? 'Additional annual cost in this scenario' : 'Potential reduction in annual spend');
    set('savings-total', money(Math.abs(difference)));
    set('spend-total', money(annual));
    set('avoided-total', money(avoided));
    set('tools-total', money(tools));
    set('share-output', `(${read('share')}%)`);
  };
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('input', () => calculate(true));
  form.addEventListener('change', () => calculate(true));
  calculate();
})();
