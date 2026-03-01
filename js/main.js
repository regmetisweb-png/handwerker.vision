/**
 * Main — Cursor, FAQ Accordion, Smooth Scroll
 */
(function () {
  // Custom Cursor (desktop only)
  var cur = document.getElementById('cursor');
  if (cur && window.matchMedia('(pointer: fine)').matches) {
    document.addEventListener('mousemove', function (e) {
      cur.style.left = e.clientX + 'px';
      cur.style.top  = e.clientY + 'px';
    });
    document.addEventListener('mousedown', function () {
      cur.style.transform = 'translate(-50%,-50%) scale(2.2)';
    });
    document.addEventListener('mouseup', function () {
      cur.style.transform = 'translate(-50%,-50%) scale(1)';
    });
  } else if (cur) {
    cur.style.display = 'none';
  }

  // FAQ Accordion: Wird jetzt nativ durch <details>/<summary> gehandhabt (WCAG 4.1.2)
  // Accordion-Verhalten: immer nur ein Item offen (optional)
  document.querySelectorAll('details.faq-item').forEach(function (detail) {
    detail.addEventListener('toggle', function () {
      if (detail.open) {
        document.querySelectorAll('details.faq-item').forEach(function (other) {
          if (other !== detail) { other.removeAttribute('open'); }
        });
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var target = document.querySelector(link.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
})();
