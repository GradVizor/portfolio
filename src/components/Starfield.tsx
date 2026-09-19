import { useEffect, useRef } from "react";

interface Star {
  x: number;
  y: number;
  z: number; // depth 0..1
  r: number;
  phase: number;
  speed: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

/**
 * Full-viewport canvas starfield with depth parallax, twinkle, a slow
 * perspective drift toward the viewer, mouse influence and occasional
 * shooting stars. Respects prefers-reduced-motion (static faint field).
 */
export default function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let stars: Star[] = [];
    let shooting: ShootingStar[] = [];
    let raf = 0;
    let t = 0;
    let scrollY = 0;
    const mouse = { x: 0.5, y: 0.5, active: false };

    const DPR = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas!.width = width * DPR;
      canvas!.height = height * DPR;
      ctx!.setTransform(DPR, 0, 0, DPR, 0, 0);
      spawnStars();
    };

    const spawnStars = () => {
      const count = reduced ? 120 : Math.min(420, Math.max(180, Math.floor((width * height) / 4400)));
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        z: Math.random(),
        r: 0.3 + Math.random() * 1.3,
        phase: Math.random() * Math.PI * 2,
        speed: 0.25 + Math.random() * 0.9,
      }));
    };

    const spawnShootingStar = () => {
      if (reduced) return;
      const fromLeft = Math.random() > 0.5;
      shooting.push({
        x: fromLeft ? -width * 0.1 : width * 1.1,
        y: Math.random() * height * 0.45,
        vx: (fromLeft ? 1 : -1) * (6 + Math.random() * 5),
        vy: 2.4 + Math.random() * 2.4,
        life: 0,
        maxLife: 90 + Math.random() * 60,
      });
    };

    const onScroll = () => {
      scrollY = window.scrollY;
    };

    const onMouse = (e: MouseEvent) => {
      mouse.x = e.clientX / width;
      mouse.y = e.clientY / height;
      mouse.active = true;
    };

    const render = () => {
      t += 1;
      ctx!.clearRect(0, 0, width, height);

      const parallax = Math.min(scrollY / (height * 2), 0.5);
      const drift = reduced ? 0 : 0.04 + 0.08 * t * 0.0016;

      for (const s of stars) {
        if (!reduced) {
          // drift toward viewer then wrap
          s.z -= drift * s.speed * 0.003;
          if (s.z <= 0.05) {
            s.z = 1;
            s.x = Math.random() * width;
            s.y = Math.random() * height;
          }
        }
        const tw = reduced ? 0.7 : 0.55 + 0.45 * Math.sin(s.phase + t * (0.008 + s.speed * 0.02));
        const mx = mouse.active ? (mouse.x - 0.5) * 22 * (1 - s.z) : 0;
        const yPar = s.y - parallax * 60 * s.z;
        const x = s.x + mx;
        const y = yPar < -6 ? height + 6 : yPar;
        const alpha = Math.max(0.08, tw * Math.min(1, (1 - s.z) * 1.6));

        ctx!.beginPath();
        ctx!.arc(x, y, s.r * (0.7 + s.z * 0.6), 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(190, 196, 255, ${alpha})`;
        ctx!.fill();

        // subtle violet tint on near stars
        if (s.z > 0.72) {
          ctx!.beginPath();
          ctx!.arc(x, y, (s.r + 1.4) * 0.6, 0, Math.PI * 2);
          ctx!.fillStyle = `rgba(139, 92, 246, ${alpha * 0.18})`;
          ctx!.fill();
        }
      }

      // shooting stars
      shooting = shooting.filter((m) => m.life < m.maxLife);
      if (!reduced && Math.random() < 0.0025 && shooting.length < 2) spawnShootingStar();
      for (const m of shooting) {
        m.life += 1;
        m.x += m.vx;
        m.y += m.vy;
        const k = 1 - m.life / m.maxLife;
        const len = 14;
        const tail = ctx!.createLinearGradient(m.x, m.y, m.x - m.vx * len, m.y - m.vy * len);
        tail.addColorStop(0, `rgba(255,255,255,${0.85 * k})`);
        tail.addColorStop(0.4, `rgba(167,139,250,${0.45 * k})`);
        tail.addColorStop(1, "rgba(167,139,250,0)");
        ctx!.strokeStyle = tail;
        ctx!.lineWidth = 1.6;
        ctx!.beginPath();
        ctx!.moveTo(m.x, m.y);
        ctx!.lineTo(m.x - m.vx * len, m.y - m.vy * len);
        ctx!.stroke();
      }

      raf = requestAnimationFrame(render);
    };

    resize();
    render();
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    if (!reduced) window.addEventListener("mousemove", onMouse, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("mousemove", onMouse);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 block"
      style={{ opacity: 0.9 }}
    />
  );
}