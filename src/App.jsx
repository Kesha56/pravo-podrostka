import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import {
  Shield,
  Calculator,
  FileText,
  Scale,
  AlertTriangle,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Copy,
  Download,
  Printer,
  CreditCard,
  X,
  Info,
  Check,
  ChevronLeft,
  ChevronRight,
  Compass,
  RotateCcw,
  Sparkles,
  Clock,
  Smartphone,
  Users,
  Lock,
  BookOpen,
  ChevronDown,
  Zap,
  ExternalLink,
  Mail,
  ShieldCheck,
  Trash2,
  Bell
} from 'lucide-react';

const GLOBAL_STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&display=swap');

  html {
    font-size: 14.5px;
    -webkit-text-size-adjust: 100%;
  }
  @media (min-width: 1280px) {
    html {
      font-size: 15px;
    }
  }
  @media (min-width: 1600px) {
    html {
      font-size: 15.5px;
    }
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Пружинная анимация кнопок в стиле Apple / Reachable */
  .pp-btn {
    position: relative;
    overflow: hidden;
    transition: transform 0.36s cubic-bezier(0.3, 1.6, 0.5, 1),
      box-shadow 0.3s ease,
      background-color 0.2s ease,
      border-color 0.2s ease,
      color 0.2s ease;
    will-change: transform;
  }
  .pp-btn::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      115deg,
      transparent 20%,
      rgba(255, 255, 255, 0.32) 48%,
      transparent 76%
    );
    transform: translateX(-130%);
    transition: transform 0.65s cubic-bezier(0.22, 1, 0.36, 1);
    pointer-events: none;
  }
  .pp-btn:hover {
    transform: translateY(-2px) scale(1.015);
    box-shadow: 0 12px 24px -10px rgba(0, 113, 227, 0.35);
  }
  .pp-btn:hover::after {
    transform: translateX(130%);
  }
  .pp-btn:active {
    transform: translateY(0px) scale(0.97);
    transition-duration: 0.1s;
  }

  /* Анимация логотипа: пружинный подъём щита + прорисовка галочки */
  .brand-logo-btn {
    transition: transform 0.35s cubic-bezier(0.3, 1.6, 0.5, 1);
  }
  .brand-logo-btn:active {
    transform: scale(0.96);
  }
  .brand-shield-svg {
    transition: transform 0.42s cubic-bezier(0.3, 1.6, 0.5, 1), filter 0.3s ease;
    transform-origin: center;
  }
  .brand-logo-btn:hover .brand-shield-svg {
    transform: translateY(-2px) scale(1.09) rotate(-3deg);
    filter: drop-shadow(0 6px 12px rgba(0, 113, 227, 0.32));
  }
  .brand-check-path {
    stroke-dasharray: 28;
    stroke-dashoffset: 0;
  }
  .brand-logo-btn:hover .brand-check-path {
    animation: pp-check-draw 0.55s cubic-bezier(0.22, 1, 0.36, 1) forwards;
  }
  @keyframes pp-check-draw {
    0% { stroke-dashoffset: 28; }
    100% { stroke-dashoffset: 0; }
  }

  /* Сцена радара ловушек работодателей */
  .traps-stage {
    position: relative;
    overflow: hidden;
    background: linear-gradient(180deg, #ffffff 0%, #f3f8ff 60%, #eaf3ff 100%);
  }
  .traps-stage .crowd-layer {
    position: relative;
    width: 100%;
    height: 290px;
    pointer-events: none;
  }
  .traps-stage .pw {
    position: absolute;
    left: 0;
    pointer-events: none;
  }
  .traps-stage .pe {
    width: 100%;
    height: 100%;
    will-change: transform;
    transform-origin: 50% 88%;
  }
  .traps-stage .hp {
    position: relative;
    width: 100%;
    height: 100%;
    transition: transform 0.45s cubic-bezier(0.3, 1.6, 0.5, 1);
  }
  .traps-stage .pw.hop .hp {
    transform: translateY(-18px) scale(1.05);
  }
  .traps-stage .pw img {
    display: block;
    width: 100%;
    height: 100%;
    transition: filter 0.4s ease;
  }
  .traps-stage .ok-badge {
    position: absolute;
    left: 62%;
    top: 8%;
    width: 24px;
    height: 24px;
    border-radius: 999px;
    background: #0071e3;
    box-shadow: 0 0 0 2.5px #fff, 0 6px 12px -4px rgba(0, 113, 227, 0.6);
    display: grid;
    place-items: center;
    transform: scale(0);
    transition: transform 0.4s cubic-bezier(0.3, 1.7, 0.5, 1);
  }
  .traps-stage .pw.done .ok-badge {
    transform: scale(1);
  }
  .traps-stage .tip-wrap {
    position: absolute;
    z-index: 12;
    left: 0;
    top: 0;
    pointer-events: none;
    will-change: transform;
  }
  .traps-stage .tbox {
    position: relative;
    transform: translate(-50%, -100%) scale(0);
    transform-origin: 50% 100%;
    opacity: 0;
    display: inline-flex;
    align-items: center;
    gap: 7px;
    max-width: 320px;
    padding: 6px 12px 6px 7px;
    border-radius: 12px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.08);
    box-shadow: 0 14px 32px -12px rgba(15, 23, 42, 0.25), 0 2px 6px rgba(15, 23, 42, 0.06);
    font-size: 12.5px;
    font-weight: 600;
    color: #1d1d1f;
    white-space: nowrap;
    transition: transform 0.35s cubic-bezier(0.3, 1.6, 0.5, 1), opacity 0.22s ease;
  }
  .traps-stage .tbox.show {
    transform: translate(-50%, -100%) scale(1);
    opacity: 1;
  }
  .traps-stage .tbox.flip {
    transform: translate(-50%, -100%) scale(0.95) rotateX(85deg);
    opacity: 0.4;
  }
  .traps-stage .tg {
    display: inline-flex;
    align-items: center;
    height: 21px;
    padding: 0 7px;
    border-radius: 6px;
    font-size: 11px;
    font-weight: 600;
    flex-shrink: 0;
  }
  .traps-stage .tg.warn {
    color: #c2410c;
    background: #ffedd5;
  }
  .traps-stage .tg.danger {
    color: #b91c1c;
    background: #fee2e2;
  }
  .traps-stage .tg.ok {
    color: #15803d;
    background: #dcfce7;
  }
  .traps-stage .cbox {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    height: 30px;
    padding: 0 12px 0 6px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.96);
    border: 1px solid rgba(0, 113, 227, 0.16);
    box-shadow: 0 10px 24px -10px rgba(0, 113, 227, 0.3);
    font-size: 12px;
    color: #1d1d1f;
    white-space: nowrap;
    transform: scale(0.85);
    opacity: 0;
    transition: transform 0.3s cubic-bezier(0.3, 1.6, 0.5, 1), opacity 0.2s ease;
  }
  .traps-stage .cbox.show {
    transform: scale(1);
    opacity: 1;
  }
  .traps-stage .cbox .lab {
    height: 20px;
    padding: 0 8px;
    border-radius: 999px;
    background: rgba(0, 113, 227, 0.1);
    color: #0071e3;
    font-size: 11px;
    font-weight: 600;
    line-height: 20px;
  }
  .traps-stage .btile {
    transition: transform 0.35s cubic-bezier(0.3, 1.6, 0.5, 1);
  }
  .traps-stage .btile.pulse {
    transform: scale(1.13);
  }
  @media (prefers-reduced-motion: reduce) {
    .pp-btn, .pp-btn::after, .brand-shield-svg, .brand-check-path {
      animation: none !important;
      transition: none !important;
    }
  }
`;

/**
 * Векторный логотип «ПравоПодростка 14–17» (щит с галочкой + 14–17 + подпись)
 * с пружинной анимацией щита и прорисовкой галочки при наведении.
 */
function BrandLogo({ compact = false }) {
  return (
    <div className="inline-flex items-center gap-2.5 select-none">
      <svg
        viewBox="0 0 44 48"
        className={`brand-shield-svg ${compact ? 'w-7 h-8 shrink-0' : 'w-8 h-9 shrink-0'}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M22 3L6 9.5V22.5C6 33.4 12.8 42.1 22 45C31.2 42.1 38 33.4 38 22.5V9.5L22 3Z"
          stroke="#0071E3"
          strokeWidth="3.2"
          strokeLinejoin="round"
        />
        <path
          className="brand-check-path"
          d="M15 24.5L20 29.5L30.5 18.5"
          stroke="#0071E3"
          strokeWidth="3.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <div className="flex flex-col leading-none">
        <span
          className={`font-extrabold tracking-tight text-[#0071E3] transition-colors group-hover:text-[#0077ED] ${
            compact ? 'text-[17px]' : 'text-[20px]'
          }`}
        >
          14–17
        </span>
        <span
          className={`font-bold tracking-[0.04em] text-[#0071E3] uppercase mt-0.5 transition-colors group-hover:text-[#0077ED] ${
            compact ? 'text-[8.5px]' : 'text-[9.5px]'
          }`}
        >
          ПРАВОПОДРОСТКА
        </span>
      </div>
    </div>
  );
}

/**
 * Полноэкранный интерактивный фон GradientASCII в светлой эстетике Apple.
 */
