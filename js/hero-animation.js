/**
 * Hero Animation — Datenfluss-Netzwerk (300% Intensität)
 */
(function () {
  var canvas = document.getElementById('heroCanvas');
  if (!canvas) return;

  var ctx = canvas.getContext('2d');
  var particles = [];
  var mouse = { x: -9999, y: -9999 };
  var PARTICLE_COUNT = 150;
  var CONNECTION_DIST = 200;
  var MOUSE_DIST = 280;
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
        vx: (Math.random() - 0.5) * 1.0,
        vy: (Math.random() - 0.5) * 1.0,
        r: Math.random() * 3 + 1.5
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
          var alpha = (1 - dist / CONNECTION_DIST) * 0.25;
          ctx.beginPath();
          ctx.strokeStyle = 'rgba(36,99,235,' + alpha + ')';
          ctx.lineWidth = 0.8;
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
        var alpha = (1 - dist / MOUSE_DIST) * 0.5;
        ctx.beginPath();
        ctx.strokeStyle = 'rgba(36,99,235,' + alpha + ')';
        ctx.lineWidth = 1.2;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mx, my);
        ctx.stroke();
      }
    }

    // Draw particles with glow
    for (var i = 0; i < particles.length; i++) {
      var p = particles[i];

      // Outer glow
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r + 6, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(36,99,235,0.15)';
      ctx.fill();

      // Core
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(36,99,235,0.8)';
      ctx.fill();
    }

    animId = requestAnimationFrame(drawParticles);
  }

  // Mouse tracking — enable pointer events on canvas wrapper for interaction
  canvas.parentElement.style.pointerEvents = 'auto';
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
})();
