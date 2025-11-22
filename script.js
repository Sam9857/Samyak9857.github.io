// scripts.js - lightweight interactions

document.addEventListener('DOMContentLoaded', () => {
  // fill current year
  document.getElementById('year').textContent = new Date().getFullYear();

  // mobile menu toggle
  const menuBtn = document.getElementById('menuBtn');
  const nav = document.getElementById('mainNav');
  menuBtn && menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    nav.style.display = expanded ? 'none' : 'flex';
  });

  // animate skill bars
  const fills = document.querySelectorAll('.bar-fill');
  setTimeout(() => {
    fills.forEach(el => {
      const fill = el.dataset.fill || '70%';
      el.style.width = fill;
    });
  }, 300);

  // simple project loader — you can replace with dynamic content
  // placeholder: nothing to do here currently
});

// Contact form handler — client-side only
function handleContact(e){
  e.preventDefault();
  const name = document.getElementById('cfName').value.trim();
  const email = document.getElementById('cfEmail').value.trim();
  const msg = document.getElementById('cfMsg').value.trim();
  if(!name || !email || !msg){ alert('Please complete all fields.'); return false; }
  alert(`Thanks ${name}! This demo site doesn't submit messages. Send an email to you@example.com or add a backend endpoint.`);
  // You can integrate with an email API, Netlify functions, or Firebase on your own.
  e.target.reset();
  return false;
}

function openMail(){
  window.location.href = 'mailto:you@example.com';
}
