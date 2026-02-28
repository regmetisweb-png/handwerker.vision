/**
 * Hero Animation — Partikel-Netzwerk + KI-Typing-Effekt
 */
(function () {
  // ============================================================
  // PARTICLE NETWORK
  // ============================================================
  var canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var mouse = { x: -9999, y: -9999 };
  var PARTICLE_COUNT = 50;
  var CONNECTION_DIST = 130;
  var MOUSE_DIST = 180;
  var animId;

  function resize() {
    var rect = canvas.parentElement.getBoundingClientRect();
    canvas.width = rect.width * window.devicePixelRatio;
    canvas.height = rect.height * window.devicePixelRatio;
    ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
  }

  function createParticles() {
    particles = [];
    var w = canvas.width / window.devicePixelRatio;
    var h = canvas.height / window.devicePixelRatio;
    for (var i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        r: Math.random() * 2 + 1
      });
    }
  }

  function drawParticles() {
    var w = canvas.width / window.devicePixelRatio;
    var h = canvas.height / window.devicePixelRatio;
    ctx.clearRect(0, 0, w, h);

    // Update positions
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0) { p.x = 0; p.vx *= -1; }
      if (p.x > w) { p.x = w; p.vx *= -1; }
      if (p.y < 0) { p.y = 0; p.vy *= -1; }
      if (p.y > h) { p.y = h; p.vy *= -1; }
    }

    // Draw connections between particles
    for (var i = 0; i < particles.length; i++) {
      for (var j = i + 1; j < particles.length; j++) {
        var dx = particles[i].x - particles[j].x;
        var dy = particles[i].y - particles[j].y;
        var dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DIST) {
          var alpha = (1 - dist / CONNECTION_DIST) * 0.15;
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(36,99,235,' + alpha + ')';
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw connections to mouse
    var canvasRect = canvas.getBoundingClientRect();
    var mx = mouse.x - canvasRect.left;
    var my = mouse.y - canvasRect.top;

    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      var dx = p.x - mx;
      var dy = p.y - my;
      var dist = Math.sqrt(dx * dx + dy * dy);

      if (dist < MOUSE_DIST) {
        var alpha = (1 - dist / MOUSE_DIST) * 0.3;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(36,99,235,' + alpha + ')';
        ctx.lineWidth = 0.8;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mx, my);
        ctx.stroke();
      }
    }

    // Draw particles
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(36,99,235,0.6)';
      ctx.fill();

      // Glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + 3, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(36,99,235,0.08)';
      ctx.fill();
    }

    animId = requestAnimationFrame(drawParticles);
  }

  // Mouse tracking
  document.addEventListener('mousemove', function (e) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  });

  // Init
  resize();
  createParticles();
  drawParticles();

  window.addEventListener('resize', function () {
    resize();
    createParticles();
  });

  // Pause when not visible
  var observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      if (!animId) drawParticles();
    } else {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }, { threshold: 0.1 });
  observer.observe(canvas.parentElement);

  // ============================================================
  // TYPING EFFECT
  // ============================================================
  var termBody = document.getElementById('terminalBody');
  if (!termBody) return;

  var sequences = [
    [
      { prompt: true, text: 'Anfrage erkannt...' },
      { prompt: true, text: 'Sanitär-Notfall · Freiburg' },
      { prompt: true, text: 'Termin erstellt: Mo 09:00' },
      { success: true, text: '✓ Bestätigung gesendet · 60s' }
    ],
    [
      { prompt: true, text: 'FAQ-Anfrage eingehend...' },
      { prompt: true, text: '"Was kostet eine Heizungswartung?"' },
      { prompt: true, text: 'KI-Antwort generiert' },
      { success: true, text: '✓ Kunde informiert · automatisch' }
    ],
    [
      { prompt: true, text: 'Neue Anfrage via Website...' },
      { prompt: true, text: 'Elektro-Installation · Lörrach' },
      { prompt: true, text: 'Angebot vorbereitet' },
      { success: true, text: '✓ Per E-Mail versendet · 3 Klicks' }
    ]
  ];

  var seqIndex = 0;
  var lineIndex = 0;
  var charIndex = 0;
  var currentLines = [];
  var isDeleting = false;
  var deleteTimer;

  function typeNextChar() {
    var seq = sequences[seqIndex];
    if (lineIndex >= seq.length) {
      // All lines typed, pause then clear
      setTimeout(clearTerminal, 2500);
      return;
    }

    var line = seq[lineIndex];
    var fullText = line.text;

    if (charIndex === 0) {
      // Create new line element
      var el = document.createElement('div');
      el.className = 'hero-terminal-line';
      var promptSpan = document.createElement('span');
      promptSpan.className = line.success ? 't-success' : 't-prompt';
      promptSpan.textContent = line.success ? '' : '> ';
      el.appendChild(promptSpan);
      var textSpan = document.createElement('span');
      textSpan.className = 'typed';
      el.appendChild(textSpan);
      var cursor = document.createElement('span');
      cursor.className = 'hero-terminal-cursor';
      el.appendChild(cursor);
      termBody.appendChild(el);
      currentLines.push(el);
    }

    var currentEl = currentLines[currentLines.length - 1];
    var textSpan = currentEl.querySelector('.typed');

    if (charIndex < fullText.length) {
      textSpan.textContent = fullText.substring(0, charIndex + 1);
      charIndex++;
      var speed = 30 + Math.random() * 40;
      setTimeout(typeNextChar, speed);
    } else {
      // Line complete — remove cursor, move to next line
      var cursor = currentEl.querySelector('.hero-terminal-cursor');
      if (cursor) cursor.remove();
      charIndex = 0;
      lineIndex++;
      setTimeout(typeNextChar, 400);
    }
  }

  function clearTerminal() {
    isDeleting = true;
    // Fade out lines one by one
    var lines = termBody.querySelectorAll('.hero-terminal-line');
    var i = lines.length - 1;

    function removeLine() {
      if (i < 0) {
        // All cleared, start next sequence
        seqIndex = (seqIndex + 1) % sequences.length;
        lineIndex = 0;
        charIndex = 0;
        currentLines = [];
        isDeleting = false;
        setTimeout(typeNextChar, 800);
        return;
      }
      lines[i].style.opacity = '0';
      lines[i].style.transition = 'opacity 0.2s';
      i--;
      setTimeout(function () {
        if (termBody.lastChild) termBody.removeChild(termBody.lastChild);
        removeLine();
      }, 150);
    }
    removeLine();
  }

  // Start typing after a short delay
  setTimeout(typeNextChar, 1200);
})();
