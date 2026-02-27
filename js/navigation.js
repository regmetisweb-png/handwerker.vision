/**
 * Navigation — Scroll-Effekt + Mobile Menu
 */
(function () {
  const nav = document.getElementById('nav');
  const toggle = document.getElementById('navToggle');
  const menu = document.getElementById('mobileMenu');
  let isOpen = false;

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
      toggle.classList.toggle('nav__mobile-toggle--active', isOpen);
      menu.classList.toggle('nav__mobile-menu--open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
      toggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    });

    // Close on link click
    menu.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        isOpen = false;
        toggle.classList.remove('nav__mobile-toggle--active');
        menu.classList.remove('nav__mobile-menu--open');
        document.body.style.overflow = '';
      });
    });

    // Close on Escape
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && isOpen) {
        isOpen = false;
        toggle.classList.remove('nav__mobile-toggle--active');
        menu.classList.remove('nav__mobile-menu--open');
        document.body.style.overflow = '';
      }
    });
  }
})();
