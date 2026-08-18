// Draws tick marks down the ruler margin, spaced by pixels not fixed count,
// so it always fills the page height correctly.
function drawRuler() {
  var svg = document.querySelector('.ruler svg');
  if (!svg) return;
  var height = window.innerHeight;
  svg.setAttribute('viewBox', '0 0 44 ' + height);
  svg.setAttribute('preserveAspectRatio', 'none');

  var ns = 'http://www.w3.org/2000/svg';
  while (svg.firstChild) svg.removeChild(svg.firstChild);

  var edge = document.createElementNS(ns, 'line');
  edge.setAttribute('x1', 44); edge.setAttribute('y1', 0);
  edge.setAttribute('x2', 44); edge.setAttribute('y2', height);
  edge.setAttribute('stroke', '#B4402A');
  edge.setAttribute('stroke-width', '1');
  svg.appendChild(edge);

  var step = 40;
  var count = Math.floor(height / step);
  for (var i = 0; i <= count; i++) {
    var y = i * step;
    var major = i % 5 === 0;
    var tick = document.createElementNS(ns, 'line');
    tick.setAttribute('x1', major ? 28 : 34);
    tick.setAttribute('y1', y);
    tick.setAttribute('x2', 44);
    tick.setAttribute('y2', y);
    tick.setAttribute('stroke', major ? '#B4402A' : '#8A8672');
    tick.setAttribute('stroke-width', '1');
    svg.appendChild(tick);
  }
}

window.addEventListener('load', drawRuler);
window.addEventListener('resize', drawRuler);

// Mobile nav toggle
document.addEventListener('DOMContentLoaded', function () {
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.nav-links');
  if (!toggle || !links) return;

  // Full-screen backdrop so the menu feels like a drawer
  var backdrop = document.createElement('div');
  backdrop.style.cssText = [
    'position:fixed', 'inset:0', 'background:rgba(28,26,23,0.45)',
    'z-index:39', 'display:none', 'backdrop-filter:blur(2px)'
  ].join(';');
  document.body.appendChild(backdrop);

  function closeNav() {
    links.style.display = 'none';
    backdrop.style.display = 'none';
    toggle.textContent = 'Menu';
    toggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  function openNav() {
    links.style.cssText = [
      'display:flex', 'flex-direction:column',
      'position:fixed', 'top:64px', 'left:0', 'right:0',
      'background:#EAE6DC', 'padding:20px 24px 28px',
      'border-bottom:1px solid #C9C4B4',
      'gap:4px', 'z-index:50',
      'box-shadow:0 12px 32px rgba(28,26,23,0.14)'
    ].join(';');
    backdrop.style.display = 'block';
    toggle.textContent = 'Close';
    toggle.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  toggle.addEventListener('click', function () {
    if (links.style.display === 'flex') { closeNav(); } else { openNav(); }
  });

  backdrop.addEventListener('click', closeNav);

  links.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', closeNav);
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 980) closeNav();
  });
});

// Contact form -> Formspree (submits directly, no email client redirect)
document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('.contact-form');
  if (!form) return;
  var status = form.querySelector('.form-status');
  var button = form.querySelector('button[type="submit"]');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    status.textContent = '';
    status.className = 'form-status';
    button.disabled = true;
    button.textContent = 'Sending…';

    fetch(form.action, {
      method: 'POST',
      body: new FormData(form),
      headers: { 'Accept': 'application/json' }
    })
      .then(function (response) {
        if (response.ok) {
          form.reset();
          status.textContent = 'Thanks, your message has been sent. We\'ll be in touch shortly.';
          status.className = 'form-status form-status-ok';
        } else {
          return response.json().then(function (data) {
            var msg = (data && data.errors && data.errors.length)
              ? data.errors.map(function (err) { return err.message; }).join(', ')
              : 'Something went wrong. Please try again or email info@hiloreindia.com directly.';
            throw new Error(msg);
          });
        }
      })
      .catch(function (err) {
        status.textContent = err.message || 'Something went wrong. Please try again or email info@hiloreindia.com directly.';
        status.className = 'form-status form-status-error';
      })
      .finally(function () {
        button.disabled = false;
        button.textContent = 'Send message';
      });
  });
});
