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
  if (toggle && links) {
    toggle.addEventListener('click', function () {
      var open = links.style.display === 'flex';
      links.style.display = open ? 'none' : 'flex';
      links.style.flexDirection = 'column';
      links.style.position = 'absolute';
      links.style.top = '64px';
      links.style.left = '0';
      links.style.right = '0';
      links.style.background = '#EAE6DC';
      links.style.padding = '20px';
      links.style.borderBottom = '1px solid #C9C4B4';
      links.style.gap = '18px';
    });
  }
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
