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

      // Toggle active class + WCAG 4.1.2: aria-selected
      buttons.forEach(function (b) {
        b.classList.remove('active');
        b.setAttribute('aria-selected', 'false');
      });
      btn.classList.add('active');
      btn.setAttribute('aria-selected', 'true');

      // Update prices
      cards.forEach(function (card) {
        var priceEl = card.querySelector('.price-value');
        var periodEl = card.querySelector('.pricing-period');
        if (!priceEl) return;

        if (billing === 'annual') {
          var annual = card.getAttribute('data-annual');
          var monthlyEquiv = Math.round(parseInt(annual) / 12);
          priceEl.textContent = monthlyEquiv;
          periodEl.textContent = '/ Monat · jährlich ' + parseInt(annual).toLocaleString('de-DE') + ' €/Jahr';
        } else {
          var monthly = card.getAttribute('data-monthly');
          priceEl.textContent = monthly;
          periodEl.textContent = '/ Monat · inkl. MwSt.';
        }
      });
    });
  });
})();
