"use client";

import { CanvasLayer } from "@/components/sample/canvas-layer";

const CYAN = "127,220,255";
const BLUE = "63,180,255";
const GREEN = "108,229,154";

/* ---------- Connected network (dots + lines), pointer / touch reactive ---------- */
type Node = { x: number; y: number; vx: number; vy: number; r: number };

export function NetworkCanvas({ density = 11000, className = "" }: { density?: number; className?: string }) {
  return (
    <CanvasLayer<Node[]>
      className={className}
      init={(w, h) => {
        const n = Math.min(Math.max(Math.round((w * h) / density), 26), 90);
        return Array.from({ length: n }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 18,
          vy: (Math.random() - 0.5) * 18,
          r: 1 + Math.random() * 1.4,
        }));
      }}
      draw={({ ctx, w, h, dt, pointer }, nodes) => {
        const link = Math.min(150, Math.max(96, w / 9));
        for (const n of nodes) {
          if (pointer.active) {
            const dx = pointer.x - n.x;
            const dy = pointer.y - n.y;
            const d = Math.hypot(dx, dy);
            if (d < 220 && d > 1) {
              n.vx += (dx / d) * 14 * dt;
              n.vy += (dy / d) * 14 * dt;
            }
          }
          n.vx *= 0.995;
          n.vy *= 0.995;
          n.x += n.vx * dt;
          n.y += n.vy * dt;
          if (n.x < 0 || n.x > w) n.vx *= -1;
          if (n.y < 0 || n.y > h) n.vy *= -1;
          n.x = Math.min(Math.max(n.x, 0), w);
          n.y = Math.min(Math.max(n.y, 0), h);
        }
        ctx.lineWidth = 1;
        for (let i = 0; i < nodes.length; i++) {
          for (let j = i + 1; j < nodes.length; j++) {
            const d = Math.hypot(nodes[i].x - nodes[j].x, nodes[i].y - nodes[j].y);
            if (d < link) {
              ctx.strokeStyle = `rgba(${BLUE},${(1 - d / link) * 0.38})`;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(nodes[j].x, nodes[j].y);
              ctx.stroke();
            }
          }
          if (pointer.active) {
            const d = Math.hypot(nodes[i].x - pointer.x, nodes[i].y - pointer.y);
            if (d < 190) {
              ctx.strokeStyle = `rgba(${CYAN},${(1 - d / 190) * 0.55})`;
              ctx.beginPath();
              ctx.moveTo(nodes[i].x, nodes[i].y);
              ctx.lineTo(pointer.x, pointer.y);
              ctx.stroke();
            }
          }
        }
        for (const n of nodes) {
          ctx.fillStyle = `rgba(${CYAN},0.85)`;
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }}
    />
  );
}

