(() => {
  'use strict';
  const $ = (s, c = document) => c.querySelector(s);
  const $$ = (s, c = document) => [...c.querySelectorAll(s)];

  // Mobile nav
  const toggle = $('#navToggle'), links = $('#navLinks');
  const setMenu = open => {
    links.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', open);
    toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    $('use', toggle).setAttribute('href', open ? '#i-x' : '#i-menu');
  };
  toggle.addEventListener('click', () => setMenu(!links.classList.contains('open')));
  $$('a', links).forEach(a => a.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', e => { if (e.key === 'Escape') { setMenu(false); toggle.focus(); } });

  // Scroll reveal
  const reveals = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    }), { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });
    reveals.forEach(el => io.observe(el));
  } else reveals.forEach(el => el.classList.add('in'));

  // Active nav link
  const map = new Map($$('a[href^="#"]', links).map(a => [a.getAttribute('href').slice(1), a]));
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) {
        map.forEach(a => a.classList.remove('active'));
        const a = map.get(e.target.id); if (a) a.classList.add('active');
      }
    }), { rootMargin: '-45% 0px -50% 0px' });
    $$('main section[id]').forEach(s => so.observe(s));
  }

  // Contact form -> mailto (static-site friendly)
  const form = $('#contactForm'), note = $('#formNote');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const n = form.name.value.trim(), m = form.email.value.trim(), msg = form.message.value.trim();
    if (!n || !/^\S+@\S+\.\S+$/.test(m) || !msg) { note.textContent = 'Please fill in all fields with a valid email.'; return; }
    const body = `${msg}\n\n— ${n} (${m})`;
    window.location.href = `mailto:samyakworkk@gmail.com?subject=${encodeURIComponent('Portfolio contact from ' + n)}&body=${encodeURIComponent(body)}`;
    note.textContent = 'Opening your email app…';
  });

  $('#year').textContent = new Date().getFullYear();
})();
