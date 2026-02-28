/**
 * Scroll-Reveal Animations via Intersection Observer
 * Unified: .reveal → .visible
 */
(function () {
  if (typeof IntersectionObserver === 'undefined') {
    // Fallback: show everything
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.08,
      rootMargin: '0px 0px -30px 0px'
    }
  );

  document.querySelectorAll('.reveal').forEach(function (el) {
    observer.observe(el);
  });

  // Cost bar animation on scroll
  var bars = document.querySelectorAll('.cost-bar-fill');
  if (bars.length) {
    var barObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.style.width = e.target.style.getPropertyValue('--fill') || '40%';
        }
      });
    }, { threshold: 0.3 });
    bars.forEach(function (bar) {
      barObserver.observe(bar);
    });
  }
})();
