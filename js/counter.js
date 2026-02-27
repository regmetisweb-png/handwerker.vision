/**
 * Counter Animation — animiert Zahlen beim Scrollen
 */
(function () {
  if (typeof IntersectionObserver === 'undefined') return;

  function animateCounter(el) {
    var target = parseInt(el.getAttribute('data-target'), 10);
    var suffix = el.getAttribute('data-suffix') || '';
    var duration = 1500;
    var start = 0;
    var startTime = null;

    if (isNaN(target)) return;

    function step(timestamp) {
      if (!startTime) startTime = timestamp;
      var progress = Math.min((timestamp - startTime) / duration, 1);
      // Ease out cubic
      var eased = 1 - Math.pow(1 - progress, 3);
      var current = Math.round(start + (target - start) * eased);
      el.textContent = current + suffix;
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('[data-target]').forEach(function (el) {
    observer.observe(el);
  });
})();
