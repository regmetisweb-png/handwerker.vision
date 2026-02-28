/**
 * Navigation — Scroll-Effekt + Mobile Menu
 */
(function () {
  var nav = document.getElementById('nav');
  var toggle = document.getElementById('navToggle');
  var menu = document.getElementById('mobileMenu');
  var isOpen = false;

  // Scroll: transparent → solid
  function onScroll() {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Mobile toggle
  if (toggle && menu) {
    toggle.addEventListener('click', function () {
      isOpen = !isOpen;
      toggle.classList.toggle('active', isOpen);
      menu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      toggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        isOpen = false;
        toggle.classList.remove('active');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        isOpen = false;
        toggle.classList.remove('active');
        menu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // Mobile Sticky CTA — show after scrolling past hero
  var stickyBtn = document.getElementById('mobileStickyBtn');
  var heroSection = document.querySelector('.hero');
  if (stickyBtn && heroSection) {
    function checkSticky() {
      var heroBottom = heroSection.getBoundingClientRect().bottom;
      if (heroBottom < 0) {
        stickyBtn.classList.add('visible');
      } else {
        stickyBtn.classList.remove('visible');
      }
    }
    window.addEventListener('scroll', checkSticky, { passive: true });
    checkSticky();
  }
})();