function GradientASCII({
  colors = ['#0071E3', '#0284C7', '#38BDF8', '#7DD3FC'],
  shape = 'horizon',
  characters = ' =+xX0S8#@',
  cellSize = 18,
  density = 0.8,
  glyphOpacity = 0.5,
  flicker = 0.2,
  softness = 0.5,
  scale = 1,
  flow = 0.5,
  speed = 1,
  gradientOpacity = 0.9,
  grain = 0.08,
  mouseInteraction = true,
  scrambleRadius = 0.1,
  clickEffect = 'wave',
  intro = true,
  lightMode = true
}) {
  const canvasRef = useRef(null);
  const colorsKey = colors.join(',');

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId = 0;
    let isPageVisible = !document.hidden;
    let width = window.innerWidth || 0;
    let height = window.innerHeight || 0;
    let cols = 0;
    let rows = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const parsedColors = colorsKey.split(',').map((hex) => {
      const clean = hex.trim().replace('#', '');
      const num = parseInt(clean, 16) || 0x0071e3;
      return {
        r: (num >> 16) & 255,
        g: (num >> 8) & 255,
        b: num & 255
      };
    });

    const sampleGradient = (t) => {
      if (!parsedColors.length) return { r: 0, g: 113, b: 227 };
      if (parsedColors.length === 1) return parsedColors[0];
      const safeT = Number.isFinite(t) ? Math.max(0, Math.min(1, t)) : 0;
      const scaled = safeT * (parsedColors.length - 1);
      const idx = Math.max(0, Math.min(parsedColors.length - 1, Math.floor(scaled)));
      const nextIdx = Math.min(parsedColors.length - 1, idx + 1);
      const frac = scaled - idx;
      const c1 = parsedColors[idx] || parsedColors[0];
      const c2 = parsedColors[nextIdx] || c1;
      return {
        r: Math.round(c1.r + (c2.r - c1.r) * frac),
        g: Math.round(c1.g + (c2.g - c1.g) * frac),
        b: Math.round(c1.b + (c2.b - c1.b) * frac)
      };
    };

    const mouse = { x: -9999, y: -9999, active: false };
    const waves = [];
    const startTime = performance.now();

    const resize = () => {
      width = window.innerWidth || 0;
      height = window.innerHeight || 0;
      if (width <= 0 || height <= 0) return;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / cellSize) + 1;
      rows = Math.ceil(height / cellSize) + 1;
    };

    resize();
    window.addEventListener('resize', resize);

    const handleMouseMove = (e) => {
      if (!mouseInteraction) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      mouse.active = true;
    };

    const handleClick = (e) => {
      if (clickEffect !== 'wave') return;
      waves.push({ x: e.clientX, y: e.clientY, birth: performance.now() });
      if (waves.length > 5) waves.shift();
    };

    const handleVisibility = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible && !animId) animId = requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('click', handleClick, { passive: true });
    document.addEventListener('visibilitychange', handleVisibility);

    const hash2D = (x, y) => {
      const h = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
      return h - Math.floor(h);
    };

    const render = (now) => {
      if (!isPageVisible) {
        animId = 0;
        return;
      }
      if (width <= 0 || height <= 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      const elapsed = ((now - startTime) / 1000) * speed;
      const introFactor = intro ? Math.min(1, elapsed / 1.0) : 1;

      const bgGrad = ctx.createLinearGradient(0, 0, width * 0.5, height);
      if (lightMode) {
        bgGrad.addColorStop(0, '#F5F5F7');
        bgGrad.addColorStop(0.5, '#F2F7FC');
        bgGrad.addColorStop(1, '#F5F5F7');
      } else {
        bgGrad.addColorStop(0, '#071324');
        bgGrad.addColorStop(1, '#0B192C');
      }
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, width, height);

      const horizonY = height * 0.34;
      const radial = ctx.createRadialGradient(
        width * 0.5,
        horizonY,
        10,
        width * 0.5,
        horizonY,
        Math.max(width, height) * 0.72
      );
      radial.addColorStop(0, `rgba(56, 189, 248, ${0.14 * gradientOpacity * introFactor})`);
      radial.addColorStop(0.45, `rgba(0, 113, 227, ${0.07 * gradientOpacity * introFactor})`);
      radial.addColorStop(1, 'rgba(245, 245, 247, 0)');
      ctx.fillStyle = radial;
      ctx.fillRect(0, 0, width, height);

      ctx.font = `600 ${Math.max(
        10,
        Math.floor(cellSize * 0.7)
      )}px ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const maxDiag = Math.hypot(width, height);
      const scramblePx = maxDiag * scrambleRadius;
      const charCount = characters.length;

      for (let r = 0; r < rows; r++) {
        const py = r * cellSize + cellSize * 0.5;
        const ny = py / height;

        for (let c = 0; c < cols; c++) {
          const px = c * cellSize + cellSize * 0.5;
          const nx = px / width;

          const cellRand = hash2D(c, r);
          if (cellRand > density) continue;

          const wave1 = Math.sin(nx * 4.5 * scale + elapsed * flow * 1.3) * 0.08;
          const wave2 = Math.cos(nx * 8.0 * scale - elapsed * flow * 0.9) * 0.04;
          let fieldVal = 0;

          if (shape === 'horizon') {
            const distFromHorizon = Math.abs(ny - (0.33 + wave1 + wave2));
            fieldVal = Math.exp(-Math.pow(distFromHorizon / (0.28 + softness * 0.24), 2));
          } else {
            fieldVal = 0.5 + 0.5 * Math.sin((nx + ny) * 6 * scale + elapsed * flow);
          }

          let waveBoost = 0;
          for (let w = 0; w < waves.length; w++) {
            const age = (now - waves[w].birth) / 1000;
            if (age > 2.2) continue;
            const radius = age * 460;
            const dClick = Math.hypot(px - waves[w].x, py - waves[w].y);
            const ring = Math.exp(-Math.pow((dClick - radius) / 65, 2)) * (1 - age / 2.2);
            waveBoost = Math.max(waveBoost, ring);
          }

          let mouseBoost = 0;
          if (mouse.active && mouseInteraction) {
            const dm = Math.hypot(px - mouse.x, py - mouse.y);
            if (dm < scramblePx) mouseBoost = 1 - dm / scramblePx;
          }

          const flickerDelta =
            flicker > 0
              ? (Math.sin(elapsed * 4.2 + cellRand * 25) * 0.5 + 0.5) * flicker * 0.22
              : 0;
          const grainNoise = (hash2D(c + Math.floor(elapsed * 8), r) - 0.5) * grain;

          const rawIntensity =
            fieldVal + waveBoost * 0.7 + mouseBoost * 0.5 - flickerDelta + grainNoise;
          if (!Number.isFinite(rawIntensity)) continue;
          const intensity = Math.max(0, Math.min(1, rawIntensity));
          if (intensity < 0.06) continue;

          let charIdx = Math.floor(intensity * (charCount - 1));
          if (mouseBoost > 0.15 || waveBoost > 0.2) {
            charIdx = Math.max(
              1,
              Math.floor(hash2D(c + Math.floor(now * 0.02), r) * (charCount - 1))
            );
          }

          const ch = characters[charIdx] || '+';
          if (ch === ' ') continue;

          const col = sampleGradient(Math.min(1, intensity * 1.1));
          const alpha = Math.min(0.85, intensity * glyphOpacity * introFactor);
          ctx.fillStyle = `rgba(${col.r}, ${col.g}, ${col.b}, ${alpha.toFixed(3)})`;
          ctx.fillText(ch, px, py);
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('click', handleClick);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [
    colorsKey,
    shape,
    characters,
    cellSize,
    density,
    glyphOpacity,
    flicker,
    softness,
    scale,
    flow,
    speed,
    gradientOpacity,
    grain,
    mouseInteraction,
    scrambleRadius,
    clickEffect,
    intro,
    lightMode
  ]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-screen h-screen pointer-events-none z-0"
      aria-hidden="true"
    />
  );
}

/**
 * Интерактивный заголовок TechText (чертежная эстетика Apple WWDC).
 * Дефис (– / -) рисуется как идеально ровная геометрическая планка строго по вертикальному центру.
 */
function TechText({
  text = 'ПРАВО 14–17',
  fontWeight = 700,
  fontSize = 142,
  dashLength = 5,
  dashGap = 2.5,
  specks = 15,
  clickKick = true,
  letterSpacing = -0.04,
  accentColor = '#0071E3',
  reach = 210,
  softness = 0.7,
  strokeWidth = 1.8,
  speed = 1,
  bounce = 0.4,
  selection = true,
  labels = true,
  color = '#1D1D1F',
  draggable = true,
  sweep = true
}) {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.clientWidth || 960;
    let height = container.clientHeight || 280;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    let letters = [];
    let particles = [];
    let draggedIndex = -1;
    let dragOffset = { x: 0, y: 0 };
    const pointer = { x: -9999, y: -9999, active: false };
    let sweepProgress = -0.3;
    let animId = 0;
    let isInViewport = true;
    let isMounted = true;

    const canvasFontFamily = "-apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif";

    const buildLayout = () => {
      if (!isMounted) return;
      width = Math.max(240, container.clientWidth || 960);
      height = Math.max(120, container.clientHeight || 280);
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const charFactor = Math.max(3.5, text.length * 0.68);
      const responsiveSize = Math.min(fontSize, Math.max(34, Math.floor(width / charFactor)));
      ctx.font = `${fontWeight} ${responsiveSize}px ${canvasFontFamily}`;

      const chars = Array.from(text);
      const spacingPx = responsiveSize * letterSpacing;
      const widths = chars.map((ch) => {
        if (ch === '–' || ch === '-') return responsiveSize * 0.56;
        return ctx.measureText(ch).width;
      });
      const totalWidth =
        widths.reduce((acc, w) => acc + w, 0) + spacingPx * Math.max(0, chars.length - 1);

      let cursorX = (width - totalWidth) / 2;
      const baseY = height * 0.65;

      letters = chars.map((ch, idx) => {
        const w = widths[idx];
        const centerX = cursorX + w / 2;
        cursorX += w + spacingPx;
        return {
          ch,
          isDash: ch === '–' || ch === '-',
          width: w,
          height: responsiveSize * 0.74,
          fontSize: responsiveSize,
          homeX: centerX,
          homeY: baseY,
          x: centerX,
          y: baseY,
          vx: 0,
          vy: 0,
          angle: 0,
          vAngle: 0
        };
      });

      particles = Array.from({ length: specks }, (_, i) => ({
        x: (i * 97) % Math.max(100, Math.floor(width)),
        y: (i * 53) % Math.max(80, Math.floor(height)),
        r: (i % 2) + 1.4,
        phase: i * 0.8
      }));
    };

    buildLayout();
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => {
        if (isMounted) buildLayout();
      });
    }
    window.addEventListener('resize', buildLayout);

    const getLocalCoords = (e) => {
      const rect = canvas.getBoundingClientRect();
      const touch = e.touches && e.touches[0];
      const clientX = touch ? touch.clientX : e.clientX;
      const clientY = touch ? touch.clientY : e.clientY;
      return { x: clientX - rect.left, y: clientY - rect.top };
    };

    const onPointerDown = (e) => {
      const pt = getLocalCoords(e);
      pointer.x = pt.x;
      pointer.y = pt.y;
      pointer.active = true;

      for (let i = letters.length - 1; i >= 0; i--) {
        const l = letters[i];
        if (l.ch === ' ') continue;
        if (
          Math.abs(pt.x - l.x) <= l.width * 0.58 &&
          Math.abs(pt.y - (l.y - l.height * 0.4)) <= l.height * 0.65
        ) {
          if (draggable) {
            draggedIndex = i;
            dragOffset = { x: pt.x - l.x, y: pt.y - l.y };
          }
          if (clickKick) {
            l.vy -= 11 * bounce;
            l.vx += (Math.random() - 0.5) * 9 * bounce;
            l.vAngle += (Math.random() - 0.5) * 0.14;
          }
          break;
        }
      }
    };

    const onPointerMove = (e) => {
      const pt = getLocalCoords(e);
      pointer.x = pt.x;
      pointer.y = pt.y;
      pointer.active = true;
      if (draggedIndex >= 0 && letters[draggedIndex]) {
        letters[draggedIndex].x = pt.x - dragOffset.x;
        letters[draggedIndex].y = pt.y - dragOffset.y;
        letters[draggedIndex].vx = 0;
        letters[draggedIndex].vy = 0;
      }
    };

    const onPointerUp = () => {
      draggedIndex = -1;
    };
    const onPointerLeave = () => {
      pointer.active = false;
      draggedIndex = -1;
    };

    canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove, { passive: true });
    window.addEventListener('mouseup', onPointerUp);
    canvas.addEventListener('mouseleave', onPointerLeave);
    canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);

    let lastNow = performance.now();

    const drawDashShape = (l, doFill, doStroke) => {
      const barW = l.fontSize * 0.36;
      const barH = Math.max(7, l.fontSize * 0.115);
      const centerY = -l.height * 0.46;
      const rx = barH * 0.25;
      ctx.beginPath();
      if (typeof ctx.roundRect === 'function') {
        ctx.roundRect(-barW / 2, centerY - barH / 2, barW, barH, rx);
      } else {
        ctx.rect(-barW / 2, centerY - barH / 2, barW, barH);
      }
      if (doFill) ctx.fill();
      if (doStroke) ctx.stroke();
    };

    const animate = (now) => {
      if (!isInViewport || document.hidden) {
        animId = 0;
        return;
      }

      const dt = Math.min(0.033, Math.max(0, (now - lastNow) / 1000)) * speed;
      lastNow = now;
      ctx.clearRect(0, 0, width, height);

      particles.forEach((p, idx) => {
        const py = p.y + Math.sin(now * 0.0018 + p.phase) * 5;
        ctx.fillStyle = idx % 2 === 0 ? 'rgba(0, 113, 227, 0.28)' : 'rgba(56, 189, 248, 0.35)';
        ctx.beginPath();
        ctx.arc(p.x, py, p.r, 0, Math.PI * 2);
        ctx.fill();
      });

      if (sweep) {
        sweepProgress += dt * 0.4;
        if (sweepProgress > 1.35) sweepProgress = -0.35;
      }

      const springK = 140 * (1 - softness * 0.45);
      const damping = 11;

      letters.forEach((l, idx) => {
        if (l.ch === ' ') return;

        if (idx !== draggedIndex) {
          let targetX = l.homeX;
          let targetY = l.homeY;
          if (pointer.active) {
            const dx = l.homeX - pointer.x;
            const dy = l.homeY - l.height * 0.35 - pointer.y;
            const dist = Math.hypot(dx, dy);
            if (dist < reach && dist > 1) {
              const force = Math.pow(1 - dist / reach, 2) * 22;
              targetX += (dx / dist) * force;
              targetY += (dy / dist) * force;
            }
          }
          const ax = (targetX - l.x) * springK - l.vx * damping;
          const ay = (targetY - l.y) * springK - l.vy * damping;
          l.vx += ax * dt;
          l.vy += ay * dt;
          l.x += l.vx * dt;
          l.y += l.vy * dt;

          const aAng = -l.angle * 120 - l.vAngle * 10;
          l.vAngle += aAng * dt;
          l.angle += l.vAngle * dt;
        }

        const isHovered =
          pointer.active &&
          Math.abs(pointer.x - l.x) <= l.width * 0.56 &&
          Math.abs(pointer.y - (l.y - l.height * 0.4)) <= l.height * 0.62;

        ctx.save();
        ctx.translate(l.x, l.y);
        ctx.rotate(l.angle);

        ctx.font = `${fontWeight} ${l.fontSize}px ${canvasFontFamily}`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'alphabetic';

        const outerStrokeW = (isHovered ? strokeWidth + 0.7 : strokeWidth) * 1.9;
        ctx.setLineDash([dashLength, dashGap]);
        ctx.lineWidth = outerStrokeW;
        ctx.strokeStyle = isHovered ? accentColor : color;
        ctx.lineJoin = 'round';
        ctx.shadowColor = isHovered ? 'rgba(0, 113, 227, 0.25)' : 'rgba(15, 23, 42, 0.08)';
        ctx.shadowBlur = isHovered ? 12 : 6;

        // Сначала рисуем пунктирный контур, затем плотную заливку поверх,
        // чтобы полностью скрыть внутренние пересечения штрихов в буквах (Р, А, 4)
        if (l.isDash) {
          drawDashShape(l, false, true);
          ctx.shadowBlur = 0;
          ctx.fillStyle = isHovered ? '#EBF5FF' : '#FFFFFF';
          drawDashShape(l, true, false);
        } else {
          ctx.strokeText(l.ch, 0, 0);
          ctx.shadowBlur = 0;
          ctx.fillStyle = isHovered ? '#EBF5FF' : '#FFFFFF';
          ctx.fillText(l.ch, 0, 0);
        }

        if (sweep) {
          const normX = l.x / Math.max(1, width);
          const distSweep = Math.abs(normX - sweepProgress);
          if (distSweep < 0.14) {
            const alpha = (1 - distSweep / 0.14) * 0.85;
            ctx.setLineDash([]);
            ctx.lineWidth = outerStrokeW;
            ctx.strokeStyle = `rgba(0, 113, 227, ${alpha.toFixed(3)})`;
            if (l.isDash) {
              drawDashShape(l, false, true);
              ctx.fillStyle = isHovered ? '#EBF5FF' : '#FFFFFF';
              drawDashShape(l, true, false);
            } else {
              ctx.strokeText(l.ch, 0, 0);
              ctx.fillStyle = isHovered ? '#EBF5FF' : '#FFFFFF';
              ctx.fillText(l.ch, 0, 0);
            }
          }
        }

        if ((selection || labels) && (isHovered || idx === draggedIndex)) {
          ctx.setLineDash([3, 3]);
          ctx.lineWidth = 1;
          ctx.strokeStyle = 'rgba(0, 113, 227, 0.65)';
          const boxW = l.width + 12;
          const boxH = l.height + 16;
          ctx.strokeRect(-boxW / 2, -l.height - 4, boxW, boxH);
          if (labels) {
            ctx.setLineDash([]);
            ctx.font = '600 10px ui-monospace, monospace';
            ctx.fillStyle = '#0071E3';
            ctx.fillText(`0${idx + 1}`, 0, -l.height - 9);
          }
        }

        ctx.restore();
      });

      animId = requestAnimationFrame(animate);
    };

    let observer = null;
    if (typeof IntersectionObserver !== 'undefined') {
      observer = new IntersectionObserver(
        (entries) => {
          isInViewport =
            entries[0] && typeof entries[0].isIntersecting === 'boolean'
              ? entries[0].isIntersecting
              : true;
          if (isInViewport && !animId) {
            lastNow = performance.now();
            animId = requestAnimationFrame(animate);
          }
        },
        { threshold: 0.05 }
      );
      observer.observe(container);
    }

    animId = requestAnimationFrame(animate);

    return () => {
      isMounted = false;
      if (animId) cancelAnimationFrame(animId);
      if (observer) observer.disconnect();
      window.removeEventListener('resize', buildLayout);
      canvas.removeEventListener('mousedown', onPointerDown);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      canvas.removeEventListener('mouseleave', onPointerLeave);
      canvas.removeEventListener('touchstart', onPointerDown);
      window.removeEventListener('touchmove', onPointerMove);
      window.removeEventListener('touchend', onPointerUp);
    };
  }, [
    text,
    fontWeight,
    fontSize,
    dashLength,
    dashGap,
    specks,
    clickKick,
    letterSpacing,
    accentColor,
    reach,
    softness,
    strokeWidth,
    speed,
    bounce,
    selection,
    labels,
    color,
    draggable,
    sweep
  ]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[110px] sm:h-[140px] lg:h-[164px] relative select-none cursor-grab active:cursor-grabbing"
    >
      <canvas ref={canvasRef} className="block w-full h-full" />
    </div>
  );
}

/**
 * Четкая 3D-карусель FlexCarousel (без мыльного 3D-растяжения шрифтов).
 * Центральная карточка в покое рендерится нативным 2D-слоем (transform: none) для Retina-резкости.
 */
function FlexCarousel({ items = [], onSelectModule }) {
  const wrapperRef = useRef(null);
  const cardRefs = useRef([]);
  const wakeRef = useRef(() => {});
  const [activeIndex, setActiveIndex] = useState(0);
  const [containerWidth, setContainerWidth] = useState(1120);

  const stateRef = useRef({
    targetIndex: 0,
    currentPos: 0,
    isDragging: false,
    startX: 0,
    dragStartPos: 0,
    movedDistance: 0,
    wheelAccumulator: 0
  });

  const count = items.length;

  const goToIndex = useCallback(
    (nextIdx) => {
      if (count === 0) return;
      const normalized = ((nextIdx % count) + count) % count;
      const curTarget = stateRef.current.targetIndex;
      const curMod = ((Math.round(curTarget) % count) + count) % count;
      let diff = normalized - curMod;
      if (diff > count / 2) diff -= count;
      if (diff < -count / 2) diff += count;
      stateRef.current.targetIndex = curTarget + diff;
      setActiveIndex(normalized);
      wakeRef.current();
    },
    [count]
  );

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const updateWidth = () => {
      setContainerWidth(el.getBoundingClientRect().width || 1120);
      wakeRef.current();
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  useEffect(() => {
    const el = wrapperRef.current;
    if (!el || count <= 1) return;
    const handleWheel = (e) => {
      const isHorizontal = Math.abs(e.deltaX) > Math.abs(e.deltaY) || e.shiftKey;
      if (!isHorizontal) return;
      const dominantDelta = Math.abs(e.deltaX) > Math.abs(e.deltaY) ? e.deltaX : e.deltaY;
      if (Math.abs(dominantDelta) < 2) return;
      e.preventDefault();
      stateRef.current.wheelAccumulator += dominantDelta;
      if (Math.abs(stateRef.current.wheelAccumulator) >= 65) {
        const steps = Math.trunc(stateRef.current.wheelAccumulator / 65);
        stateRef.current.wheelAccumulator -= steps * 65;
        stateRef.current.targetIndex += steps;
        const norm = ((Math.round(stateRef.current.targetIndex) % count) + count) % count;
        setActiveIndex(norm);
        wakeRef.current();
      }
    };
    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, [count]);

  useEffect(() => {
    if (count === 0) return;
    let rafId = 0;

    const animate = () => {
      const s = stateRef.current;
      if (!s.isDragging) {
        s.currentPos += (s.targetIndex - s.currentPos) * 0.14;
      }

      const settled = !s.isDragging && Math.abs(s.targetIndex - s.currentPos) < 0.001;
      if (settled) s.currentPos = s.targetIndex;

      const isMobile = containerWidth < 640;
  const cardHeightPx = isMobile ? 378 : 386;
  const cardWidthPx = isMobile ? Math.min(290, containerWidth - 40) : 340;
  const activeItem = items[activeIndex] || items[0];

  return (
    <div
      ref={wrapperRef}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      className="w-full relative select-none overflow-hidden flex flex-col items-center justify-center py-4 cursor-grab active:cursor-grabbing"
    >
      <div
        style={{ height: `${cardHeightPx + 24}px`, perspective: '1300px' }}
        className="w-full relative flex items-center justify-center"
      >
        {items.map((item, idx) => {
          const IconComponent = item.icon || Shield;
          const isCenter = idx === activeIndex;
          return (
            <div
              key={item.id || idx}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onClick={() => handleCardClick(idx, item)}
              style={{
                width: `${cardWidthPx}px`,
                height: `${cardHeightPx}px`,
                borderRadius: '24px',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased'
              }}
              className={`absolute bg-white border p-5 sm:p-6 overflow-hidden flex flex-col justify-between cursor-pointer transition-colors ${
                isCenter ? 'border-[#0071E3]/25' : 'border-black/[0.08]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="inline-flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-[#0071E3]/[0.1] text-[#0071E3] flex items-center justify-center shrink-0">
                      <IconComponent className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs font-semibold text-[#0071E3]">{item.badge}</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#86868B]">
                    0{idx + 1} / 0{count}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#1D1D1F] leading-snug mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed mb-3">{item.description}</p>

                <ul className="space-y-1.5 text-xs sm:text-sm text-[#1D1D1F]/85">
                  {item.highlights.map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] shrink-0 mt-1.5" />
                      <span className="leading-snug">{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-3.5 mt-3 border-t border-black/[0.06] flex items-center justify-between shrink-0">
                <span className="text-xs font-medium text-[#6E6E73]">{item.lawRef}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectModule) onSelectModule(item);
                  }}
                  className={`pp-btn inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full cursor-pointer ${
                    isCenter
                      ? 'bg-[#0071E3] text-white hover:bg-[#0077ED]'
                      : 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-black/10'
                  }`}
                >
                  <span>Открыть</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {activeItem && (
        <div className="mt-5 flex flex-col items-center gap-2 z-20 px-4">
  };

  const isMobile = containerWidth < 640;
  const cardHeightPx = isMobile ? 320 : 328;
  const cardWidthPx = isMobile ? Math.min(280, containerWidth - 44) : 335;
  const activeItem = items[activeIndex] || items[0];

  return (
    <div
      ref={wrapperRef}
      onMouseDown={handlePointerDown}
      onMouseMove={handlePointerMove}
      onMouseUp={handlePointerUp}
      onMouseLeave={handlePointerUp}
      onTouchStart={handlePointerDown}
      onTouchMove={handlePointerMove}
      onTouchEnd={handlePointerUp}
      style={{ height: `${cardHeightPx + 84}px` }}
      className="w-full relative select-none overflow-hidden flex flex-col items-center justify-center cursor-grab active:cursor-grabbing"
    >
      <div
        style={{ height: `${cardHeightPx}px`, perspective: '1300px' }}
        className="w-full relative flex items-center justify-center"
      >
        {items.map((item, idx) => {
          const IconComponent = item.icon || Shield;
          const isCenter = idx === activeIndex;
          return (
            <div
              key={item.id || idx}
              ref={(el) => {
                cardRefs.current[idx] = el;
              }}
              onClick={() => handleCardClick(idx, item)}
              style={{
                width: `${cardWidthPx}px`,
                height: `${cardHeightPx - 12}px`,
                borderRadius: '24px',
                backfaceVisibility: 'hidden',
                WebkitFontSmoothing: 'antialiased'
              }}
              className={`absolute bg-white border p-5 sm:p-6 flex flex-col justify-between cursor-pointer transition-colors ${
                isCenter ? 'border-[#0071E3]/25' : 'border-black/[0.08]'
              }`}
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3.5">
                  <div className="inline-flex items-center gap-2">
                    <span className="w-7 h-7 rounded-xl bg-[#0071E3]/[0.1] text-[#0071E3] flex items-center justify-center shrink-0">
                      <IconComponent className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-xs font-semibold text-[#0071E3]">{item.badge}</span>
                  </div>
                  <span className="text-xs font-mono font-semibold text-[#86868B]">
                    0{idx + 1} / 0{count}
                  </span>
                </div>

                <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#1D1D1F] leading-snug mb-2">
                  {item.title}
                </h3>

                <p className="text-xs sm:text-sm text-[#6E6E73] leading-relaxed mb-3.5">{item.description}</p>

                <ul className="space-y-1.5 text-xs sm:text-sm text-[#1D1D1F]/85">
                  {item.highlights.map((hl, hIdx) => (
                    <li key={hIdx} className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#0071E3] shrink-0" />
                      <span>{hl}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-black/[0.06] flex items-center justify-between">
                <span className="text-xs font-medium text-[#6E6E73]">{item.lawRef}</span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    if (onSelectModule) onSelectModule(item);
                  }}
                  className={`pp-btn inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold px-4 py-2 rounded-full cursor-pointer ${
                    isCenter
                      ? 'bg-[#0071E3] text-white hover:bg-[#0077ED]'
                      : 'bg-[#F5F5F7] text-[#1D1D1F] hover:bg-black/10'
                  }`}
                >
                  <span>Открыть</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {activeItem && (
        <div className="mt-4 flex flex-col items-center gap-2 z-20 px-4">
          <div className="flex items-center gap-3 bg-white border border-black/[0.08] px-3 py-1.5 rounded-full shadow-sm">
            <button
              type="button"
              onClick={() => goToIndex(activeIndex - 1)}
              className="w-7 h-7 rounded-full hover:bg-black/[0.06] flex items-center justify-center text-[#1D1D1F] cursor-pointer"
              aria-label="Предыдущий модуль"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-1.5">
              {items.map((it, idx) => (
                <button
                  key={it.id || idx}
                  type="button"
                  onClick={() => goToIndex(idx)}
                  aria-label={`Перейти к карточке ${idx + 1}`}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    idx === activeIndex ? 'w-6 bg-[#0071E3]' : 'w-2 bg-black/20 hover:bg-black/40'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => goToIndex(activeIndex + 1)}
              className="w-7 h-7 rounded-full hover:bg-black/[0.06] flex items-center justify-center text-[#1D1D1F] cursor-pointer"
              aria-label="Следующий модуль"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          <div className="text-xs text-[#6E6E73] font-medium text-center">
            Листайте колесом мыши, свайпом или нажмите на карточку •{' '}
            <span className="text-[#1D1D1F] font-semibold">{activeItem.title}</span>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Интерактивный радар ловушек работодателей (адаптация Reachable Crowd под «ПравоПодростка 14–17»).
 * Маяк со щитом находится в естественном потоке под кнопкой «Составить претензию» без наложений.
 */
const PEEP_BASE =
  'https://wbarljqnwyapytycfglm.supabase.co/storage/v1/object/public/canvas_assets/c5b084d7-d978-4942-8775-19c92226e9c1/';
const PEEP_URLS = [
  '381d6479-f5b5-49ca-82f3-474c87c62996',
  '9df39fca-20db-4273-bf7e-488d04a13321',
  '3c8ee64a-67b3-4a2c-84d5-c665c725e7c5',
  '3ccafa92-f479-4885-a6fb-0af92993b7f6',
  '735686b6-9bd5-4ab1-9fe6-59c50b5e2eb0',
  '3f775475-8920-4f55-b7c1-16bf192a0b1f',
  'b56ceaf5-7fb3-40a2-bb1a-d41c547c71ca',
  '4bd0452d-b321-4488-b57a-0c52dc73ceb1',
  '5d3553c5-a46f-4238-bcb5-02ff60b0f907',
  '6669baf9-e6d8-476b-abd4-e3d52517aee8',
  '2a2fffcb-9e4e-4610-a2ec-c2c334e29001',
  '742a5c0b-c77f-4ab3-96eb-dbca387f5ff8'
].map((id) => `${PEEP_BASE}${id}.svg`);

const TRAP_SIGNALS = [
  {
    tag: 'Стажировка',
    tc: 'warn',
    signal: '«Первые 5 смен — бесплатно»',
    lab: 'Ст. 16, 67 ТК РФ',
    line: 'Допуск к работе = договор с 1-го часа',
    rtag: 'По закону',
    rc: 'ok',
    reply: 'Оплатили все 5 смен полностью'
  },
  {
    tag: 'Испытание',
    tc: 'danger',
    signal: '«Испытательный срок 2 недели»',
    lab: 'Ч. 4 ст. 70 ТК РФ',
    line: 'Испытание до 18 лет прямо запрещено',
    rtag: 'Защищено',
    rc: 'ok',
    reply: 'Пункт об испытании исключили'
  },
  {
    tag: 'Штрафы',
    tc: 'danger',
    signal: '«Штраф 1000 ₽ за опоздание»',
    lab: 'Ст. 192, 244 ТК РФ',
    line: 'Денежные штрафы в ТК РФ незаконны',
    rtag: 'Отменено',
    rc: 'ok',
    reply: 'Зарплату выплатили без вычетов'
  },
  {
    tag: 'Без договора',
    tc: 'warn',
    signal: '«Оформим потом, платим наличкой»',
    lab: 'Ст. 67 ТК РФ',
    line: 'Письменный договор обязателен за 3 дня',
    rtag: 'Оформлено',
    rc: 'ok',
    reply: 'Подписали договор в 2 экземплярах'
  },
  {
    tag: 'Ночная смена',
    tc: 'danger',
    signal: '«Выйдешь в смену до 01:00 ночи»',
    lab: 'Ст. 96, 268 ТК РФ',
    line: 'Работа с 22:00 до 06:00 запрещена',
    rtag: 'Исправлено',
    rc: 'ok',
    reply: 'Перевели на дневной график'
  }
];

function EmployerTrapsCrowdHero({ onOpenClaim }) {
  const rootRef = useRef(null);
  const canvasRef = useRef(null);
  const crowdRef = useRef(null);
  const beaconRef = useRef(null);
  const cboxRef = useRef(null);
  const clabRef = useRef(null);
  const ctxtRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    const fx = canvasRef.current;
    const crowd = crowdRef.current;
    const btile = beaconRef.current;
    const cbox = cboxRef.current;
    const clab = clabRef.current;
    const ctxt = ctxtRef.current;
    if (!root || !fx || !crowd || !btile) return;

    const ctx = fx.getContext('2d');
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let W = root.clientWidth || 960;
    let H = root.clientHeight || 600;
    let beaconX = W / 2;
    let beaconY = 260;
    let crowdTop = 310;
    let crowdH = 290;

    const measure = () => {
      const rRect = root.getBoundingClientRect();
      W = Math.max(240, rRect.width || 960);
      H = Math.max(360, rRect.height || 600);
      fx.width = Math.floor(W * dpr);
      fx.height = Math.floor(H * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const bRect = btile.getBoundingClientRect();
      beaconX = bRect.left - rRect.left + bRect.width / 2;
      beaconY = bRect.top - rRect.top + bRect.height / 2;

      const cRect = crowd.getBoundingClientRect();
      crowdTop = cRect.top - rRect.top;
      crowdH = cRect.height || 290;
    };

    measure();
    let ro = null;
    if (typeof ResizeObserver !== 'undefined') {
      ro = new ResizeObserver(measure);
      ro.observe(root);
    } else {
      window.addEventListener('resize', measure);
    }

    let seed = 42;
    const rnd = () => {
      seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
    const ease = (k) => (k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2);

    const COL = '#0071E3';
    const al = (o) => `rgba(0, 113, 227, ${o})`;

    crowd.innerHTML = '';
    const P = [];
    const fadeFilter = (p) =>
      `blur(${Math.max(0, (70 - p.t) * 0.035).toFixed(2)}px) contrast(${(
        0.48 +
        0.35 * p.depth
      ).toFixed(2)}) brightness(${(1 / (0.76 + 0.16 * p.depth)).toFixed(2)})`;

    const place = (p, anywhere) => {
      p.t = 34 + rnd() * 48;
      p.depth = (p.t - 34) / 48;
      p.w = 108 + (p.t - 34) * 1.65;
      p.h = p.w * 1.32;
      p.dir = rnd() < 0.5 ? 1 : -1;
      p.speed = 6.5 + rnd() * 5.5;
      p.x = anywhere ? 8 + rnd() * 84 : p.dir > 0 ? -8 : 108;
      p.v = 1;
      p.state = 'walk';
      p.reached = false;
      p.ph = rnd() * Math.PI * 2;
      p.f = 1.6 + p.speed * 0.14;
      p.bob = 0;
      p.px = (p.x / 100) * W;
      p.el.className = 'pw';
      p.el.style.cssText = `top:${p.t.toFixed(1)}%;width:${p.w.toFixed(0)}px;height:${p.h.toFixed(
        0
      )}px;z-index:${Math.round(p.t)}`;
      p.img.src = PEEP_URLS[Math.floor(rnd() * PEEP_URLS.length)];
      p.img.style.filter = fadeFilter(p);
      p.img.style.transform = `scaleX(${p.dir})`;
    };

    const peepCount = W < 640 ? 14 : 24;
    for (let i = 0; i < peepCount; i++) {
      const el = document.createElement('div');
      el.innerHTML =
        '<div class="pe"><div class="hp"><img alt="" draggable="false" decoding="async"><i class="ok-badge"><svg width="13" height="13" viewBox="0 0 24 24"><path fill="none" stroke="#fff" stroke-width="3.2" stroke-linecap="round" stroke-linejoin="round" d="M5 12.5l4.5 4.5L19 7.5"/></svg></i></div></div>';
      crowd.appendChild(el);
      const p = {
        el,
        pe: el.firstChild,
        hp: el.firstChild.firstChild,
        img: el.querySelector('img')
      };
      place(p, true);
      P.push(p);
    }

    const headPos = (p) => [p.px, crowdTop + (crowdH * p.t) / 100 - p.h * 0.18 + p.bob];

    const slots = [0, 1].map(() => {
      const tip = document.createElement('div');
      tip.className = 'tip-wrap';
      tip.innerHTML = '<div class="tbox"></div>';
      root.appendChild(tip);
      return { tip, box: tip.querySelector('.tbox'), p: null };
    });

    let comp = null;
    let side = 1;
    let di = 0;
    let nextAt = 0.5;
    let alive = true;

    const pulseBeacon = () => {
      btile.classList.add('pulse');
      setTimeout(() => {
        if (alive) btile.classList.remove('pulse');
      }, 360);
    };

    const pickPerson = () => {
      const activeXs = slots.filter((s) => s.p).map((s) => s.p.px);
      const cx = W / 2;
      const ok = (p) => {
        if (p.state !== 'walk' || p.reached || p.t < 46) return false;
        return (
          p.px > W * 0.16 &&
          p.px < W * 0.84 &&
          Math.abs(p.px - cx) > 90 &&
          activeXs.every((ax) => Math.abs(ax - p.px) > 260)
        );
      };
      let candidates = P.filter(ok);
      const pref = candidates.filter((p) => (p.px - cx) * side > 0);
      if (pref.length) candidates = pref;
      if (!candidates.length) return null;
      side = -side;
      return candidates[Math.floor(rnd() * candidates.length)];
    };

    const startSlot = (now) => {
      const s = slots.find((sl) => !sl.p);
      if (!s) {
        nextAt = now + 0.3;
        return;
      }
      const p = pickPerson();
      if (!p) {
        nextAt = now + 0.35;
        return;
      }
      s.p = p;
      s.d = TRAP_SIGNALS[di++ % TRAP_SIGNALS.length];
      s.t0 = now;
      s.st = 0;
      nextAt = now + 2.8;
      p.state = 'locked';
      p.el.style.zIndex = '180';
      p.img.style.filter = 'none';
    };

    const drawReach = (s, a, now, hx, hy) => {
      const p = s.p;
      const P0 = [beaconX, beaconY];
      const P1 = [(P0[0] + hx) / 2, Math.min(beaconY, hy) - (24 + Math.abs(hx - P0[0]) * 0.06)];
      const B = (u) => {
        const v = 1 - u;
        return [
          v * v * P0[0] + 2 * v * u * P1[0] + u * u * hx,
          v * v * P0[1] + 2 * v * u * P1[1] + u * u * hy
        ];
      };
      const seg = (u0, u1, n) => {
        ctx.beginPath();
        for (let i = 0; i <= n; i++) {
          const q = B(u0 + ((u1 - u0) * i) / n);
          if (i) ctx.lineTo(q[0], q[1]);
          else ctx.moveTo(q[0], q[1]);
        }
        ctx.stroke();
      };

      ctx.strokeStyle = COL;
      ctx.lineCap = 'round';

      if (a < 3.4) {
        const R = p.w * 0.25;
        const k = Math.min(1, a / 0.45);
        const e = 1 - Math.pow(1 - k, 3);
        ctx.save();
        ctx.translate(hx, hy);
        ctx.rotate(now * 1.1);
        ctx.globalAlpha = 0.85 * k;
        ctx.lineWidth = 2;
        ctx.setLineDash([R * 0.48, R * 0.28]);
        ctx.beginPath();
        ctx.arc(0, 0, R * (2.0 - 1.0 * e), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }

      if (a < 5.6) {
        ctx.save();
        ctx.lineWidth = 1.4;
        if (a < 3.4) {
          ctx.globalAlpha = 0.48;
          ctx.setLineDash([4, 6]);
          ctx.lineDashOffset = -now * 26;
          seg(0, Math.min(1, a / 0.55), 24);
        } else {
          ctx.globalAlpha = 0.32 * Math.min(1, (5.6 - a) / 0.4);
          seg(0, 1, 24);
        }
        ctx.restore();
      }

      if (a >= 2.55 && a < 3.4) {
        const u = ease((a - 2.55) / 0.85);
        ctx.save();
        ctx.shadowColor = al(0.75);
        ctx.shadowBlur = 12;
        for (let i = 0; i < 10; i++) {
          const u1 = u - (0.38 * i) / 10;
          const u0 = u - (0.38 * (i + 1)) / 10;
          if (u1 <= 0) break;
          const f = 1 - i / 10;
          ctx.globalAlpha = f * 0.85;
          ctx.lineWidth = 5 * f + 1;
          seg(Math.max(0, u0), u1, 3);
        }
        const q = B(u);
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#FFFFFF';
        ctx.strokeStyle = COL;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(q[0], q[1], 7, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      }

      if (a >= 3.4 && a < 4.0) {
        const k = (a - 3.4) / 0.6;
        const e = 1 - Math.pow(1 - k, 3);
        ctx.save();
        ctx.globalAlpha = 1 - k;
        ctx.lineWidth = 2.2;
        ctx.beginPath();
        ctx.arc(hx, hy, p.w * 0.18 + e * p.w * 0.3, 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();
      }
    };

    let raf = 0;
    let last = performance.now();
    let nowSec = 0;

    const loop = (ms) => {
      if (!alive) return;
      const dt = Math.min(0.05, Math.max(0, (ms - last) / 1000));
      last = ms;
      nowSec += dt;

      for (const p of P) {
        const tv = p.state === 'walk' ? 1 : p.state === 'locked' ? 0.3 : 0;
        p.v += (tv - p.v) * Math.min(1, dt * 5);
        p.x += p.dir * p.speed * p.v * dt;
        if ((p.x > 110 || p.x < -10) && p.state === 'walk') place(p, false);
        const s = Math.sin(nowSec * Math.PI * p.f + p.ph);
        p.bob = -Math.abs(s) * (1.2 + 2.0 * p.depth) * p.v;
        p.px = (p.x / 100) * W;
        p.pe.style.transform = `translate3d(${Math.round(p.px - p.w / 2)}px, ${Math.round(
          -p.h / 2 + p.bob
        )}px, 0) rotate(${(s * 0.6 * p.v).toFixed(2)}deg)`;
      }

      if (nowSec >= nextAt) startSlot(nowSec);
      ctx.clearRect(0, 0, W, H);

      for (const s of slots) {
        if (!s.p) continue;
        const a = nowSec - s.t0;
        const p = s.p;
        const d = s.d;

        if (s.st < 1 && a >= 0.7) {
          s.st = 1;
          s.box.innerHTML = `<span class="tg ${d.tc}">${d.tag}</span><span>${d.signal}</span>`;
          s.box.className = 'tbox show';
        }
        if (s.st < 2 && a >= 1.5) {
          s.st = 2;
          comp = { d, t0: nowSec, n: -1 };
          if (clab) clab.textContent = d.lab;
          if (ctxt) ctxt.textContent = '';
          if (cbox) cbox.classList.add('show');
        }
        if (s.st < 3 && a >= 2.55) {
          s.st = 3;
          if (comp && comp.d === d) {
            if (cbox) cbox.classList.remove('show');
            comp = null;
          }
          pulseBeacon();
        }
        if (s.st < 4 && a >= 3.4) {
          s.st = 4;
          p.state = 'read';
          p.reached = true;
          p.img.style.filter = `drop-shadow(0 0 12px ${al(0.55)})`;
          p.el.classList.add('hop');
          setTimeout(() => {
            if (alive) p.el.classList.remove('hop');
          }, 450);
        }
        if (s.st < 5 && a >= 4.0) {
          s.st = 5;
          s.box.classList.add('flip');
          setTimeout(() => {
            if (!alive || !s.p) return;
            s.box.innerHTML = `<span class="tg ${d.rc}">${d.rtag}</span><span>${d.reply}</span>`;
            s.box.className = 'tbox show';
          }, 140);
        }
        if (s.st < 6 && a >= 5.1) {
          s.st = 6;
          pulseBeacon();
          p.el.classList.add('done');
        }
        if (s.st < 7 && a >= 6.0) {
          s.st = 7;
          s.box.className = 'tbox';
          p.state = 'walk';
          p.el.style.zIndex = String(Math.round(p.t));
          p.img.style.filter = `drop-shadow(0 0 6px ${al(0.35)})`;
        }
        if (a >= 6.4) {
          s.p = null;
          continue;
        }

        const [hx, hy] = headPos(p);
        const clampedTipX = Math.max(165, Math.min(W - 165, hx));
        const clampedTipY = Math.max(crowdTop + 18, hy - p.h * 0.2 - 12);
        s.tip.style.transform = `translate3d(${Math.round(clampedTipX)}px, ${Math.round(
          clampedTipY
        )}px, 0)`;
        drawReach(s, a, nowSec, hx, hy);
      }

      if (comp && ctxt) {
        const L = comp.d.line;
        const n = Math.ceil(Math.min(1, (nowSec - comp.t0) / 0.75) * L.length);
        if (n !== comp.n) {
          comp.n = n;
          ctxt.textContent = L.slice(0, n);
        }
      }

      raf = requestAnimationFrame(loop);
    };

    raf = requestAnimationFrame(loop);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
      if (ro) ro.disconnect();
      else window.removeEventListener('resize', measure);
      slots.forEach((s) => s.tip.remove());
      crowd.innerHTML = '';
    };
  }, []);

  return (
    <section
      ref={rootRef}
      className="traps-stage rounded-[28px] border border-black/[0.06] shadow-[0_8px_32px_rgba(0,0,0,0.04)] pt-8 sm:pt-10 px-4 sm:px-8"
    >
      <div className="relative z-10 max-w-3xl mx-auto text-center">
        <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0071E3] bg-[#0071E3]/[0.08] px-3.5 py-1.5 rounded-full mb-3">
          <span className="w-2 h-2 rounded-full bg-[#0071E3]" />
          <span>Живой радар нарушений ТК РФ</span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] leading-tight mb-2.5">
          Уловки работодателей, которые{' '}
          <span className="text-[#0071E3]">останавливает закон.</span>
        </h2>

        <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed mb-5 max-w-2xl mx-auto">
          Смотрите, как работает правовая защита на практике: на каждую незаконную уловку на
          подработке существует конкретная статья Трудового кодекса РФ.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={onOpenClaim}
            className="pp-btn inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#0077ED] text-white text-sm font-semibold px-6 py-3 rounded-full cursor-pointer shadow-sm"
          >
            <FileText className="w-4 h-4" />
            <span>Составить претензию</span>
          </button>
        </div>
      </div>

      {/* Центральный правовой маяк строго ПОД кнопкой с чистым отступом */}
      <div className="relative z-10 flex flex-col items-center mt-7 mb-2">
        <div
          ref={beaconRef}
          className="btile w-14 h-14 rounded-2xl bg-[#0071E3] text-white flex items-center justify-center shadow-[0_0_0_5px_rgba(255,255,255,0.9),0_14px_28px_-10px_rgba(0,113,227,0.75)]"
        >
          <ShieldCheck className="w-7 h-7" />
        </div>
        <div className="h-9 mt-2.5 flex items-center justify-center">
          <div ref={cboxRef} className="cbox">
            <span ref={clabRef} className="lab" />
            <span ref={ctxtRef} className="font-medium" />
          </div>
        </div>
      </div>

      <div ref={crowdRef} className="crowd-layer z-[2]" aria-hidden="true" />

      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none z-[5]"
        aria-hidden="true"
      />
    </section>
  );
}

const VALID_TABS = new Set([
  'overview',
  'calculator',
  'documents',
  'radar',
  'traps',
  'privacy',
  '404'
]);
const CHECKLIST_STORAGE_KEY = 'pravopodrostka_checklist_v1';
const SUPPORT_EMAIL = 'spartaksarkisyan22@gmail.com';
const SUPPORT_MAILTO_HREF = `mailto:${SUPPORT_EMAIL}?subject=${encodeURIComponent(
  'Обращение с сайта «ПравоПодростка 14–17»'
)}`;

const CHANGELOG_ITEMS = [
  {
    date: 'Обновление 1.6',
    title: 'Новый логотип со щитом и анимация кнопок',
    desc: 'Добавлен фирменный векторный логотип «14–17 ПРАВОПОДРОСТКА» с живой галочкой и пружинный отклик кнопок.'
  },
  {
    date: 'Обновление 1.5',
    title: 'Живой радар ловушек работодателей',
    desc: 'В раздел «Ловушки работодателей» добавлена интерактивная сцена с разбором 5 частых нарушений ТК РФ.'
  },
  {
    date: 'Обновление 1.4',
    title: 'Retina-чёткость 3D-карусели и ровный дефис',
    desc: 'Убрано размытие текста на карточках карусели и выровнен дефис в интерактивном заголовке «ПРАВО 14–17».'
  },
  {
    date: 'Обновление 1.3',
    title: 'Политика конфиденциальности и страница 404',
    desc: 'Добавлена подробная Политика конфиденциальности (10 разделов), кнопка очистки localStorage и страница 404.'
  },
  {
    date: 'Запуск 1.0',
    title: 'Публикация сайта в интернете',
    desc: 'Запущены калькулятор подработки, конструктор документов, шкала прав 14/16/18 и симулятор финансов.'
  }
];

export default function App() {
  const getTabFromHash = () => {
    try {
      const raw = (window.location.hash || '').replace(/^#/, '').trim();
      if (!raw) return 'overview';
      return VALID_TABS.has(raw) ? raw : '404';
    } catch (_e) {
      return 'overview';
    }
  };

  const [activeTab, setActiveTab] = useState(getTabFromHash);
  const [toastMessage, setToastMessage] = useState('');
  const [openFaqIndex, setOpenFaqIndex] = useState(0);
  const [showChangelog, setShowChangelog] = useState(false);
  const financeSectionRef = useRef(null);

  const navigateTo = useCallback((tabId, options = {}) => {
    const nextTab = VALID_TABS.has(tabId) ? tabId : '404';
    setActiveTab(nextTab);
    try {
      if (window.location.hash !== `#${nextTab}`) {
        window.history.replaceState(null, '', `#${nextTab}`);
      }
    } catch (_e) {
      // ignore in sandboxed iframes
    }
    if (options.scrollToFinance) {
      setTimeout(() => {
        if (financeSectionRef.current) {
          financeSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 120);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, []);

  useEffect(() => {
    const onHashChange = () => setActiveTab(getTabFromHash());
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const showToast = useCallback((msg) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? '' : prev));
    }, 2800);
  }, []);

  const copyText = useCallback(
    (text, message) => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          navigator.clipboard
            .writeText(text)
            .then(() => showToast(message))
            .catch(() => showToast(message));
          return;
        }
      } catch (_e) {
        // fallback below
      }
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      try {
        document.execCommand('copy');
      } catch (_e) {
        // ignore
      }
      document.body.removeChild(ta);
      showToast(message);
    },
    [showToast]
  );

  const navItems = useMemo(
    () => [
      { id: 'overview', label: 'Обзор', icon: Shield },
      { id: 'calculator', label: 'Калькулятор подработки', icon: Calculator },
      { id: 'documents', label: 'Конструктор документов', icon: FileText },
      { id: 'radar', label: 'Шкала прав и финансы', icon: Scale },
      { id: 'traps', label: 'Ловушки работодателей', icon: AlertTriangle }
    ],
    []
  );

  const carouselModules = useMemo(
    () => [
      {
        id: 'mod-calc',
        targetTab: 'calculator',
        icon: Calculator,
        badge: 'Инструмент 01',
        title: 'Калькулятор подработки',
        description:
          'Мгновенная проверка графика смен, испытательного срока и условий вакансии по нормам Трудового кодекса РФ.',
        highlights: [
          'Лимит часов для 14, 15, 16 и 17 лет',
          'Проверка учебы и каникул отдельно'
        ],
        lawRef: 'Ст. 70, 92, 94 ТК РФ'
      },
      {
        id: 'mod-docs',
        targetTab: 'documents',
        icon: FileText,
        badge: 'Инструмент 02',
        title: 'Конструктор документов',
        description:
          'Автоматическая генерация заявлений и согласий с возможностью копирования, выгрузки в .txt и печати.',
        highlights: [
          'Согласие родителей на работу в 14 лет',
          'Требование оплаты стажировки и отпуска'
        ],
        lawRef: 'Ст. 63, 67, 267 ТК РФ'
      },
      {
        id: 'mod-radar',
        targetTab: 'radar',
        icon: Scale,
        badge: 'Инструмент 03',
        title: 'Шкала прав 14 / 16 / 18',
        description:
          'Наглядное сравнение расширения дееспособности и наступления юридической ответственности по возрастам.',
        highlights: [
          'Самостоятельный договор с 16 лет',
          'Условия эмансипации несовершеннолетних'
        ],
        lawRef: 'Ст. 21, 26, 27 ГК РФ'
      },
      {
        id: 'mod-finance',
        targetTab: 'radar',
        scrollToFinance: true,
        icon: CreditCard,
        badge: 'Инструмент 04',
        title: 'Карты и финансы с 14 лет',
        description:
          'Симулятор банковских сделок: покупка техники на свой заработок, вклады, возврат товара и защита от дропперства.',
        highlights: [
          'Право распоряжаться зарплатой и вкладом',
          'Защита от мошеннических переводов'
        ],
        lawRef: 'П. 2 ст. 26 ГК РФ'
      },
      {
        id: 'mod-traps',
        targetTab: 'traps',
        icon: AlertTriangle,
        badge: 'Инструмент 05',
        title: 'Ловушки работодателей',
        description:
          'Разбор 5 незаконных уловок при приеме на работу и готовые вежливые формулировки ответа со ссылкой на закон.',
        highlights: [
          'Запрет штрафов за опоздание и бой посуды',
          'Оплата каждого часа «пробной смены»'
        ],
        lawRef: 'Ст. 16, 192, 244 ТК РФ'
      }
    ],
    []
  );

  const handleOpenCarouselModule = useCallback(
    (item) => navigateTo(item.targetTab, { scrollToFinance: Boolean(item.scrollToFinance) }),
    [navigateTo]
  );

  // 1. Чек-лист
  const checklistItems = useMemo(
    () => [
      {
        title: '1. Письменный трудовой договор (ст. 67 ТК РФ)',
        desc: 'Работодатель готов подписать договор в двух экземплярах не позднее 3 дней с начала работы.'
      },
      {
        title: '2. Отсутствие испытательного срока (ст. 70 ТК РФ)',
        desc: 'В договоре нет условий о «бесплатной стажировке» или испытательном сроке.'
      },
      {
        title: '3. Соблюдение нормы часов (ст. 92, 94 ТК РФ)',
        desc: 'Длительность смены и недели не превышает федеральный лимит для вашего возраста.'
      },
      {
        title: '4. Медосмотр за счет компании (ст. 266 ТК РФ)',
        desc: 'Работодатель выдал направление и сам оплачивает обязательный медосмотр.'
      },
      {
        title: '5. Отсутствие денежных штрафов (ст. 192 ТК РФ)',
        desc: 'В правилах нет незаконных удержаний из зарплаты за опоздания или бой посуды.'
      }
    ],
    []
  );

  const [checklist, setChecklist] = useState(() => {
    try {
      const saved = localStorage.getItem(CHECKLIST_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length === 5) return parsed;
      }
    } catch (_e) {
      // ignore
    }
    return [false, false, false, false, false];
  });

  useEffect(() => {
    try {
      localStorage.setItem(CHECKLIST_STORAGE_KEY, JSON.stringify(checklist));
    } catch (_e) {
      // ignore
    }
  }, [checklist]);

  const clearLocalStorageData = useCallback(() => {
    try {
      localStorage.removeItem(CHECKLIST_STORAGE_KEY);
    } catch (_e) {
      // ignore
    }
    setChecklist([false, false, false, false, false]);
    showToast('Локальные данные чек-листа очищены');
  }, [showToast]);

  const completedChecks = checklist.filter(Boolean).length;
  const checkProgress = Math.round((completedChecks / checklist.length) * 100);

  // 2. Калькулятор подработки
  const [age, setAge] = useState(16);
  const [period, setPeriod] = useState('study');
  const [shiftHours, setShiftHours] = useState(6);
  const [weekHours, setWeekHours] = useState(24);
  const [hasProbation, setHasProbation] = useState(true);
  const [hasNight, setHasNight] = useState(false);
  const [hasFine, setHasFine] = useState(false);
  const [hasMed, setHasMed] = useState(false);
  const [hasHeavy, setHasHeavy] = useState(false);

  const applyCalcPreset = (presetType) => {
    if (presetType === 'violation_demo') {
      setAge(16);
      setPeriod('study');
      setShiftHours(6);
      setWeekHours(24);
      setHasProbation(true);
      setHasNight(false);
      setHasFine(false);
      setHasMed(false);
      setHasHeavy(false);
    } else if (presetType === 'ok_14') {
      setAge(14);
      setPeriod('holiday');
      setShiftHours(4);
      setWeekHours(20);
      setHasProbation(false);
      setHasNight(false);
      setHasFine(false);
      setHasMed(false);
      setHasHeavy(false);
    }
  };

  const analysis = useMemo(() => {
    const shift = Math.max(0, Number(shiftHours) || 0);
    const week = Math.max(0, Number(weekHours) || 0);
    let maxShift = 0;
    let maxWeek = 0;

    if (period === 'holiday') {
      maxWeek = age <= 15 ? 24 : 35;
      maxShift = age === 14 ? 4 : age === 15 ? 5 : 7;
    } else {
      maxWeek = age <= 15 ? 12 : 17.5;
      maxShift = age <= 15 ? 2.5 : 4;
    }

    const violations = [];
    if (shift > maxShift) {
      violations.push(
        `Превышена длительность смены: указано ${shift} ч при допустимом максимуме ${maxShift} ч в день для возраста ${age} лет (ст. 94 ТК РФ).`
      );
    }
    if (week > maxWeek) {
      violations.push(
        `Превышена недельная нагрузка: указано ${week} ч при допустимом максимуме ${maxWeek} ч в неделю (ст. 92 ТК РФ).`
      );
    }
    if (hasProbation) {
      violations.push(
        'Запрет испытательного срока: согласно абз. 4 ч. 4 ст. 70 ТК РФ испытание при приеме на работу не устанавливается для лиц моложе 18 лет.'
      );
    }
    if (hasNight) {
      violations.push(
        'Запрет ночных смен и переработок: по ст. 96 и ст. 268 ТК РФ несовершеннолетних запрещено привлекать к работе с 22:00 до 06:00 и сверхурочно.'
      );
    }
    if (hasFine) {
      violations.push(
        'Незаконные штрафы: ст. 192 ТК РФ разрешает только замечание, выговор или увольнение — денежные удержания из зарплаты запрещены.'
      );
    }
    if (hasMed) {
      violations.push(
        'Нарушение порядка медосмотра: согласно ст. 266 ТК РФ обязательный предварительный медосмотр до 18 лет оплачивает работодатель.'
      );
    }
    if (hasHeavy) {
      violations.push(
        'Запрещенные виды работ: ст. 265 ТК РФ запрещает труд несовершеннолетних на работах с вредными условиями, переноской тяжестей сверх норм и в торговле спиртным/табаком.'
      );
    }
    return { maxShift, maxWeek, violations };
  }, [age, period, shiftHours, weekHours, hasProbation, hasNight, hasFine, hasMed, hasHeavy]);

  // 3. Конструктор документов
  const [docType, setDocType] = useState('consent');
  const [docEmployer, setDocEmployer] = useState('');
  const [docPerson1, setDocPerson1] = useState('');
  const [docPerson2, setDocPerson2] = useState('');
  const [docExtra1, setDocExtra1] = useState('');
  const [docDate, setDocDate] = useState(() => new Date().toISOString().split('T')[0]);

  const buildDocumentText = useCallback(() => {
    const employer = docEmployer.trim() || '[Наименование организации / ИП]';
    const p1 = docPerson1.trim() || '[ФИО заявителя]';
    const p2 = docPerson2.trim() || '[Данные несовершеннолетнего / параметры]';
    const e1 = docExtra1.trim() || '[Должность]';
    const dateFormatted = docDate ? new Date(docDate).toLocaleDateString('ru-RU') : '[Дата]';

    if (docType === 'consent') {
      return `Руководителю ${employer}
от ${p1}

ПИСЬМЕННОЕ СОГЛАСИЕ РОДИТЕЛЯ
на заключение трудового договора с несовершеннолетним
(в порядке ч. 3 ст. 63 Трудового кодекса РФ)

Я, ${p1}, являясь родителем (законным представителем) несовершеннолетнего(ей) ${p2}, настоящим даю письменное согласие на заключение с моим ребенком трудового договора для выполнения легкого труда в должности «${e1}» в ${employer}.

Трудовая деятельность будет осуществляться в свободное от получения образования время и без причинения вреда здоровью и ущерба освоению образовательной программы.

С условиями труда, графиком смен и требованиями статей 63, 70, 92, 94 и 266 Трудового кодекса РФ ознакомлен(а).

Дата: ${dateFormatted}
Подпись родителя: _______________ / ${p1} /`;
    }

    if (docType === 'internship') {
      return `Руководителю ${employer}
от ${p1}

ЗАЯВЛЕНИЕ
об оформлении трудового договора и оплате фактически отработанного времени
(на основании ст. 16, 67, 70 и 136 Трудового кодекса РФ)

С ${dateFormatted} я был(а) фактически допущен(а) к выполнению трудовых обязанностей в ${employer} в должности «${e1}». Общий объем фактически отработанного времени составил: ${p2}.

В нарушение требований ст. 67 Трудового кодекса РФ письменный трудовой договор со мной до настоящего времени не оформлен, а выполненная работа необоснованно названа «неоплачиваемой стажировкой».

Напоминаю, что согласно ч. 2 ст. 67 ТК РФ трудовой договор, не оформленный в письменной форме, считается заключенным, если работник приступил к работе с ведома или по поручению работодателя. Кроме того, в силу ч. 4 ст. 70 ТК РФ испытательный срок для лиц моложе 18 лет запрещен.

ТРЕБУЮ:
1. Оформить со мной трудовой договор в письменной форме в двух экземплярах со дня фактического допуска к работе.
2. Произвести оплату всех фактически отработанных смен в полном объеме в соответствии со ст. 136 ТК РФ.

Дата: ${dateFormatted}
Подпись работника: _______________ / ${p1} /`;
    }

    return `Руководителю ${employer}
от ${p1},
занимающего(ей) должность «${e1}»

ЗАЯВЛЕНИЕ
о предоставлении ежегодного основного оплачиваемого отпуска
(на основании ст. 267 Трудового кодекса РФ)

В соответствии со статьей 267 Трудового кодекса РФ работникам в возрасте до восемнадцати лет ежегодный основной оплачиваемый отпуск предоставляется продолжительностью 31 календарный день в удобное для них время.

На основании изложенного прошу предоставить мне ежегодный основной оплачиваемый отпуск продолжительностью 31 календарный день с ${p2}.

Дата: ${dateFormatted}
Подпись работника: _______________ / ${p1} /`;
  }, [docType, docEmployer, docPerson1, docPerson2, docExtra1, docDate]);

  const downloadTxt = () => {
    const blob = new Blob([buildDocumentText()], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'Документ_ПравоПодростка_ТК_РФ.txt';
    link.click();
    URL.revokeObjectURL(url);
    showToast('Файл документа скачан на устройство');
  };

  // 4. Возрастной радар и финансовый симулятор
  const [selectedAgeRadar, setSelectedAgeRadar] = useState(14);
  const [financeScenario, setFinanceScenario] = useState('card14');

  const radarData = useMemo(
    () => ({
      14: {
        title: '14 лет — частичная дееспособность (ст. 26 ГК РФ)',
        rights: [
          'Получение паспорта гражданина РФ и право самостоятельно обращаться в суд за защитой своих прав по семейным спорам.',
          'Трудоустройство на легкий труд в свободное от учебы время с письменного согласия одного из родителей и органа опеки (ч. 3 ст. 63 ТК РФ).',
          'Самостоятельное распоряжение своим заработком, стипендией и иными доходами без согласия родителей (п. 2 ст. 26 ГК РФ).',
          'Открытие банковских счетов и вкладов на свое имя и распоряжение ими, осуществление прав автора.'
        ],
        liability: [
          'Самостоятельная имущественная ответственность по сделкам, совершенным самостоятельно (п. 3 ст. 26 ГК РФ).',
          'Уголовная ответственность по перечню тяжких и особо тяжких преступлений (ч. 2 ст. 20 УК РФ).',
          'Соблюдение трудовой дисциплины при работе по трудовому договору.'
        ]
      },
      16: {
        title: '16 лет — самостоятельный трудовой договор и право на эмансипацию',
        rights: [
          'Самостоятельное заключение трудового договора без согласия родителей (ч. 1 ст. 63 ТК РФ).',
          'Право на эмансипацию — объявление полностью дееспособным при работе по трудовому договору или ведении предпринимательства (ст. 27 ГК РФ).',
          'Право вступать в кооперативы и регистрироваться в качестве самозанятого / ИП с согласия родителей.'
        ],
        liability: [
          'Наступление административной ответственности по КоАП РФ в полном объеме (ст. 2.3 КоАП РФ).',
          'Наступление уголовной ответственности за все преступления, предусмотренные УК РФ (ч. 1 ст. 20 УК РФ).',
          'Полная ответственность за сохранность вверенных банковских карт и электронных средств платежа.'
        ]
      },
      18: {
        title: '18 лет — совершеннолетие и полная дееспособность (ст. 21 ГК РФ)',
        rights: [
          'Приобретение гражданской дееспособности в полном объеме — совершение любых сделок без ограничений.',
          'Снятие возрастных лимитов рабочего времени (стандартная 40-часовая рабочая неделя по ст. 91 ТК РФ).',
          'Активное избирательное право (участие в выборах и референдумах).'
        ],
        liability: [
          'Полная самостоятельная имущественная, административная и уголовная ответственность.',
          'Исполнение воинской обязанности (для граждан мужского пола).'
        ]
      }
    }),
    []
  );

  const financeScenarios = useMemo(
    () => ({
      card14: {
        ok: true,
        title: 'Разрешено законом (подп. 3 п. 2 ст. 26 ГК РФ)',
        desc: 'С 14 лет (после получения паспорта) несовершеннолетний вправе самостоятельно, без согласия родителей, вносить вклады в кредитные организации и распоряжаться ими, а также оформить молодежную дебетовую карту.'
      },
      own_money: {
        ok: true,
        title: 'Сделка полностью законна (подп. 1 п. 2 ст. 26 ГК РФ)',
        desc: 'Законом установлено, что подросток от 14 до 18 лет распоряжается своим заработком, стипендией и иными собственными доходами абсолютно самостоятельно. Родители не могут отменить покупку, совершенную на лично заработанные деньги.'
      },
      parent_money: {
        ok: false,
        title: 'Требуется письменное согласие родителей (п. 1 ст. 26 ГК РФ)',
        desc: 'Если покупка совершается не на собственный заработок/стипендию, а на крупную сумму, подаренную или выданную родителями (и сделка выходит за рамки мелкой бытовой), требуется письменное согласие законных представителей.'
      },
      return_item: {
        ok: true,
        title: 'Подросток вправе сам вернуть некачественный товар (Закон о защите прав потребителей)',
        desc: 'Если подросток с 14 лет самостоятельно совершил покупку, он сам является стороной договора розничной купли-продажи и вправе предъявить продавцу претензию о возврате денег или обмене бракованного товара.'
      },
      dropper: {
        ok: false,
        title:
          'Опасно! Уголовная и имущественная ответственность (ст. 159, 187 УК РФ и ст. 1102 ГК РФ)',
        desc: 'Передача своей банковской карты, логина от онлайн-банка или пересылка чужих денег за вознаграждение — участие в мошеннических схемах (дропперство). С 16 лет за это наступает уголовная ответственность, а пострадавшие вправе через суд взыскать всю сумму перевода.'
      },
      emancipation: {
        ok: true,
        title: 'Возможна эмансипация (ст. 27 ГК РФ)',
        desc: 'Несовершеннолетний, достигший 16 лет, может быть объявлен полностью дееспособным, если он работает по трудовому договору или с согласия родителей занимается предпринимательством.'
      }
    }),
    []
  );

  // 5. Ловушки работодателей
  const [activeTrap, setActiveTrap] = useState(null);

  useEffect(() => {
    if (!activeTrap) return;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') setActiveTrap(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [activeTrap]);

  const employerTraps = useMemo(
    () => [
      {
        title: '«Первые 1–2 недели — неоплачиваемая стажировка»',
        law: 'Ст. 15, 16, 67 и 132 ТК РФ',
        explain:
          'В Трудовом кодексе РФ нет понятия «бесплатной стажировки». Если вы вышли на рабочее место и выполняете поручения менеджера, трудовой договор считается заключенным с первой минуты работы, и каждый час обязан быть оплачен.',
        reply:
          '«Согласно ст. 16 и ч. 2 ст. 67 ТК РФ фактический допуск к работе означает заключение трудового договора. Прошу оформить договор с первого дня и оплатить все отработанные часы».'
      },
      {
        title: '«Для несовершеннолетних устанавливаем испытательный срок 2 недели»',
        law: 'Абз. 4 ч. 4 ст. 70 ТК РФ',
        explain:
          'Закон прямо запрещает устанавливать испытательный срок при приеме на работу для лиц моложе 18 лет. Даже если такой пункт включить в договор, он не имеет юридической силы.',
        reply:
          '«В соответствии с частью 4 статьи 70 Трудового кодекса РФ испытательный срок для несовершеннолетних запрещен. Пожалуйста, исключите это условие из договора».'
      },
      {
        title: '«Опоздал на 5 минут или разбил кружку — штраф 1000 ₽ из зарплаты»',
        law: 'Ст. 192 и ст. 244 ТК РФ',
        explain:
          'Работодатель вправе применить только три вида дисциплинарного взыскания: замечание, выговор или увольнение. Денежные штрафы незаконны. Кроме того, с работниками до 18 лет запрещено заключать договоры о полной материальной ответственности (ст. 244 ТК РФ).',
        reply:
          '«Статья 192 ТК РФ не предусматривает денежных штрафов, а по ст. 244 ТК РФ договоры о полной материальной ответственности с несовершеннолетними не заключаются».'
      },
      {
        title: '«Работаем без оформления, зарплату отдадим наличными в конце месяца»',
        law: 'Ст. 67 ТК РФ и ст. 5.27 КоАП РФ',
        explain:
          'Неофициальная работа лишает подростка гарантии выплаты заработной платы и защиты при травме. За уклонение от оформления трудового договора работодателю грозит крупный штраф по ст. 5.27 КоАП РФ.',
        reply:
          '«По статье 67 ТК РФ трудовой договор должен быть оформлен в письменной форме в двух экземплярах не позднее трех рабочих дней со дня начала работы».'
      },
      {
        title: '«Ты нам больше не подходишь, завтра не выходи (увольнение одним днем)»',
        law: 'Ст. 269 ТК РФ',
        explain:
          'Расторжение трудового договора с работником в возрасте до 18 лет по инициативе работодателя (за исключением ликвидации организации) допускается только с согласия Государственной инспекции труда и комиссии по делам несовершеннолетних.',
        reply:
          '«Согласно статье 269 ТК РФ увольнение работника до 18 лет по инициативе работодателя возможно только при наличии согласия Государственной инспекции труда и комиссии по делам несовершеннолетних».'
      }
    ],
    []
  );

  const privacySections = useMemo(
    () => [
      {
        num: '1',
        title: 'Общие положения',
        paragraphs: [
          'Настоящая Политика конфиденциальности определяет порядок обработки и защиты информации пользователей сайта «ПравоПодростка 14–17» (далее — Сайт).',
          'Сайт предназначен для предоставления несовершеннолетним информационных материалов об их трудовых и гражданских правах, а также для использования справочных инструментов и калькуляторов.',
          'Главный принцип работы Сайта — минимизация сбора персональных данных. Для использования основных возможностей Сайта регистрация и создание личного кабинета не требуются.'
        ]
      },
      {
        num: '2',
        title: 'Какие данные собираются',
        paragraphs: [
          'Сайт не предусматривает обязательного предоставления пользователями фамилии, имени, отчества, номера телефона, адреса проживания, паспортных данных и иных сведений, позволяющих установить личность пользователя.',
          'При использовании Сайта:'
        ],
        bullets: [
          'не требуется регистрация или создание учётной записи;',
          'не предусмотрена обязательная передача контактных данных;',
          'не осуществляется отправка введённых в конструктор документов сведений на сервер Сайта;',
          'не требуется указывать реальные персональные данные для использования калькуляторов и справочных материалов.'
        ],
        afterParagraphs: [
          'Пользователь самостоятельно решает, какие сведения вводить в поля конструктора документов. Рекомендуется использовать условные данные или образцы, не содержащие реальной персональной информации.'
        ]
      },
      {
        num: '3',
        title: 'Использование локального хранилища',
        paragraphs: [
          'Для сохранения отметок в интерактивном чек-листе Сайт использует локальное хранилище браузера (localStorage).',
          'В нём сохраняются только отметки о выполнении пунктов чек-листа. Эти сведения используются исключительно для отображения прогресса пользователя.',
          'Пользователь может удалить сохранённые данные, очистив данные сайта в настройках своего браузера.'
        ],
        hasClearStorageAction: true
      },
      {
        num: '4',
        title: 'Работа конструктора документов и калькулятора',
        paragraphs: [
          'Встроенные калькуляторы выполняют расчёты непосредственно в браузере пользователя.',
          'Конструктор документов позволяет сформировать текст типовых заявлений и согласий. Введённая информация обрабатывается на стороне устройства пользователя, а готовый документ скачивается в виде файла.',
          'Сайт не предусматривает передачу введённых в конструктор сведений третьим лицам.'
        ]
      },
      {
        num: '5',
        title: 'Защита информации несовершеннолетних',
        paragraphs: [
          'Поскольку Сайт ориентирован на несовершеннолетних пользователей, особое внимание уделяется защите их частной жизни.',
          'Администрация Сайта рекомендует:'
        ],
        bullets: [
          'не размещать в открытом доступе личные данные;',
          'не вводить сведения о документах, удостоверяющих личность;',
          'не сообщать посторонним номера телефонов, домашние адреса и пароли;',
          'использовать условные данные при заполнении образцов документов.'
        ]
      },
      {
        num: '6',
        title: 'Передача информации третьим лицам',
        paragraphs: [
          'Сайт не предусматривает самостоятельную передачу введённых пользователями сведений третьим лицам в рекламных или коммерческих целях.',
          'При этом техническая инфраструктура, на которой размещён Сайт, может обрабатывать техническую информацию, необходимую для его работы и обеспечения безопасности.'
        ]
      },
      {
        num: '7',
        title: 'Файлы cookie и техническая информация',
        paragraphs: [
          'Для работы отдельных функций Сайт может использовать возможности браузера, включая локальное хранилище.',
          'Сайт не заявляет об использовании рекламных cookie и систем аналитики для отслеживания поведения пользователей.'
        ]
      },
      {
        num: '8',
        title: 'Права пользователей',
        paragraphs: [
          'Пользователь вправе самостоятельно прекратить использование Сайта, удалить сохранённые в браузере данные и не вводить в поля Сайта сведения, позволяющие установить его личность.'
        ]
      },
      {
        num: '9',
        title: 'Изменение Политики конфиденциальности',
        paragraphs: [
          'Администрация Сайта вправе вносить изменения в настоящую Политику при изменении функциональности Сайта или требований законодательства.'
        ]
      },
      {
        num: '10',
        title: 'Контактная информация',
        paragraphs: [
          'По вопросам работы Сайта и конфиденциальности можно обратиться по адресу электронной почты:'
        ],
        hasContactEmail: true
      }
    ],
    []
  );

  const convenienceFeatures = useMemo(
    () => [
      {
        icon: Zap,
        title: 'Вместо 400 страниц кодексов — один понятный алгоритм',
        desc: 'Встроенный калькулятор сам сопоставляет ваш возраст, учебный период и график с федеральными лимитами ТК РФ за пару секунд.'
      },
      {
        icon: Smartphone,
        title: 'Удобно открыть прямо на собеседовании с телефона',
        desc: 'Если менеджер предлагает «бесплатную пробную смену» или штрафы, вы можете сразу открыть нужную статью закона прямо при разговоре.'
      },
      {
        icon: FileText,
        title: 'Готовые юридические бланки без помощи юриста',
        desc: 'В конструкторе уже заложены точные формулировки и ссылки на статьи 16, 63, 67, 70 и 267 ТК РФ с выгрузкой в .txt и печатью.'
      },
      {
        icon: Users,
        title: 'Полезен одновременно подросткам и их родителям',
        desc: 'Показывает родителям законные границы труда в 14–17 лет и помогает за минуту оформить письменное согласие на трудоустройство.'
      },
      {
        icon: BookOpen,
        title: 'Живой человеческий язык без сложного канцелярита',
        desc: 'Разбираем реальные ситуации: работа бариста, курьером, в ПВЗ, оформление молодежной карты и возврат товара в магазин.'
      },
      {
        icon: Lock,
        title: 'Полная конфиденциальность и доступ без регистрации',
        desc: 'Все расчеты и генерация документов происходят локально прямо в вашем браузере без создания аккаунта и ввода телефона.'
      }
    ],
    []
  );

  const audienceScenarios = useMemo(
    () => [
      {
        badge: 'Для подростков 14–17 лет',
        title: 'Перед выходом на первую подработку',
        text: 'Поможет заранее проверить объявление о вакансии, отличить честного работодателя от тех, кто экономит на школьниках, и защитить свою первую зарплату.',
        actionLabel: 'Проверить вакансию',
        targetTab: 'calculator'
      },
      {
        badge: 'Для родителей и опекунов',
        title: 'Контроль безопасности и оформление согласия',
        text: 'Позволит убедиться, что график смены не мешает учебе, и за одну минуту сформировать письменное согласие по ч. 3 ст. 63 ТК РФ.',
        actionLabel: 'Собрать согласие',
        targetTab: 'documents'
      },
      {
        badge: 'Для владельцев карт 14+',
        title: 'Финансовая грамотность и защита от мошенников',
        text: 'Объяснит, как самостоятельно распоряжаться своим заработком по ст. 26 ГК РФ и почему нельзя передавать свою карту третьим лицам.',
        actionLabel: 'Открыть симулятор сделок',
        targetTab: 'radar',
        scrollToFinance: true
      }
    ],
    []
  );

  const faqItems = useMemo(
    () => [
      {
        q: 'Нужно ли согласие родителей, если мне уже исполнилось 16 лет?',
        a: 'Нет. Согласно части 1 статьи 63 ТК РФ, заключать трудовой договор самостоятельно гражданин вправе с 16 лет. Согласие одного из родителей требуется только в 14 и 15 лет.'
      },
      {
        q: 'Как должна оплачиваться работа несовершеннолетнего при сокращенной смене?',
        a: 'По ст. 271 ТК РФ при повременной оплате зарплата выплачивается пропорционально отработанному времени, при этом работодатель вправе доплачивать до уровня полной ставки.'
      },
      {
        q: 'Имеет ли право работодатель отправить меня на «пробную смену» бесплатно?',
        a: 'Нет. По ст. 16 и ч. 2 ст. 67 ТК РФ, как только вы приступили к работе с ведома работодателя, трудовой договор считается заключенным, а каждый отработанный час подлежит оплате.'
      },
      {
        q: 'Кто обязан оплачивать медицинский осмотр при устройстве на работу до 18 лет?',
        a: 'Согласно ст. 266 ТК РФ обязательный предварительный медосмотр для лиц моложе 18 лет оплачивается исключительно за счет средств работодателя.'
      },
      {
        q: 'Могут ли родители забрать деньги, которые подросток заработал сам?',
        a: 'Нет. Подп. 1 п. 2 ст. 26 ГК РФ закрепляет за подростками 14–18 лет право самостоятельно распоряжаться своим заработком, стипендией и вкладами.'
      }
    ],
    []
  );

  const currentFinance = financeScenarios[financeScenario] || financeScenarios.card14;

  return (
    <div
      style={{
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif"
      }}
      className="min-h-screen bg-[#F5F5F7] text-[#1D1D1F] flex flex-col relative antialiased"
    >
      <style>{GLOBAL_STYLES}</style>

      {/* ПОЛНОЭКРАННЫЙ ЖИВОЙ ФОН GRADIENTASCII */}
      <GradientASCII />

      {/* ШАПКА В СТИЛЕ APPLE */}
      <header className="w-full bg-[#F5F5F7]/80 backdrop-blur-xl border-b border-black/[0.06] sticky top-0 z-40">
        <div className="w-full px-4 sm:px-8 lg:px-10 h-14 flex items-center justify-between gap-4 overflow-x-auto">
          <button
            type="button"
            onClick={() => navigateTo('overview')}
            className="brand-logo-btn flex items-center gap-3 text-left shrink-0 cursor-pointer group"
          >
            <BrandLogo />
            <span className="hidden xl:inline text-xs font-medium text-[#6E6E73] border-l border-black/10 pl-3 whitespace-nowrap">
              ТК РФ и ГК РФ
            </span>
          </button>

          <nav className="flex items-center gap-1 bg-black/[0.045] p-1 rounded-full shrink-0 flex-nowrap">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => navigateTo(item.id)}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all cursor-pointer ${
                    isActive
                      ? 'bg-white text-[#1D1D1F] font-semibold shadow-sm'
                      : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 shrink-0 ${isActive ? 'text-[#0071E3]' : ''}`} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>
        </div>
      </header>

      {/* ОСНОВНОЙ КОНТЕНТ */}
      <main className="relative z-10 flex-1 w-full max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        {/* ВКЛАДКА 1: ОБЗОР */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* ГЛАВНЫЙ ЭКРАН APPLE HERO */}
            <section className="relative py-1 sm:py-2 text-center">
              <div
                className="pointer-events-none absolute inset-0 -z-10"
                style={{
                  background:
                    'radial-gradient(ellipse 75% 65% at 50% 48%, rgba(245, 245, 247, 0.9) 0%, rgba(245, 245, 247, 0.48) 65%, rgba(245, 245, 247, 0) 100%)'
                }}
              />

              <div className="max-w-4xl mx-auto">
                <TechText text="ПРАВО 14–17" />
              </div>

              <div className="max-w-2xl mx-auto mt-0.5 px-2">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#0071E3] bg-white/85 backdrop-blur-md border border-black/[0.07] px-3.5 py-1 rounded-full mb-3 shadow-sm">
                  <span>Глава 42 ТК РФ</span>
                  <span className="text-black/20">•</span>
                  <span>Статья 26 ГК РФ</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-[40px] font-bold tracking-[-0.03em] text-[#1D1D1F] leading-[1.1] mb-3">
                  Трудовые и гражданские права подростков понятным языком.
                </h1>

                <p className="text-[#6E6E73] text-sm sm:text-base lg:text-[16.5px] font-normal leading-relaxed mb-5 max-w-xl mx-auto">
                  Проверьте законность графика первой подработки за одну минуту, соберите готовое
                  согласие родителей или заявление работодателю и разберитесь с банковскими картами
                  с 14 лет.
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3">
                  <button
                    type="button"
                    onClick={() => navigateTo('calculator')}
                    className="pp-btn inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#0077ED] text-white font-semibold px-6 py-2.5 rounded-full text-sm shadow-sm cursor-pointer"
                  >
                    <span>Проверить вакансию</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigateTo('documents')}
                    className="pp-btn inline-flex items-center gap-2 bg-white/95 hover:bg-white text-[#1D1D1F] border border-black/[0.08] font-semibold px-6 py-2.5 rounded-full text-sm shadow-sm cursor-pointer"
                  >
                    <span>Собрать документ</span>
                  </button>
                </div>

                <div className="mt-5 flex flex-wrap items-center justify-center gap-x-5 gap-y-1.5 text-xs text-[#6E6E73] font-medium">
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                    Без испытательного срока (ст. 70 ТК РФ)
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                    Сокращенная смена (ст. 92, 94 ТК РФ)
                  </span>
                  <span className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#0071E3] shrink-0" />
                    Своя карта и вклад с 14 лет (ст. 26 ГК РФ)
                  </span>
                </div>
              </div>
            </section>

            {/* 3D-КАРУСЕЛЬ */}
            <section className="relative z-10">
              <FlexCarousel items={carouselModules} onSelectModule={handleOpenCarouselModule} />
            </section>

            {/* КЛЮЧЕВЫЕ ПОКАЗАТЕЛИ */}
            <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  value: '< 60 сек',
                  label: 'Быстрая проверка',
                  sub: 'Среднее время анализа вакансии в калькуляторе'
                },
                {
                  value: '14+ статей',
                  label: 'Точная база законов',
                  sub: 'Нормы главы 42 ТК РФ и статьи 26 ГК РФ без воды'
                },
                {
                  value: '3 шаблона',
                  label: 'Готовые документы',
                  sub: 'Автозаполнение и выгрузка в .txt или печать в PDF'
                },
                {
                  value: '24 / 7',
                  label: 'С любого устройства',
                  sub: 'Бесплатный доступ со смартфона без регистрации'
                }
              ].map((stat, idx) => (
                <div
                  key={idx}
                  className="bg-white/95 rounded-[24px] border border-black/[0.06] p-5 sm:p-6 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                >
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-[#0071E3] mb-1">
                    {stat.value}
                  </div>
                  <div className="text-sm sm:text-base font-semibold text-[#1D1D1F]">
                    {stat.label}
                  </div>
                  <div className="text-xs sm:text-sm text-[#6E6E73] mt-1 leading-snug">
                    {stat.sub}
                  </div>
                </div>
              ))}
            </section>

            {/* КОМУ ПОМОГАЕТ САЙТ */}
            <section className="space-y-5">
              <div className="px-1">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] mb-1">
                  Практическая польза
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">
                  Кому и в каких ситуациях помогает сайт
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {audienceScenarios.map((item, idx) => (
                  <div
                    key={idx}
                    className="bg-white/95 rounded-[28px] border border-black/[0.06] p-6 sm:p-7 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col justify-between"
                  >
                    <div>
                      <span className="inline-block text-xs font-semibold text-[#0071E3] bg-[#0071E3]/[0.08] px-3 py-1 rounded-full mb-3.5">
                        {item.badge}
                      </span>
                      <h3 className="text-xl font-semibold tracking-tight text-[#1D1D1F] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed mb-5">
                        {item.text}
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        onClick={() =>
                          navigateTo(item.targetTab, {
                            scrollToFinance: Boolean(item.scrollToFinance)
                          })
                        }
                        className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#0071E3] hover:underline cursor-pointer"
                      >
                        <span>{item.actionLabel}</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ДОРОЖНАЯ КАРТА ВОЗРАСТОВ */}
            <section className="bg-white/95 rounded-[28px] border border-black/[0.06] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="mb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] mb-1">
                  Возрастные рубежи
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">
                  От 14 до 18 лет: как расширяются ваши права
                </h2>
                <p className="text-[#6E6E73] text-base mt-1">
                  Ключевые этапы трудовой и гражданской дееспособности по законам РФ.
                </p>
              </div>

              <div className="md:hidden space-y-3.5">
                {[
                  {
                    age: '14',
                    title: '14 лет • Паспорт и первый доход',
                    points: [
                      'Легкий труд с согласия родителя (ст. 63 ТК РФ)',
                      'Своя карта, вклад и трата зарплаты (ст. 26 ГК РФ)',
                      'До 2,5 ч/день в учебу, до 4 ч в каникулы'
                    ]
                  },
                  {
                    age: '16',
                    title: '16 лет • Самостоятельный договор',
                    points: [
                      'Трудовой договор без согласия родителей',
                      'Право на эмансипацию (ст. 27 ГК РФ)',
                      'До 4 ч/день в учебу, до 7 ч в каникулы'
                    ]
                  },
                  {
                    age: '18',
                    title: '18 лет • Полная дееспособность',
                    points: [
                      'Полная дееспособность (ст. 21 ГК РФ)',
                      'Стандартная 40-часовая рабочая неделя',
                      'Снятие возрастных ограничений ТК РФ'
                    ]
                  }
                ].map((step, sIdx) => (
                  <div
                    key={sIdx}
                    className="rounded-2xl bg-[#F5F5F7] border border-black/[0.05] p-4 flex items-start gap-3.5"
                  >
                    <span className="w-9 h-9 rounded-full bg-[#0071E3] text-white font-bold text-sm flex items-center justify-center shrink-0 mt-0.5">
                      {step.age}
                    </span>
                    <div>
                      <div className="font-semibold text-base text-[#1D1D1F] mb-1.5">
                        {step.title}
                      </div>
                      <ul className="space-y-1 text-xs text-[#6E6E73]">
                        {step.points.map((pt, pIdx) => (
                          <li key={pIdx}>• {pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>

              <div className="hidden md:block overflow-x-auto">
                <svg viewBox="0 0 980 185" className="w-full h-auto block">
                  <line
                    x1="160"
                    y1="42"
                    x2="820"
                    y2="42"
                    stroke="#E5E5EA"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />
                  <line
                    x1="160"
                    y1="42"
                    x2="490"
                    y2="42"
                    stroke="#0071E3"
                    strokeWidth="4"
                    strokeLinecap="round"
                  />

                  <circle cx="160" cy="42" r="19" fill="#0071E3" />
                  <text x="160" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold">
                    14
                  </text>
                  <rect x="30" y="74" width="260" height="98" rx="16" fill="#F5F5F7" />
                  <text x="48" y="98" fill="#1D1D1F" fontSize="14" fontWeight="600">
                    14 лет • Паспорт и первый доход
                  </text>
                  <text x="48" y="120" fill="#6E6E73" fontSize="12.5">
                    • Легкий труд с согласия родителя (ст. 63 ТК)
                  </text>
                  <text x="48" y="139" fill="#6E6E73" fontSize="12.5">
                    • Своя карта, вклад, трата зарплаты (ст. 26 ГК)
                  </text>
                  <text x="48" y="158" fill="#6E6E73" fontSize="12.5">
                    • До 2,5 ч/день в учебу, до 4 ч в каникулы
                  </text>

                  <circle cx="490" cy="42" r="19" fill="#0071E3" />
                  <text x="490" y="47" textAnchor="middle" fill="#FFFFFF" fontSize="14" fontWeight="bold">
                    16
                  </text>
                  <rect x="360" y="74" width="260" height="98" rx="16" fill="#F5F5F7" />
                  <text x="378" y="98" fill="#1D1D1F" fontSize="14" fontWeight="600">
                    16 лет • Самостоятельный договор
                  </text>
                  <text x="378" y="120" fill="#6E6E73" fontSize="12.5">
                    • Трудовой договор без согласия родителей
                  </text>
                  <text x="378" y="139" fill="#6E6E73" fontSize="12.5">
                    • Право на эмансипацию (ст. 27 ГК РФ)
                  </text>
                  <text x="378" y="158" fill="#6E6E73" fontSize="12.5">
                    • До 4 ч/день в учебу, до 7 ч в каникулы
                  </text>

                  <circle cx="820" cy="42" r="19" fill="#FFFFFF" stroke="#0071E3" strokeWidth="3" />
                  <text x="820" y="47" textAnchor="middle" fill="#0071E3" fontSize="14" fontWeight="bold">
                    18
                  </text>
                  <rect x="690" y="74" width="260" height="98" rx="16" fill="#F5F5F7" />
                  <text x="708" y="98" fill="#1D1D1F" fontSize="14" fontWeight="600">
                    18 лет • Полная дееспособность
                  </text>
                  <text x="708" y="120" fill="#6E6E73" fontSize="12.5">
                    • Полная дееспособность (ст. 21 ГК РФ)
                  </text>
                  <text x="708" y="139" fill="#6E6E73" fontSize="12.5">
                    • Стандартная 40-часовая рабочая неделя
                  </text>
                  <text x="708" y="158" fill="#6E6E73" fontSize="12.5">
                    • Снятие возрастных ограничений ТК РФ
                  </text>
                </svg>
              </div>
            </section>

            {/* ЧЕК-ЛИСТ БЕЗОПАСНОСТИ */}
            <section className="bg-white/95 rounded-[28px] border border-black/[0.06] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-5">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] mb-1">
                    Самопроверка перед началом работы
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">
                    Чек-лист безопасности перед выходом на первую смену
                  </h2>
                  <p className="text-sm sm:text-base text-[#6E6E73] mt-1">
                    Отметьте пункты, которые вы проверили у работодателя (прогресс сохраняется
                    автоматически):
                  </p>
                </div>

                {completedChecks > 0 && (
                  <button
                    type="button"
                    onClick={() => setChecklist([false, false, false, false, false])}
                    className="pp-btn inline-flex items-center gap-1.5 text-xs sm:text-sm font-medium text-[#6E6E73] hover:text-[#1D1D1F] bg-[#F5F5F7] px-3.5 py-2 rounded-full cursor-pointer shrink-0"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Сбросить отметки</span>
                  </button>
                )}
              </div>

              <div className="w-full h-2.5 bg-[#F5F5F7] rounded-full overflow-hidden mb-2">
                <div
                  className="h-full bg-[#0071E3] transition-all duration-300 rounded-full"
                  style={{ width: `${checkProgress}%` }}
                />
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm font-medium mb-6">
                <span className="text-[#0071E3]">
                  Выполнено: {completedChecks} из {checklist.length} ({checkProgress}%)
                </span>
                <span className="text-[#6E6E73]">
                  {completedChecks === checklist.length
                    ? 'Все базовые гарантии ТК РФ подтверждены!'
                    : 'Проверьте каждый пункт до подписания бумаг'}
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
                {checklistItems.map((item, index) => (
                  <label
                    key={index}
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border transition-all cursor-pointer ${
                      checklist[index]
                        ? 'bg-[#0071E3]/[0.06] border-[#0071E3]/25'
                        : 'bg-[#F5F5F7]/80 border-transparent hover:bg-[#F5F5F7]'
                    } ${index === checklistItems.length - 1 ? 'md:col-span-2' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={checklist[index]}
                      onChange={() => {
                        const next = [...checklist];
                        next[index] = !next[index];
                        setChecklist(next);
                      }}
                      className="mt-1 w-4 h-4 accent-[#0071E3] cursor-pointer shrink-0"
                    />
                    <div className="text-sm sm:text-base">
                      <div className="font-semibold text-[#1D1D1F]">{item.title}</div>
                      <div className="text-[#6E6E73] text-xs sm:text-sm mt-0.5">{item.desc}</div>
                    </div>
                  </label>
                ))}
              </div>
            </section>

            {/* ПОЧЕМУ ЭТОТ САЙТ УДОБЕН */}
            <section className="bg-white/95 rounded-[28px] border border-black/[0.06] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="max-w-3xl mb-8">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] mb-1">
                  Преимущества платформы
                </div>
                <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] mb-2.5">
                  Почему этот навигатор удобнее обычных справочников
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {convenienceFeatures.map((feat, idx) => {
                  const FeatIcon = feat.icon;
                  return (
                    <div
                      key={idx}
                      className="rounded-3xl bg-[#F5F5F7]/85 border border-black/[0.04] p-6"
                    >
                      <div className="w-11 h-11 rounded-2xl bg-white text-[#0071E3] shadow-sm flex items-center justify-center mb-4">
                        <FeatIcon className="w-5 h-5" />
                      </div>
                      <h3 className="text-lg font-semibold tracking-tight text-[#1D1D1F] leading-snug mb-2">
                        {feat.title}
                      </h3>
                      <p className="text-sm text-[#6E6E73] leading-relaxed">{feat.desc}</p>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* FAQ */}
            <section className="bg-white/95 rounded-[28px] border border-black/[0.06] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="max-w-3xl mb-6">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] mb-1">
                  База знаний
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F] mb-1.5">
                  Частые вопросы о работе и деньгах до 18 лет
                </h2>
              </div>

              <div className="divide-y divide-black/[0.07] border-t border-b border-black/[0.07]">
                {faqItems.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={idx} className="py-4 sm:py-5">
                      <button
                        type="button"
                        onClick={() => setOpenFaqIndex(isOpen ? -1 : idx)}
                        className="w-full flex items-center justify-between gap-4 text-left cursor-pointer group"
                      >
                        <span className="text-base sm:text-lg font-semibold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                          {faq.q}
                        </span>
                        <span
                          className={`w-8 h-8 rounded-full bg-[#F5F5F7] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                            isOpen ? 'rotate-180 bg-[#0071E3]/10 text-[#0071E3]' : 'text-[#6E6E73]'
                          }`}
                        >
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </button>
                      {isOpen && (
                        <p className="mt-3 text-sm sm:text-base text-[#6E6E73] leading-relaxed pr-4 sm:pr-12">
                          {faq.a}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* ЧТО МЫ ХОТИМ ДОБАВИТЬ (2 ЗАДАЧИ В СООТВЕТСТВИИ С ПОЛИТИКОЙ КОНФИДЕНЦИАЛЬНОСТИ) */}
            <section className="bg-white/95 rounded-[28px] border border-black/[0.06] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="max-w-3xl mb-8">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#0071E3] bg-[#0071E3]/[0.08] px-3 py-1 rounded-full mb-2.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>План развития проекта</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] mb-2.5">
                  Что мы хотим добавить в будущих обновлениях
                </h2>
                <p className="text-[#6E6E73] text-base sm:text-lg leading-relaxed">
                  Мы продолжаем развивать «ПравоПодростка 14–17» с полным соблюдением нашей
                  Политики конфиденциальности. Вот ключевые функции следующих версий:
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="rounded-3xl bg-[#F5F5F7]/90 border border-[#0071E3]/20 p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-[#0071E3] text-white shadow-sm flex items-center justify-center">
                        <ExternalLink className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-[#0071E3] bg-[#0071E3]/10 px-3 py-1 rounded-full">
                        Следующий этап
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#1D1D1F] leading-snug mb-2.5">
                      Отдельные ссылки на другие полезные статьи и кодексы
                    </h3>
                    <p className="text-sm text-[#6E6E73] leading-relaxed">
                      Добавим структурированный каталог прямых ссылок на официальные тексты смежных
                      статей Трудового, Гражданского и Административного кодексов РФ (ст. 5.27 КоАП
                      РФ об ответственности работодателя, Закон о защите прав потребителей), а
                      также памятки Роструда и сервиса «Онлайнинспекция.рф».
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-black/[0.06] text-xs font-medium text-[#0071E3]">
                    Прямые переходы к первоисточникам законов РФ
                  </div>
                </div>

                <div className="rounded-3xl bg-[#F5F5F7]/90 border border-black/[0.05] p-6 sm:p-7 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-11 h-11 rounded-2xl bg-white text-[#0071E3] shadow-sm flex items-center justify-center">
                        <Shield className="w-5 h-5" />
                      </div>
                      <span className="text-xs font-semibold text-[#6E6E73] bg-black/[0.05] px-3 py-1 rounded-full">
                        В планах
                      </span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold tracking-tight text-[#1D1D1F] leading-snug mb-2.5">
                      Конструктор жалобы в трудовую инспекцию
                    </h3>
                    <p className="text-sm text-[#6E6E73] leading-relaxed">
                      Если работодатель отказывается оплачивать отработанные смены даже после
                      письменной претензии, сервис поможет пошагово сформировать официальное
                      обращение в Государственную инспекцию труда (ГИТ) прямо в браузере.
                    </p>
                  </div>
                  <div className="mt-5 pt-4 border-t border-black/[0.06] text-xs font-medium text-[#6E6E73]">
                    Пошаговый алгоритм защиты при невыплате зарплаты
                  </div>
                </div>
              </div>
            </section>

            {/* ФИНАЛЬНЫЙ БЛОК */}
            <section className="bg-gradient-to-br from-[#0071E3] to-[#0284C7] text-white rounded-[28px] p-7 sm:p-11 shadow-[0_12px_32px_rgba(0,113,227,0.22)] flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
              <div className="max-w-2xl">
                <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider bg-white/15 px-3 py-1 rounded-full mb-3">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Проверка за 1 минуту</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-semibold tracking-tight leading-tight mb-2.5">
                  Уже нашли подработку или проходите собеседование?
                </h2>
                <p className="text-white/85 text-base sm:text-lg leading-relaxed">
                  Проверьте предложенный график и условия в калькуляторе прямо сейчас или изучите 5
                  главных ловушек работодателей.
                </p>
              </div>

              <div className="flex flex-wrap gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => navigateTo('calculator')}
                  className="pp-btn inline-flex items-center gap-2 bg-white text-[#0071E3] hover:bg-white/95 font-semibold px-6 py-3.5 rounded-full text-sm sm:text-base shadow-sm cursor-pointer"
                >
                  <span>Запустить калькулятор</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('traps')}
                  className="pp-btn inline-flex items-center gap-2 bg-white/15 hover:bg-white/25 text-white border border-white/25 font-medium px-6 py-3.5 rounded-full text-sm sm:text-base cursor-pointer"
                >
                  <span>Ловушки работодателей</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* ВКЛАДКА 2: КАЛЬКУЛЯТОР ПОДРАБОТКИ */}
        {activeTab === 'calculator' && (
          <div className="space-y-6">
            <div className="bg-white/95 rounded-[28px] border border-black/[0.06] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="flex flex-wrap items-start justify-between gap-4 mb-6">
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] mb-1">
                    Глава 42 Трудового кодекса РФ
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F] mb-1.5">
                    Калькулятор законности условий подработки
                  </h2>
                  <p className="text-sm sm:text-base text-[#6E6E73]">
                    Укажите ваш возраст, режим работы и условия работодателя — алгоритм проверит их
                    по статьям 63, 70, 92, 94, 192, 265, 266 и 268 ТК РФ.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-medium text-[#6E6E73] inline-flex items-center gap-1 mr-1">
                    <Sparkles className="w-3.5 h-3.5 text-[#0071E3]" /> Примеры:
                  </span>
                  <button
                    type="button"
                    onClick={() => applyCalcPreset('violation_demo')}
                    className="pp-btn text-xs font-medium bg-[#FFF5F5] text-[#D70015] border border-[#FF3B30]/20 px-3 py-1.5 rounded-full cursor-pointer"
                  >
                    16 лет • Учеба 6 ч + испытание
                  </button>
                  <button
                    type="button"
                    onClick={() => applyCalcPreset('ok_14')}
                    className="pp-btn text-xs font-medium bg-[#F2FBF5] text-[#1B873F] border border-[#34C759]/25 px-3 py-1.5 rounded-full cursor-pointer"
                  >
                    14 лет • Каникулы 4 ч
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-5 space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#1D1D1F]">
                      1. Ваш возраст (полных лет)
                    </label>
                    <select
                      value={age}
                      onChange={(e) => setAge(Number(e.target.value))}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#F5F5F7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 text-sm"
                    >
                      <option value={14}>14 лет (с письменного согласия родителя)</option>
                      <option value={15}>15 лет (в свободное от учебы время)</option>
                      <option value={16}>16 лет (самостоятельный договор)</option>
                      <option value={17}>17 лет</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#1D1D1F]">
                      2. Период работы
                    </label>
                    <select
                      value={period}
                      onChange={(e) => setPeriod(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#F5F5F7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 text-sm"
                    >
                      <option value="study">Учебное время (совмещение с учебой)</option>
                      <option value="holiday">Летние или иные каникулы</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#1D1D1F]">
                        3. Смена (ч/день)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="16"
                        step="0.5"
                        value={shiftHours}
                        onChange={(e) => setShiftHours(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#F5F5F7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1.5 text-[#1D1D1F]">
                        4. В неделю (часов)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max="60"
                        step="0.5"
                        value={weekHours}
                        onChange={(e) => setWeekHours(e.target.value)}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#F5F5F7] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0071E3]/30 text-sm"
                      />
                    </div>
                  </div>

                  <div className="pt-2 space-y-2.5">
                    <div className="text-sm font-medium text-[#1D1D1F]">
                      5. Дополнительные условия работодателя:
                    </div>
                    {[
                      [hasProbation, setHasProbation, 'Устанавливают испытательный срок или бесплатную стажировку'],
                      [hasNight, setHasNight, 'Есть ночные смены (с 22:00 до 06:00) или сверхурочные'],
                      [hasFine, setHasFine, 'Есть денежные штрафы за опоздания или бой посуды'],
                      [hasMed, setHasMed, 'Просят оплатить предварительный медосмотр за свой счет'],
                      [hasHeavy, setHasHeavy, 'Постоянный подъем тяжестей или продажа спиртного / табака']
                    ].map(([val, setter, label], idx) => (
                      <label key={idx} className="flex items-start gap-2.5 text-sm text-[#1D1D1F] cursor-pointer">
                        <input
                          type="checkbox"
                          checked={val}
                          onChange={(e) => setter(e.target.checked)}
                          className="mt-1 accent-[#0071E3]"
                        />
                        <span>{label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="lg:col-span-7">
                  {analysis.violations.length === 0 ? (
                    <div className="rounded-3xl p-6 sm:p-7 bg-[#F2FBF5] border border-[#34C759]/25">
                      <div className="flex items-center gap-2.5 text-[#1B873F] font-semibold text-xl mb-3">
                        <CheckCircle2 className="w-6 h-6 shrink-0" />
                        <span>Условия соответствуют Трудовому кодексу РФ</span>
                      </div>
                      <p className="text-sm sm:text-base text-[#1D1D1F]/85 leading-relaxed mb-4">
                        Для возраста <strong>{age} лет</strong> (
                        {period === 'holiday' ? 'период каникул' : 'учебное время'}) закон разрешает
                        работать до <strong>{analysis.maxShift} ч в день</strong> и до{' '}
                        <strong>{analysis.maxWeek} ч в неделю</strong>.
                      </p>
                      {age <= 15 && (
                        <button
                          type="button"
                          onClick={() => {
                            setDocType('consent');
                            navigateTo('documents');
                          }}
                          className="pp-btn inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#0077ED] text-white text-sm font-medium px-5 py-2.5 rounded-full cursor-pointer"
                        >
                          Оформить согласие родителей <ArrowRight className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ) : (
                    <div className="rounded-3xl p-6 sm:p-7 bg-[#FFF5F5] border border-[#FF3B30]/20">
                      <div className="flex items-center gap-2.5 text-[#D70015] font-semibold text-xl mb-3">
                        <AlertTriangle className="w-6 h-6 shrink-0" />
                        <span>Выявлено нарушений закона: {analysis.violations.length}</span>
                      </div>
                      <ul className="space-y-2.5 text-sm sm:text-base text-[#1D1D1F]/90 list-disc pl-5 mb-6">
                        {analysis.violations.map((v, i) => (
                          <li key={i} className="leading-relaxed">
                            {v}
                          </li>
                        ))}
                      </ul>
                      <button
                        type="button"
                        onClick={() => {
                          setDocType('internship');
                          navigateTo('documents');
                        }}
                        className="pp-btn inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#0077ED] text-white text-sm font-medium px-5 py-2.5 rounded-full cursor-pointer"
                      >
                        Составить письменное требование <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-white/95 rounded-[28px] border border-black/[0.06] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <h3 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1D1D1F] mb-1">
                Справочная таблица предельного рабочего времени (ст. 92 и ст. 94 ТК РФ)
              </h3>
              <p className="text-sm text-[#6E6E73] mb-5">
                Обязательные федеральные лимиты для всех работодателей на территории РФ.
              </p>
              <div className="overflow-x-auto rounded-2xl border border-black/[0.07]">
                <table className="w-full text-sm border-collapse">
                  <thead>
                    <tr className="bg-[#F5F5F7] text-left text-[#1D1D1F]">
                      <th className="px-4 py-3 font-semibold border-b border-black/[0.07]">Возраст</th>
                      <th className="px-4 py-3 font-semibold border-b border-black/[0.07]">В день (учеба)</th>
                      <th className="px-4 py-3 font-semibold border-b border-black/[0.07]">В неделю (учеба)</th>
                      <th className="px-4 py-3 font-semibold border-b border-black/[0.07]">В день (каникулы)</th>
                      <th className="px-4 py-3 font-semibold border-b border-black/[0.07]">В неделю (каникулы)</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-black/[0.06]">
                    <tr>
                      <td className="px-4 py-3 font-semibold">14 лет</td>
                      <td className="px-4 py-3 text-[#6E6E73]">2,5 часа</td>
                      <td className="px-4 py-3 text-[#6E6E73]">12 часов</td>
                      <td className="px-4 py-3 text-[#6E6E73]">4 часа</td>
                      <td className="px-4 py-3 text-[#6E6E73]">24 часа</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">15 лет</td>
                      <td className="px-4 py-3 text-[#6E6E73]">2,5 часа</td>
                      <td className="px-4 py-3 text-[#6E6E73]">12 часов</td>
                      <td className="px-4 py-3 text-[#6E6E73]">5 часов</td>
                      <td className="px-4 py-3 text-[#6E6E73]">24 часа</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold">16–17 лет</td>
                      <td className="px-4 py-3 text-[#6E6E73]">4 часа</td>
                      <td className="px-4 py-3 text-[#6E6E73]">17,5 часов</td>
                      <td className="px-4 py-3 text-[#6E6E73]">7 часов</td>
                      <td className="px-4 py-3 text-[#6E6E73]">35 часов</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* ВКЛАДКА 3: КОНСТРУКТОР ДОКУМЕНТОВ */}
        {activeTab === 'documents' && (
          <div className="bg-white/95 rounded-[28px] border border-black/[0.06] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] mb-1">
              Генератор заявлений
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F] mb-1.5">
              Конструктор юридических документов
            </h2>
            <p className="text-sm sm:text-base text-[#6E6E73] mb-7">
              Заполните поля слева — готовый шаблон документа со ссылками на Трудовой кодекс РФ
              сформируется справа.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              <div className="lg:col-span-5 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[#1D1D1F]">
                    1. Тип документа
                  </label>
                  <select
                    value={docType}
                    onChange={(e) => setDocType(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#F5F5F7] focus:bg-white text-sm"
                  >
                    <option value="consent">
                      Письменное согласие родителя на работу в 14–15 лет (ч. 3 ст. 63 ТК РФ)
                    </option>
                    <option value="internship">
                      Требование об оформлении договора и оплате стажировки (ст. 16, 67, 136 ТК РФ)
                    </option>
                    <option value="vacation">
                      Заявление на ежегодный отпуск 31 день в удобное время (ст. 267 ТК РФ)
                    </option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[#1D1D1F]">
                    2. Наименование организации (работодателя)
                  </label>
                  <input
                    type="text"
                    value={docEmployer}
                    onChange={(e) => setDocEmployer(e.target.value)}
                    placeholder="ООО «Городская кофейня» / ИП Иванов И.И."
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#F5F5F7] focus:bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[#1D1D1F]">
                    {docType === 'consent'
                      ? '3. ФИО родителя (законного представителя)'
                      : '3. Ваше ФИО (работника)'}
                  </label>
                  <input
                    type="text"
                    value={docPerson1}
                    onChange={(e) => setDocPerson1(e.target.value)}
                    placeholder={
                      docType === 'consent'
                        ? 'Смирнова Ольга Викторовна'
                        : 'Смирнов Артем Андреевич'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#F5F5F7] focus:bg-white text-sm"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1.5 text-[#1D1D1F]">
                    {docType === 'consent'
                      ? '4. ФИО несовершеннолетнего и дата рождения'
                      : docType === 'internship'
                      ? '4. Количество отработанных смен / часов'
                      : '4. Желаемая дата начала отпуска'}
                  </label>
                  <input
                    type="text"
                    value={docPerson2}
                    onChange={(e) => setDocPerson2(e.target.value)}
                    placeholder={
                      docType === 'consent'
                        ? 'Смирнов Артем Андреевич, 12.04.2011 г.р.'
                        : docType === 'internship'
                        ? '4 смены по 4 часа (итого 16 часов)'
                        : 'с 01 июля 2026 года'
                    }
                    className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#F5F5F7] focus:bg-white text-sm"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#1D1D1F]">
                      5. Должность
                    </label>
                    <input
                      type="text"
                      value={docExtra1}
                      onChange={(e) => setDocExtra1(e.target.value)}
                      placeholder="курьер / бариста"
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#F5F5F7] focus:bg-white text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1.5 text-[#1D1D1F]">
                      6. Дата составления
                    </label>
                    <input
                      type="date"
                      value={docDate}
                      onChange={(e) => setDocDate(e.target.value)}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-black/10 bg-[#F5F5F7] focus:bg-white text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-7">
                <div className="bg-[#F5F5F7] border border-black/[0.07] rounded-2xl p-6 sm:p-8 text-sm text-[#1D1D1F] leading-relaxed whitespace-pre-wrap min-h-[380px]">
                  {buildDocumentText()}
                </div>

                <div className="flex flex-wrap gap-3 mt-5">
                  <button
                    type="button"
                    onClick={() =>
                      copyText(buildDocumentText(), 'Текст документа скопирован в буфер обмена')
                    }
                    className="pp-btn inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#0077ED] text-white text-sm font-medium px-5 py-2.5 rounded-full cursor-pointer shadow-sm"
                  >
                    <Copy className="w-4 h-4" />
                    <span>Скопировать текст</span>
                  </button>
                  <button
                    type="button"
                    onClick={downloadTxt}
                    className="pp-btn inline-flex items-center gap-2 bg-[#F5F5F7] hover:bg-black/[0.08] text-[#1D1D1F] text-sm font-medium px-5 py-2.5 rounded-full cursor-pointer"
                  >
                    <Download className="w-4 h-4 text-[#0071E3]" />
                    <span>Скачать (.txt)</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => window.print()}
                    className="pp-btn inline-flex items-center gap-2 bg-[#F5F5F7] hover:bg-black/[0.08] text-[#1D1D1F] text-sm font-medium px-5 py-2.5 rounded-full cursor-pointer"
                  >
                    <Printer className="w-4 h-4 text-[#0071E3]" />
                    <span>Распечатать / PDF</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* ВКЛАДКА 4: ШКАЛА ПРАВ И ФИНАНСЫ */}
        {activeTab === 'radar' && (
          <div className="space-y-6">
            <div className="bg-white/95 rounded-[28px] border border-black/[0.06] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#0071E3] mb-1">
                Гражданский кодекс РФ
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F] mb-1.5">
                Возрастной радар: права, финансы и ответственность
              </h2>
              <p className="text-sm sm:text-base text-[#6E6E73] mb-6">
                Выберите возрастной рубеж, чтобы сравнить новые права и юридическую ответственность.
              </p>

              <div className="inline-flex gap-1.5 bg-[#F5F5F7] p-1 rounded-full mb-6">
                {[14, 16, 18].map((yr) => (
                  <button
                    key={yr}
                    type="button"
                    onClick={() => setSelectedAgeRadar(yr)}
                    className={`px-5 py-2 rounded-full text-sm font-semibold transition-all cursor-pointer ${
                      selectedAgeRadar === yr
                        ? 'bg-white text-[#1D1D1F] shadow-sm'
                        : 'text-[#6E6E73] hover:text-[#1D1D1F]'
                    }`}
                  >
                    {yr} лет
                  </button>
                ))}
              </div>

              <div className="mb-5 font-semibold text-lg sm:text-xl text-[#0071E3]">
                {radarData[selectedAgeRadar].title}
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="rounded-3xl p-6 bg-[#F2FBF5] border border-[#34C759]/20">
                  <h3 className="font-semibold text-base sm:text-lg text-[#1B873F] mb-3">
                    Новые права и финансовые возможности
                  </h3>
                  <ul className="space-y-2.5 text-sm sm:text-base text-[#1D1D1F]/90 list-disc pl-5">
                    {radarData[selectedAgeRadar].rights.map((r, i) => (
                      <li key={i} className="leading-relaxed">
                        {r}
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-3xl p-6 bg-[#F5F5F7] border border-black/[0.05]">
                  <h3 className="font-semibold text-base sm:text-lg text-[#1D1D1F] mb-3">
                    Обязанности и юридическая ответственность
                  </h3>
                  <ul className="space-y-2.5 text-sm sm:text-base text-[#6E6E73] list-disc pl-5">
                    {radarData[selectedAgeRadar].liability.map((l, i) => (
                      <li key={i} className="leading-relaxed">
                        {l}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div
              ref={financeSectionRef}
              className="bg-white/95 rounded-[28px] border border-black/[0.06] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]"
            >
              <div className="flex items-center gap-3 mb-2">
                <div className="w-10 h-10 rounded-2xl bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-[#1D1D1F]">
                  Симулятор финансовых сделок и банковских карт
                </h2>
              </div>
              <p className="text-sm sm:text-base text-[#6E6E73] mb-6">
                Проверьте, когда подросток вправе распоряжаться деньгами и картой самостоятельно.
              </p>

              <div className="max-w-2xl mb-6">
                <select
                  value={financeScenario}
                  onChange={(e) => setFinanceScenario(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 bg-[#F5F5F7] focus:bg-white text-sm sm:text-base"
                >
                  <option value="card14">
                    1. Подросток в 14 лет открывает вклад в банке или молодежную карту
                  </option>
                  <option value="own_money">
                    2. Подросток в 15 лет покупает смартфон на деньги, заработанные летом
                  </option>
                  <option value="parent_money">
                    3. Подросток в 15 лет покупает ноутбук на крупную сумму, подаренную родителями
                  </option>
                  <option value="return_item">
                    4. Подросток возвращает некачественный товар в магазин без родителей
                  </option>
                  <option value="dropper">
                    5. Знакомый предлагает 3 000 ₽ за передачу реквизитов карты (дропперство)
                  </option>
                  <option value="emancipation">
                    6. Подросток в 16 лет официально работает и оформляет эмансипацию
                  </option>
                </select>
              </div>

              <div
                className={`rounded-3xl p-6 sm:p-7 border ${
                  currentFinance.ok
                    ? 'bg-[#F2FBF5] border-[#34C759]/25'
                    : 'bg-[#FFF5F5] border-[#FF3B30]/20'
                }`}
              >
                <div
                  className={`flex items-center gap-2 font-semibold text-lg sm:text-xl mb-2 ${
                    currentFinance.ok ? 'text-[#1B873F]' : 'text-[#D70015]'
                  }`}
                >
                  {currentFinance.ok ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                  )}
                  <span>{currentFinance.title}</span>
                </div>
                <p className="text-sm sm:text-base leading-relaxed text-[#1D1D1F]/85">
                  {currentFinance.desc}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* ВКЛАДКА 5: ЛОВУШКИ РАБОТОДАТЕЛЕЙ */}
        {activeTab === 'traps' && (
          <div className="space-y-6">
            <EmployerTrapsCrowdHero
              onOpenClaim={() => {
                setDocType('internship');
                navigateTo('documents');
              }}
            />

            <div className="space-y-3.5">
              {employerTraps.map((trap, idx) => (
                <div
                  key={idx}
                  onClick={() => setActiveTrap(trap)}
                  className="bg-white/95 rounded-2xl border border-black/[0.06] hover:border-[#0071E3]/40 p-5 sm:px-7 flex items-center justify-between gap-4 flex-wrap shadow-sm transition-all cursor-pointer group"
                >
                  <div>
                    <div className="text-xs font-semibold text-[#FF3B30] mb-1">
                      Нарушение №{idx + 1} • {trap.law}
                    </div>
                    <h3 className="font-semibold text-base sm:text-lg text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                      {trap.title}
                    </h3>
                  </div>
                  <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#0071E3] bg-[#F5F5F7] group-hover:bg-[#0071E3] group-hover:text-white px-4 py-2 rounded-full transition-colors">
                    Открыть разбор <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ВКЛАДКА 6: ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ */}
        {activeTab === 'privacy' && (
          <div className="space-y-6">
            <section className="bg-white/95 rounded-[28px] border border-black/[0.06] p-6 sm:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.04)]">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
                <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#0071E3] bg-[#0071E3]/[0.08] px-3.5 py-1.5 rounded-full">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Защита информации и приватность</span>
                </div>
                <span className="text-xs sm:text-sm font-medium text-[#6E6E73] bg-[#F5F5F7] px-3.5 py-1.5 rounded-full">
                  Дата последнего обновления: 14 ноября 2026 года
                </span>
              </div>

              <h1 className="text-2xl sm:text-4xl font-semibold tracking-tight text-[#1D1D1F] leading-tight mb-2">
                ПОЛИТИКА КОНФИДЕНЦИАЛЬНОСТИ
              </h1>
              <p className="text-base sm:text-lg font-medium text-[#6E6E73] mb-6">
                сайта «ПравоПодростка 14–17»
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
                <div className="rounded-2xl bg-[#F5F5F7] p-4 flex items-start gap-3">
                  <Lock className="w-5 h-5 text-[#0071E3] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <div className="font-semibold text-[#1D1D1F]">Без регистрации</div>
                    <div className="text-[#6E6E73] mt-0.5">Не запрашиваем ФИО, телефон или паспорт</div>
                  </div>
                </div>
                <div className="rounded-2xl bg-[#F5F5F7] p-4 flex items-start gap-3">
                  <Smartphone className="w-5 h-5 text-[#0071E3] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <div className="font-semibold text-[#1D1D1F]">Локальная работа</div>
                    <div className="text-[#6E6E73] mt-0.5">Расчеты и документы создаются в браузере</div>
                  </div>
                </div>
                <div className="rounded-2xl bg-[#F5F5F7] p-4 flex items-start gap-3">
                  <Shield className="w-5 h-5 text-[#0071E3] shrink-0 mt-0.5" />
                  <div className="text-xs sm:text-sm">
                    <div className="font-semibold text-[#1D1D1F]">Без рекламных трекеров</div>
                    <div className="text-[#6E6E73] mt-0.5">Не передаем сведения третьим лицам</div>
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-4">
              {privacySections.map((sec) => (
                <article
                  key={sec.num}
                  className="bg-white/95 rounded-[24px] border border-black/[0.06] p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.03)]"
                >
                  <div className="flex items-center gap-3 mb-3.5">
                    <span className="w-8 h-8 rounded-full bg-[#0071E3]/10 text-[#0071E3] font-semibold text-sm flex items-center justify-center shrink-0">
                      {sec.num}
                    </span>
                    <h2 className="text-lg sm:text-xl font-semibold tracking-tight text-[#1D1D1F]">
                      {sec.num}. {sec.title}
                    </h2>
                  </div>

                  <div className="space-y-3 text-sm sm:text-base text-[#1D1D1F]/85 leading-relaxed pl-0 sm:pl-11">
                    {sec.paragraphs.map((p, pIdx) => (
                      <p key={pIdx}>{p}</p>
                    ))}
                    {sec.bullets && (
                      <ul className="space-y-2 my-3 pl-5 list-disc text-[#1D1D1F]/90">
                        {sec.bullets.map((b, bIdx) => (
                          <li key={bIdx}>{b}</li>
                        ))}
                      </ul>
                    )}
                    {sec.afterParagraphs &&
                      sec.afterParagraphs.map((ap, apIdx) => <p key={apIdx}>{ap}</p>)}

                    {sec.hasClearStorageAction && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={clearLocalStorageData}
                          className="pp-btn inline-flex items-center gap-2 bg-[#F5F5F7] hover:bg-black/[0.08] text-[#1D1D1F] text-xs sm:text-sm font-medium px-4 py-2 rounded-full cursor-pointer"
                        >
                          <Trash2 className="w-3.5 h-3.5 text-[#0071E3]" />
                          <span>Очистить сохранённые отметки чек-листа</span>
                        </button>
                      </div>
                    )}

                    {sec.hasContactEmail && (
                      <div className="pt-2 flex flex-wrap items-center gap-2.5">
                        <a
                          href={SUPPORT_MAILTO_HREF}
                          className="inline-flex items-center gap-2 bg-[#F5F5F7] hover:bg-[#0071E3]/10 text-[#0071E3] font-semibold text-sm px-4 py-2.5 rounded-full transition-colors"
                        >
                          <Mail className="w-4 h-4" />
                          <span>{SUPPORT_EMAIL}</span>
                        </a>
                        <button
                          type="button"
                          onClick={() => copyText(SUPPORT_EMAIL, 'Адрес электронной почты скопирован')}
                          className="pp-btn inline-flex items-center gap-1.5 bg-[#F5F5F7] hover:bg-black/[0.08] text-[#1D1D1F] text-xs sm:text-sm font-medium px-4 py-2.5 rounded-full cursor-pointer"
                        >
                          <Copy className="w-3.5 h-3.5" />
                          <span>Скопировать адрес</span>
                        </button>
                      </div>
                    )}
                  </div>
                </article>
              ))}
            </section>

            <section className="bg-white/95 rounded-[28px] border border-[#0071E3]/20 p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.04)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <p className="text-sm sm:text-base font-medium text-[#1D1D1F] leading-relaxed">
                Используя Сайт «ПравоПодростка 14–17», пользователь подтверждает, что ознакомился с
                настоящей Политикой конфиденциальности.
              </p>
              <div className="flex flex-wrap gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={() => window.print()}
                  className="pp-btn inline-flex items-center gap-2 bg-[#F5F5F7] hover:bg-black/[0.08] text-[#1D1D1F] text-sm font-medium px-4 py-2.5 rounded-full cursor-pointer"
                >
                  <Printer className="w-4 h-4 text-[#0071E3]" />
                  <span>Печать / PDF</span>
                </button>
                <button
                  type="button"
                  onClick={() => navigateTo('overview')}
                  className="pp-btn inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#0077ED] text-white text-sm font-medium px-5 py-2.5 rounded-full cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>На главную</span>
                </button>
              </div>
            </section>
          </div>
        )}

        {/* СТРАНИЦА 404 */}
        {activeTab === '404' && (
          <div className="space-y-10 py-4 sm:py-8">
            <section className="text-center">
              <div className="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold text-[#0071E3] bg-white/90 border border-black/[0.07] px-4 py-1.5 rounded-full mb-2">
                <span>Ошибка 404</span>
                <span className="text-black/20">•</span>
                <span>Статья не найдена</span>
              </div>
              <div className="max-w-4xl mx-auto">
                <TechText text="404" fontSize={230} />
              </div>
              <div className="max-w-xl mx-auto">
                <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight text-[#1D1D1F] mb-4">
                  Такой статьи в законе нет.
                </h1>
                <p className="text-[#6E6E73] text-base sm:text-xl mb-8">
                  Похоже, эта страница не существует. Вернитесь на главную или проверьте вакансию в
                  калькуляторе.
                </p>
                <button
                  type="button"
                  onClick={() => navigateTo('overview')}
                  className="pp-btn inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#0077ED] text-white font-medium px-7 py-3.5 rounded-full text-base shadow-sm cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>Вернуться на главную</span>
                </button>
              </div>
            </section>

            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  id: 'calculator',
                  icon: Calculator,
                  title: 'Калькулятор ТК РФ',
                  desc: 'Проверка часов смены и испытательного срока'
                },
                {
                  id: 'documents',
                  icon: FileText,
                  title: 'Конструктор бланков',
                  desc: 'Согласие родителей и заявление на оплату'
                },
                {
                  id: 'radar',
                  icon: Scale,
                  title: 'Шкала 14 / 16 / 18',
                  desc: 'Права, банковские карты и сделки по ГК РФ'
                },
                {
                  id: 'traps',
                  icon: AlertTriangle,
                  title: 'Ловушки при найме',
                  desc: 'Готовые ответы на незаконные штрафы'
                }
              ].map((card) => {
                const CardIcon = card.icon;
                return (
                  <button
                    key={card.id}
                    type="button"
                    onClick={() => navigateTo(card.id)}
                    className="text-left bg-white/95 rounded-3xl border border-black/[0.06] hover:border-[#0071E3]/40 p-5 shadow-[0_4px_20px_rgba(0,0,0,0.03)] transition-all cursor-pointer group"
                  >
                    <div className="w-9 h-9 rounded-2xl bg-[#0071E3]/10 text-[#0071E3] flex items-center justify-center mb-3 group-hover:bg-[#0071E3] group-hover:text-white transition-colors">
                      <CardIcon className="w-4 h-4" />
                    </div>
                    <div className="font-semibold text-base text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                      {card.title}
                    </div>
                    <div className="text-xs sm:text-sm text-[#6E6E73] mt-1">{card.desc}</div>
                  </button>
                );
              })}
            </section>
          </div>
        )}
      </main>

      {/* МОДАЛЬНОЕ ОКНО РАЗБОРА ЛОВУШКИ */}
      {activeTrap && (
        <div
          onClick={(e) => {
            if (e.target === e.currentTarget) setActiveTrap(null);
          }}
          className="fixed inset-0 bg-black/35 backdrop-blur-md z-50 flex items-center justify-center p-4"
        >
          <div className="bg-white rounded-[28px] border border-black/[0.08] max-w-2xl w-full p-6 sm:p-9 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between gap-4 mb-4">
              <div>
                <span className="text-xs font-semibold text-[#0071E3]">
                  Правовая основа: {activeTrap.law}
                </span>
                <h2 className="text-xl sm:text-2xl font-semibold tracking-tight text-[#1D1D1F] mt-1">
                  {activeTrap.title}
                </h2>
              </div>
              <button
                type="button"
                onClick={() => setActiveTrap(null)}
                className="w-8 h-8 rounded-full bg-[#F5F5F7] hover:bg-black/10 flex items-center justify-center text-[#1D1D1F] cursor-pointer shrink-0"
                aria-label="Закрыть окно"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="bg-[#F5F5F7] p-4 sm:p-5 rounded-2xl text-sm sm:text-base text-[#1D1D1F]/90 leading-relaxed mb-5">
              {activeTrap.explain}
            </div>

            <h3 className="font-semibold text-xs uppercase tracking-wider text-[#6E6E73] mb-2">
              Что ответить работодателю (готовая формулировка):
            </h3>
            <div className="bg-[#F2FBF5] border border-[#34C759]/25 p-4 sm:p-5 rounded-2xl text-sm sm:text-base text-[#1D1D1F] leading-relaxed mb-6">
              {activeTrap.reply}
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={() => copyText(activeTrap.reply, 'Формулировка ответа скопирована')}
                className="inline-flex items-center gap-2 bg-[#0071E3] hover:bg-[#0077ED] text-white text-sm font-medium px-5 py-2.5 rounded-full cursor-pointer transition-colors"
              >
                <Copy className="w-4 h-4" />
                <span>Скопировать ответ</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTrap(null);
                  setDocType('internship');
                  navigateTo('documents');
                }}
                className="inline-flex items-center gap-2 bg-[#F5F5F7] hover:bg-black/[0.08] text-[#1D1D1F] text-sm font-medium px-5 py-2.5 rounded-full cursor-pointer transition-colors"
              >
                <FileText className="w-4 h-4 text-[#0071E3]" />
                <span>Перейти в конструктор претензий</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ВИДЖЕТ «ЧТО НОВОГО» СПРАВА СНИЗУ */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3">
        {showChangelog && (
          <div className="w-[320px] sm:w-[360px] bg-white/95 backdrop-blur-2xl rounded-3xl border border-black/[0.08] shadow-2xl p-5 max-h-[70vh] overflow-y-auto">
            <div className="flex items-center justify-between gap-2 pb-3 mb-3 border-b border-black/[0.07]">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#0071E3]" />
                <span className="font-semibold text-sm text-[#1D1D1F]">
                  Что нового с запуска сайта
                </span>
              </div>
              <button
                type="button"
                onClick={() => setShowChangelog(false)}
                className="w-7 h-7 rounded-full bg-[#F5F5F7] hover:bg-black/10 flex items-center justify-center text-[#1D1D1F] cursor-pointer"
                aria-label="Закрыть обновления"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>

            <div className="space-y-3.5">
              {CHANGELOG_ITEMS.map((item, idx) => (
                <div key={idx} className="text-xs sm:text-sm">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[11px] font-semibold text-[#0071E3] bg-[#0071E3]/[0.09] px-2 py-0.5 rounded-full">
                      {item.date}
                    </span>
                  </div>
                  <div className="font-semibold text-[#1D1D1F] mt-1">{item.title}</div>
                  <div className="text-xs text-[#6E6E73] leading-relaxed mt-0.5">{item.desc}</div>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          type="button"
          onClick={() => setShowChangelog((v) => !v)}
          className="pp-btn inline-flex items-center gap-2 bg-white/95 backdrop-blur-xl border border-black/[0.08] text-[#1D1D1F] hover:border-[#0071E3]/40 text-xs sm:text-sm font-semibold px-4 py-2.5 rounded-full shadow-lg cursor-pointer"
        >
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0071E3] opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-[#0071E3]" />
          </span>
          <Bell className="w-4 h-4 text-[#0071E3]" />
          <span>Что нового</span>
        </button>
      </div>

      {/* ВСПЛЫВАЮЩЕЕ УВЕДОМЛЕНИЕ */}
      {toastMessage && (
        <div className="fixed bottom-20 right-5 z-50 bg-[#1D1D1F]/95 backdrop-blur-md text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2 text-sm font-medium">
          <Check className="w-4 h-4 text-[#38BDF8]" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* ПОДВАЛ САЙТА */}
      <footer className="relative z-10 bg-[#F5F5F7]/95 backdrop-blur-xl border-t border-black/[0.08] text-[#6E6E73]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pb-10 border-b border-black/[0.07]">
            <div className="md:col-span-5 space-y-3">
              <button
                type="button"
                onClick={() => navigateTo('overview')}
                className="brand-logo-btn text-left cursor-pointer group"
              >
                <BrandLogo compact />
              </button>
              <p className="text-sm text-[#6E6E73] leading-relaxed max-w-md">
                Интерактивный веб-навигатор по трудовым и гражданским правам несовершеннолетних на
                основе главы 42 Трудового кодекса РФ и статьи 26 Гражданского кодекса РФ.
              </p>
              <p className="text-xs text-[#86868B] flex items-start gap-1.5 pt-1">
                <Info className="w-3.5 h-3.5 shrink-0 text-[#0071E3] mt-0.5" />
                <span>
                  Материалы сервиса носят справочно-просветительский характер и помогают быстро
                  ориентироваться в действующем законодательстве РФ.
                </span>
              </p>
            </div>

            <div className="md:col-span-3 space-y-2.5">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]">
                Разделы сайта
              </div>
              <ul className="space-y-2 text-sm">
                {navItems.map((item) => (
                  <li key={item.id}>
                    <button
                      type="button"
                      onClick={() => navigateTo(item.id)}
                      className="text-[#6E6E73] hover:text-[#0071E3] transition-colors cursor-pointer"
                    >
                      {item.label}
                    </button>
                  </li>
                ))}
                <li>
                  <button
                    type="button"
                    onClick={() => navigateTo('privacy')}
                    className={`transition-colors cursor-pointer ${
                      activeTab === 'privacy'
                        ? 'text-[#0071E3] font-semibold'
                        : 'text-[#6E6E73] hover:text-[#0071E3]'
                    }`}
                  >
                    Политика конфиденциальности
                  </button>
                </li>
              </ul>
            </div>

            <div className="md:col-span-4 space-y-3">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#1D1D1F]">
                Поддержка и контакты
              </div>
              <p className="text-sm text-[#6E6E73]">
                Есть вопрос по работе навигатора или конфиденциальности? Напишите на почту:
              </p>

              <div className="flex flex-wrap items-center gap-2">
                <a
                  href={SUPPORT_MAILTO_HREF}
                  className="inline-flex items-center gap-2 bg-white border border-black/[0.08] hover:border-[#0071E3]/40 text-[#1D1D1F] font-medium text-sm px-3.5 py-2 rounded-xl transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#0071E3]" />
                  <span>{SUPPORT_EMAIL}</span>
                </a>
                <button
                  type="button"
                  onClick={() => copyText(SUPPORT_EMAIL, 'Почта поддержки скопирована')}
                  className="p-2 bg-white border border-black/[0.08] hover:bg-black/[0.04] rounded-xl text-[#6E6E73] hover:text-[#1D1D1F] transition-colors cursor-pointer"
                  title="Скопировать e-mail"
                  aria-label="Скопировать e-mail поддержки"
                >
                  <Copy className="w-4 h-4" />
                </button>
              </div>

              <div className="pt-1 flex flex-wrap items-center gap-3">
                <a
                  href={SUPPORT_MAILTO_HREF}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0071E3] hover:underline"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Написать письмо в поддержку</span>
                </a>
                <span className="text-black/20">•</span>
                <button
                  type="button"
                  onClick={() => navigateTo('404')}
                  className="inline-flex items-center gap-1 text-xs text-[#86868B] hover:text-[#0071E3] transition-colors cursor-pointer"
                >
                  <Compass className="w-3.5 h-3.5" />
                  <span>Страница 404</span>
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#86868B]">
            <div>© 2026 ПравоПодростка 14–17. Все права защищены.</div>
            <div className="flex flex-wrap items-center gap-4">
              <span>Правовая база: гл. 42 ТК РФ, ст. 26 ГК РФ</span>
              <button
                type="button"
                onClick={() => navigateTo('privacy')}
                className="text-[#6E6E73] hover:text-[#0071E3] underline underline-offset-2 transition-colors cursor-pointer"
              >
                Политика конфиденциальности
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
