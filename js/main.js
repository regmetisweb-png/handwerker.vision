/**
 * Main — Initialisierung und allgemeine Logik
 */
(function () {
  // FAQ Accordion
  document.querySelectorAll('.accordion__trigger').forEach(function (trigger) {
    trigger.addEventListener('click', function () {
      var item = trigger.closest('.accordion__item');
      var content = item.querySelector('.accordion__content');
      var isOpen = item.classList.contains('accordion__item--open');

      // Close all
      document.querySelectorAll('.accordion__item--open').forEach(function (openItem) {
        openItem.classList.remove('accordion__item--open');
        var c = openItem.querySelector('.accordion__content');
        if (c) c.style.maxHeight = null;
      });

      // Toggle current
      if (!isOpen) {
        item.classList.add('accordion__item--open');
        content.style.maxHeight = content.scrollHeight + 'px';
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
