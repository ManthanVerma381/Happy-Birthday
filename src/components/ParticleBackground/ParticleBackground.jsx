import React, { useEffect, useRef } from 'react';

export const ParticleBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let animationFrameId;
    let particles = [];
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Mouse & Touch position tracking
    const mouse = { x: -1000, y: -1000, radius: 120 };

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      initParticles();
    };

    const handleMouseMove = (e) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mouse.x = e.touches[0].clientX;
        mouse.y = e.touches[0].clientY;
      }
    };

    const handleClick = (e) => {
      createBurst(e.clientX || (e.touches && e.touches[0] ? e.touches[0].clientX : width / 2),
                  e.clientY || (e.touches && e.touches[0] ? e.touches[0].clientY : height / 2));
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('click', handleClick);

    // Particle class
    class Particle {
      constructor(isBurst = false, burstX = 0, burstY = 0) {
        this.reset(isBurst, burstX, burstY);
      }

      reset(isBurst = false, burstX = 0, burstY = 0) {
        this.isBurst = isBurst;
        this.x = isBurst ? burstX : Math.random() * width;
        this.y = isBurst ? burstY : Math.random() * height;
        this.size = Math.random() * 6 + 3;
        
        // Random speed
        const speedMultiplier = prefersReducedMotion ? 0.2 : 1;
        if (isBurst) {
          const angle = Math.random() * Math.PI * 2;
          const force = Math.random() * 4 + 2;
          this.vx = Math.cos(angle) * force * speedMultiplier;
          this.vy = Math.sin(angle) * force * speedMultiplier;
          this.life = 1;
          this.decay = Math.random() * 0.02 + 0.01;
        } else {
          this.vx = (Math.random() - 0.5) * 0.6 * speedMultiplier;
          this.vy = -(Math.random() * 0.8 + 0.3) * speedMultiplier; // Float upwards
          this.life = 1;
          this.decay = 0;
        }

        this.opacity = Math.random() * 0.6 + 0.3;
        // Particle types: 0 = glowing dot, 1 = heart, 2 = sparkle, 3 = petal
        this.type = Math.floor(Math.random() * 4);
        this.color = ['#FF85A1', '#FBB1BD', '#FFE5EC', '#FFD166', '#FF6584'][Math.floor(Math.random() * 5)];
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.02;
      }

      draw() {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);
        ctx.globalAlpha = this.isBurst ? this.life : this.opacity;
        ctx.fillStyle = this.color;
        ctx.strokeStyle = this.color;

        if (this.type === 1) {
          // Heart shape
          ctx.beginPath();
          const s = this.size * 0.6;
          ctx.moveTo(0, s / 4);
          ctx.bezierCurveTo(0, -s / 2, -s, -s / 2, -s, 0);
          ctx.bezierCurveTo(-s, s / 2, 0, s * 0.8, 0, s);
          ctx.bezierCurveTo(0, s * 0.8, s, s / 2, s, 0);
          ctx.bezierCurveTo(s, -s / 2, 0, -s / 2, 0, s / 4);
          ctx.fill();
        } else if (this.type === 2) {
          // Sparkle star
          ctx.beginPath();
          const s = this.size;
          ctx.moveTo(0, -s);
          ctx.quadraticCurveTo(0, 0, s, 0);
          ctx.quadraticCurveTo(0, 0, 0, s);
          ctx.quadraticCurveTo(0, 0, -s, 0);
          ctx.quadraticCurveTo(0, 0, 0, -s);
          ctx.fill();
        } else if (this.type === 3) {
          // Soft petal
          ctx.beginPath();
          ctx.ellipse(0, 0, this.size * 0.8, this.size * 0.4, Math.PI / 4, 0, Math.PI * 2);
          ctx.fill();
        } else {
          // Glowing circle
          ctx.beginPath();
          ctx.arc(0, 0, this.size * 0.5, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      update() {
        this.x += this.vx;
        this.y += this.vy;
        this.rotation += this.rotationSpeed;

        if (this.isBurst) {
          this.life -= this.decay;
          this.vx *= 0.96;
          this.vy *= 0.96;
        } else {
          // Mouse repulsion interaction
          if (!prefersReducedMotion) {
            const dx = mouse.x - this.x;
            const dy = mouse.y - this.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < mouse.radius) {
              const force = (mouse.radius - dist) / mouse.radius;
              this.x -= (dx / dist) * force * 3;
              this.y -= (dy / dist) * force * 3;
            }
          }

          // Reset if out of bounds
          if (this.y < -20 || this.x < -20 || this.x > width + 20) {
            this.reset();
            this.y = height + 10;
          }
        }
      }
    }

    const initParticles = () => {
      particles = [];
      const particleCount = window.innerWidth < 768 ? 25 : 60;
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle());
      }
    };

    const createBurst = (x, y) => {
      const burstCount = window.innerWidth < 768 ? 10 : 20;
      for (let i = 0; i < burstCount; i++) {
        particles.push(new Particle(true, x, y));
      }
    };

    initParticles();

    // Render loop
    const animate = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.update();
        p.draw();

        // Remove dead burst particles
        if (p.isBurst && p.life <= 0) {
          particles.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
};
