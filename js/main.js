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

// Contact form -> mailto (no backend needed)
document.addEventListener('DOMContentLoaded', function () {
  var form = document.querySelector('.contact-form');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = form.querySelector('[name="name"]').value.trim();
    var email = form.querySelector('[name="email"]').value.trim();
    var message = form.querySelector('[name="message"]').value.trim();
    if (!name || !email || !message) {
      alert('Please fill in all fields before sending.');
      return;
    }
    var subject = encodeURIComponent('Inquiry from ' + name + ' — hiloreindia.com');
    var body = encodeURIComponent(message + '\n\n— ' + name + ' (' + email + ')');
    window.location.href = 'mailto:info@hiloreindia.com?subject=' + subject + '&body=' + body;
  });
});
