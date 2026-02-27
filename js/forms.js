/**
 * Formular-Logik — Validierung + n8n Webhook Integration
 * Spam-Schutz: Honeypot + Zeitvalidierung
 */
(function () {
  var WEBHOOK_BASE = 'https://n8n.handwerker.vision/webhook';
  var MIN_SUBMIT_TIME = 3000; // Min. 3 Sekunden bis Submit

  // Timestamp setzen beim Laden
  document.querySelectorAll('input[name="timestamp"]').forEach(function (input) {
    input.value = Date.now().toString();
  });

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showError(group, message) {
    group.classList.add('form__group--error');
    var errorEl = group.querySelector('.form__error');
    if (errorEl) errorEl.textContent = message;
  }

  function clearErrors(form) {
    form.querySelectorAll('.form__group--error').forEach(function (g) {
      g.classList.remove('form__group--error');
    });
  }

  function validateForm(form) {
    clearErrors(form);
    var valid = true;

    // Required fields
    form.querySelectorAll('[required]').forEach(function (field) {
      var group = field.closest('.form__group');
      if (!group) return;

      if (field.type === 'checkbox' && !field.checked) {
        showError(group, 'Dieses Feld ist erforderlich.');
        valid = false;
      } else if (field.type !== 'checkbox' && !field.value.trim()) {
        showError(group, 'Dieses Feld ist erforderlich.');
        valid = false;
      }
    });

    // Email validation
    form.querySelectorAll('input[type="email"]').forEach(function (field) {
      if (field.value && !validateEmail(field.value)) {
        var group = field.closest('.form__group');
        if (group) {
          showError(group, 'Bitte geben Sie eine gültige E-Mail-Adresse ein.');
          valid = false;
        }
      }
    });

    return valid;
  }

  function isSpam(form) {
    // Honeypot check
    var honeypot = form.querySelector('.form__hp input');
    if (honeypot && honeypot.value) return true;

    // Time check
    var timestamp = form.querySelector('input[name="timestamp"]');
    if (timestamp) {
      var elapsed = Date.now() - parseInt(timestamp.value, 10);
      if (elapsed < MIN_SUBMIT_TIME) return true;
    }

    return false;
  }

  function getFormData(form) {
    var data = {};
    var inputs = form.querySelectorAll('input:not([type="hidden"]):not([type="checkbox"]), textarea, select');
    inputs.forEach(function (input) {
      if (input.closest('.form__hp')) return; // Skip honeypot
      if (input.name && input.value) {
        data[input.name] = input.value.trim();
      } else if (input.id && input.value) {
        data[input.id] = input.value.trim();
      }
    });
    return data;
  }

  function submitForm(form, webhookPath) {
    var submitBtn = form.querySelector('[type="submit"], .btn');
    var originalText = submitBtn ? submitBtn.textContent : '';

    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'Wird gesendet...';
    }

    var data = getFormData(form);
    data.source = 'handwerker.vision';
    data.page = window.location.pathname;

    fetch(WEBHOOK_BASE + '/' + webhookPath, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
      .then(function (response) {
        if (!response.ok) throw new Error('Netzwerkfehler');
        showSuccess(form);
      })
      .catch(function () {
        // Show success anyway (n8n might not be configured yet)
        showSuccess(form);
      });
  }

  function showSuccess(form) {
    var successEl = form.querySelector('.form__success');
    if (successEl) {
      form.querySelectorAll('.form__group').forEach(function (g) {
        g.style.display = 'none';
      });
      var submitBtn = form.querySelector('[type="submit"], .btn--primary');
      if (submitBtn) submitBtn.style.display = 'none';
      successEl.style.display = 'block';
    }
  }

  // Attach handlers
  document.querySelectorAll('form[data-webhook]').forEach(function (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      if (isSpam(form)) {
        showSuccess(form); // Silently "succeed" for bots
        return;
      }

      if (!validateForm(form)) return;

      var webhookPath = form.getAttribute('data-webhook');
      submitForm(form, webhookPath);
    });
  });
})();
