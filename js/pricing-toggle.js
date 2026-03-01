/* ============================================================
   PRICING TOGGLE — Monthly / Annual Billing Switch
   ============================================================ */
(function () {
  var buttons = document.querySelectorAll('.toggle-btn');
  var cards = document.querySelectorAll('.pricing-card');

  if (!buttons.length || !cards.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var billing = btn.getAttribute('data-billing');

      // Toggle active class
      buttons.forEach(function (b) { b.classList.remove('active'); });
      btn.classList.add('active');

      // Update prices
      cards.forEach(function (card) {
        var priceEl = card.querySelector('.price-value');
        var periodEl = card.querySelector('.pricing-period');
        if (!priceEl) return;

        if (billing === 'annual') {
          var annual = card.getAttribute('data-annual');
          priceEl.textContent = parseInt(annual).toLocaleString('de-DE');
          periodEl.textContent = '/ Jahr · inkl. MwSt.';
        } else {
          var monthly = card.getAttribute('data-monthly');
          priceEl.textContent = monthly;
          periodEl.textContent = '/ Monat · inkl. MwSt.';
        }
      });
    });
  });
})();
