/**
 * Scroll-Reveal Animations via Intersection Observer
 */
(function () {
  if (typeof IntersectionObserver === 'undefined') {
    // Fallback: show everything
    document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
      el.classList.add('reveal--visible', 'reveal-stagger--visible');
    });
    return;
  }

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          var el = entry.target;
          if (el.classList.contains('reveal')) {
            el.classList.add('reveal--visible');
          }
          if (el.classList.contains('reveal-stagger')) {
            el.classList.add('reveal-stagger--visible');
          }
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    }
  );

  document.querySelectorAll('.reveal, .reveal-stagger').forEach(function (el) {
    observer.observe(el);
  });
})();
