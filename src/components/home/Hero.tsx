import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import { useEffect, useRef } from 'react';
import heroBanner from '@/assets/hero-banner.jpg?format=avif&quality=80';

function GoldenParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const dpr = window.devicePixelRatio || 1;

    const resize = () => {
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    // Rising smoke wisps
    const wisps: Array<{
      x: number; y: number; radius: number; opacity: number;
      speedX: number; speedY: number; life: number; maxLife: number;
    }> = [];

    const spawnWisp = () => {
      wisps.push({
        x: Math.random() * w(),
        y: h() + 20,
        radius: Math.random() * 60 + 30,
        opacity: 0,
        speedX: (Math.random() - 0.5) * 0.8,
        speedY: -(Math.random() * 1.2 + 0.4),
        life: 0,
        maxLife: Math.random() * 300 + 200,
      });
    };

    // Golden streaks / light rays
    const streaks: Array<{
      x: number; angle: number; length: number; width: number;
      opacity: number; fadeDir: number; speed: number;
    }> = [];

    for (let i = 0; i < 5; i++) {
      streaks.push({
        x: Math.random() * w(),
        angle: -Math.PI / 2 + (Math.random() - 0.5) * 0.6,
        length: Math.random() * h() * 0.6 + h() * 0.3,
        width: Math.random() * 3 + 1,
        opacity: 0,
        fadeDir: 1,
        speed: Math.random() * 0.003 + 0.001,
      });
    }

    // Floating orbs (larger, more visible)
    const orbs: Array<{
      x: number; y: number; size: number; baseSize: number;
      speedX: number; speedY: number; opacity: number;
      pulsePhase: number; pulseSpeed: number; glowSize: number;
    }> = [];

    for (let i = 0; i < 25; i++) {
      const baseSize = Math.random() * 5 + 2;
      orbs.push({
        x: Math.random() * w(),
        y: Math.random() * h(),
        size: baseSize,
        baseSize,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: -Math.random() * 0.6 - 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.02 + 0.01,
        glowSize: Math.random() * 20 + 10,
      });
    }

    let frame = 0;

    const animate = () => {
      ctx.clearRect(0, 0, w(), h());
      frame++;

      // Spawn smoke wisps periodically
      if (frame % 30 === 0 && wisps.length < 15) spawnWisp();

      // Draw smoke wisps
      for (let i = wisps.length - 1; i >= 0; i--) {
        const ws = wisps[i];
        ws.x += ws.speedX + Math.sin(ws.life * 0.02) * 0.3;
        ws.y += ws.speedY;
        ws.life++;

        const lifeRatio = ws.life / ws.maxLife;
        ws.opacity = lifeRatio < 0.15 ? lifeRatio / 0.15 * 0.12 :
                     lifeRatio > 0.7 ? (1 - lifeRatio) / 0.3 * 0.12 : 0.12;
        ws.radius += 0.15;

        if (ws.life > ws.maxLife) { wisps.splice(i, 1); continue; }

        const grad = ctx.createRadialGradient(ws.x, ws.y, 0, ws.x, ws.y, ws.radius);
        grad.addColorStop(0, `rgba(212, 175, 55, ${ws.opacity * 0.6})`);
        grad.addColorStop(0.5, `rgba(180, 150, 50, ${ws.opacity * 0.3})`);
        grad.addColorStop(1, 'rgba(180, 150, 50, 0)');
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(ws.x, ws.y, ws.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Draw golden light streaks
      for (const s of streaks) {
        s.opacity += s.fadeDir * s.speed;
        if (s.opacity > 0.15) s.fadeDir = -1;
        if (s.opacity < 0) { s.fadeDir = 1; s.opacity = 0; s.x = Math.random() * w(); }

        if (s.opacity > 0.01) {
          ctx.save();
          ctx.globalAlpha = s.opacity;
          ctx.translate(s.x, 0);
          ctx.rotate(s.angle);

          const grad = ctx.createLinearGradient(0, 0, 0, s.length);
          grad.addColorStop(0, 'rgba(212, 175, 55, 0)');
          grad.addColorStop(0.3, 'rgba(212, 175, 55, 0.4)');
          grad.addColorStop(0.7, 'rgba(232, 200, 100, 0.2)');
          grad.addColorStop(1, 'rgba(212, 175, 55, 0)');

          ctx.strokeStyle = grad;
          ctx.lineWidth = s.width;
          ctx.shadowBlur = 15;
          ctx.shadowColor = 'rgba(212, 175, 55, 0.5)';
          ctx.beginPath();
          ctx.moveTo(0, 0);
          ctx.lineTo(0, s.length);
          ctx.stroke();
          ctx.restore();
        }
      }

      // Draw floating orbs
      for (const orb of orbs) {
        orb.x += orb.speedX;
        orb.y += orb.speedY;
        orb.pulsePhase += orb.pulseSpeed;
        orb.size = orb.baseSize + Math.sin(orb.pulsePhase) * orb.baseSize * 0.4;

        if (orb.y < -20) { orb.y = h() + 20; orb.x = Math.random() * w(); }
        if (orb.x < -20) orb.x = w() + 20;
        if (orb.x > w() + 20) orb.x = -20;

        // Outer glow
        ctx.save();
        ctx.globalAlpha = orb.opacity * 0.3;
        const glow = ctx.createRadialGradient(orb.x, orb.y, 0, orb.x, orb.y, orb.glowSize);
        glow.addColorStop(0, 'rgba(212, 175, 55, 0.5)');
        glow.addColorStop(1, 'rgba(212, 175, 55, 0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.glowSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Core
        ctx.save();
        ctx.globalAlpha = orb.opacity;
        ctx.shadowBlur = 12;
        ctx.shadowColor = 'rgba(232, 200, 100, 0.8)';
        ctx.fillStyle = 'rgba(232, 200, 100, 0.9)';
        ctx.beginPath();
        ctx.arc(orb.x, orb.y, orb.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();
      }

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none z-[2]"
    />
  );
}

export function Hero() {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background image with slow zoom */}
      <div className="absolute inset-0 animate-hero-zoom">
        <img
          src={heroBanner}
          alt="Flacons de parfum luxueux sur marbre"
          className="w-full h-full object-cover"
          fetchPriority="high"
          decoding="async"
        />
      </div>
      
      {/* Dark overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-black/30 z-[1]" />
      
      {/* Animated mist layers */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute bottom-0 left-0 right-0 h-[40%] bg-gradient-to-t from-black/40 to-transparent animate-mist-1" />
        <div className="absolute bottom-0 left-0 right-0 h-[30%] bg-gradient-to-t from-black/20 to-transparent animate-mist-2" />
      </div>

      {/* Golden particles, wisps & streaks */}
      <GoldenParticles />
      
      <div className="container relative z-10 text-center px-4 py-20">
        <span className="inline-block text-xs uppercase tracking-[0.3em] text-white/70 mb-6 animate-fade-in">
          Wael Ben Yaghlane
        </span>
        
        <h1 className="font-serif text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-6 animate-fade-in text-white" style={{ animationDelay: '0.2s' }}>
          Une trace invisible.
          <br />
          <span className="italic bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent animate-shimmer bg-[length:200%_auto]">
            Une émotion éternelle.
          </span>
        </h1>
        
        <p className="max-w-xl mx-auto text-white/80 text-lg mb-10 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Découvrez notre collection exclusive de parfums d'exception, 
          créés pour les amateurs de fragrances raffinées.
        </p>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <Button asChild size="lg" className="min-w-[200px] border-white/30 text-white bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-500 hover:border-accent/50 hover:shadow-[0_0_20px_rgba(212,175,55,0.15)]" variant="outline">
            <Link to="/shop">
              Découvrir la collection
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
