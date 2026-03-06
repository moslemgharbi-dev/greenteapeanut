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
    const particles: Array<{
      x: number; y: number; size: number; speedX: number; speedY: number;
      opacity: number; fadeDir: number; glow: number;
    }> = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };
    resize();
    window.addEventListener('resize', resize);

    const w = () => canvas.offsetWidth;
    const h = () => canvas.offsetHeight;

    // Create particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * w(),
        y: Math.random() * h(),
        size: Math.random() * 2.5 + 0.5,
        speedX: (Math.random() - 0.5) * 0.3,
        speedY: -Math.random() * 0.4 - 0.1,
        opacity: Math.random() * 0.6 + 0.1,
        fadeDir: Math.random() > 0.5 ? 1 : -1,
        glow: Math.random() * 8 + 4,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, w(), h());
      
      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.fadeDir * 0.003;
        
        if (p.opacity >= 0.7) p.fadeDir = -1;
        if (p.opacity <= 0.05) p.fadeDir = 1;
        
        if (p.y < -10) { p.y = h() + 10; p.x = Math.random() * w(); }
        if (p.x < -10) p.x = w() + 10;
        if (p.x > w() + 10) p.x = -10;

        // Golden glow
        ctx.save();
        ctx.globalAlpha = p.opacity * 0.3;
        ctx.shadowBlur = p.glow;
        ctx.shadowColor = 'rgba(212, 175, 55, 0.8)';
        ctx.fillStyle = 'rgba(212, 175, 55, 0.6)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 2, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        // Core particle
        ctx.save();
        ctx.globalAlpha = p.opacity;
        ctx.fillStyle = 'rgba(232, 200, 100, 0.9)';
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
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

      {/* Golden particles */}
      <GoldenParticles />
      
      <div className="container relative z-10 text-center px-4 py-20">
        <span className="inline-block text-xs uppercase tracking-[0.3em] text-white/70 mb-6 animate-fade-in">
          Wael Scents
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