/* ---------- Pinching wave lines (echoes the hourglass art) ---------- */
export function WavesCanvas() {
  return (
    <CanvasLayer
      draw={({ ctx, w, h, t }) => {
        const lines = 15;
        const cy = h * 0.5;
        const spacing = Math.min(h / 22, 26);
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        grad.addColorStop(0, `rgba(${BLUE},0)`);
        grad.addColorStop(0.5, `rgba(${CYAN},1)`);
        grad.addColorStop(1, `rgba(${BLUE},0)`);
        ctx.lineWidth = 2;
        for (let i = 0; i < lines; i++) {
          const k = i - (lines - 1) / 2;
          ctx.globalAlpha = 0.55 + 0.45 * (1 - Math.abs(k) / (lines / 2));
          ctx.strokeStyle = grad;
          ctx.beginPath();
          for (let x = 0; x <= w + 8; x += 8) {
            const u = x / w - 0.5;
            const pinch = 0.3 + 0.7 * Math.pow(Math.abs(u) * 2, 1.4);
            const wave = Math.sin(x * 0.006 + t * 0.7 + i * 0.32) * 16 * (0.5 + Math.abs(u));
            const y = cy + k * spacing * 2.1 * pinch + wave * (0.4 + pinch * 0.6);
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }}
    />
  );
}

/* ---------- Falling light streams ---------- */
type Stream = { x: number; y: number; len: number; v: number; green: boolean };

export function StreamsCanvas() {
  return (
    <CanvasLayer<Stream[]>
      init={(w, h) =>
        Array.from({ length: Math.min(Math.round(w / 26), 60) }, () => ({
          x: Math.random() * w,
          y: Math.random() * h * 1.4,
          len: 50 + Math.random() * 120,
          v: 60 + Math.random() * 170,
          green: Math.random() < 0.12,
        }))
      }
      draw={({ ctx, w, h, dt }, streams) => {
        for (const s of streams) {
          s.y += s.v * dt;
          if (s.y - s.len > h) {
            s.y = -10;
            s.x = Math.random() * w;
          }
          const c = s.green ? GREEN : CYAN;
          const g = ctx.createLinearGradient(0, s.y - s.len, 0, s.y);
          g.addColorStop(0, `rgba(${c},0)`);
          g.addColorStop(1, `rgba(${c},0.75)`);
          ctx.fillStyle = g;
          ctx.fillRect(s.x, s.y - s.len, 1.4, s.len);
          ctx.fillStyle = `rgba(255,255,255,0.9)`;
          ctx.fillRect(s.x - 0.4, s.y - 1.5, 2.2, 2.2);
        }
      }}
    />
  );
}

/* ---------- Spotlight dot grid (follows pointer, drifts on its own) ---------- */
export function DotSpotCanvas() {
  return (
    <CanvasLayer<{ x: number; y: number }>
      init={(w, h) => ({ x: w * 0.5, y: h * 0.5 })}
      draw={({ ctx, w, h, t, dt, pointer }, light) => {
        const tx = pointer.active ? pointer.x : w * (0.5 + 0.34 * Math.sin(t * 0.45));
        const ty = pointer.active ? pointer.y : h * (0.5 + 0.26 * Math.sin(t * 0.33 + 1));
        const k = 1 - Math.exp(-dt * 4);
        light.x += (tx - light.x) * k;
        light.y += (ty - light.y) * k;
        const gap = w < 600 ? 22 : 28;
        const R = Math.min(300, Math.max(w, h) * 0.3);
        for (let y = gap / 2; y < h; y += gap) {
          for (let x = gap / 2; x < w; x += gap) {
            const d = Math.hypot(x - light.x, y - light.y);
            const i = d < R ? Math.pow(1 - d / R, 2) : 0;
            ctx.fillStyle = `rgba(${i > 0.25 ? CYAN : BLUE},${0.1 + i * 0.85})`;
            ctx.beginPath();
            ctx.arc(x, y, 0.9 + i * 2.4, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }}
    />
  );
}

/* ---------- Twinkling stars ---------- */
type Star = { x: number; y: number; r: number; s: number; p: number };

export function StarsCanvas({ area = 0.7 }: { area?: number }) {
  return (
    <CanvasLayer<Star[]>
      init={(w, h) =>
        Array.from({ length: Math.min(Math.round((w * h) / 5200), 140) }, () => ({
          x: Math.random() * w,
          y: Math.random() * h * area,
          r: 0.4 + Math.random() * 1.1,
          s: 0.5 + Math.random() * 1.6,
          p: Math.random() * Math.PI * 2,
        }))
      }
      draw={({ ctx, t }, stars) => {
        for (const s of stars) {
          const a = 0.25 + 0.75 * (0.5 + 0.5 * Math.sin(t * s.s + s.p));
          ctx.fillStyle = `rgba(214,240,255,${a * 0.85})`;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }}
    />
  );
}

/* ---------- Floating haze particles ---------- */
type Mote = { x: number; y: number; r: number; vx: number; vy: number; p: number };

export function DustCanvas() {
  return (
    <CanvasLayer<Mote[]>
      init={(w, h) =>
        Array.from({ length: Math.min(Math.round((w * h) / 9000), 90) }, () => ({
          x: Math.random() * w,
          y: Math.random() * h,
          r: 0.6 + Math.random() * 1.8,
          vx: 4 + Math.random() * 10,
          vy: -(2 + Math.random() * 8),
          p: Math.random() * Math.PI * 2,
        }))
      }
      draw={({ ctx, w, h, t, dt }, motes) => {
        for (const m of motes) {
          m.x += m.vx * dt;
          m.y += m.vy * dt;
          if (m.x > w + 4) m.x = -4;
          if (m.y < -4) m.y = h + 4;
          const a = 0.15 + 0.5 * (0.5 + 0.5 * Math.sin(t * 0.9 + m.p));
          ctx.fillStyle = `rgba(190,235,255,${a})`;
          ctx.beginPath();
          ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2);
          ctx.fill();
        }
      }}
    />
  );
}
