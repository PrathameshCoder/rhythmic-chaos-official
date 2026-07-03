"use client";

import React, { useMemo, useId } from "react";

type WaveBarsProps = {
  width?: number;
  height?: number;
  bars?: number;
  barWidth?: number;
  gap?: number;
  radius?: number;
  intensity?: number;
  mirror?: boolean;
  className?: string;
};

function clamp01(x: number) {
  return Math.max(0, Math.min(1, x));
}

function envelope(t: number) {
  // helper: raised cosine "bump" in [a,b]
  const bump = (x: number, a: number, b: number, power = 1.6) => {
    if (x <= a || x >= b) return 0;
    const u = (x - a) / (b - a);          // 0..1
    const y = Math.sin(Math.PI * u);      // 0..1..0 (smooth arch)
    return Math.pow(y, power);
  };

  // --- Two arches (left bigger, right smaller) ---
  const left  = 1.00 * bump(t, 0.02, 0.56, 1.35); // big left arch
  const right = 0.78 * bump(t, 0.44, 0.98, 1.55); // smaller right arch

  // --- Valley in the center (carves out the dip) ---
  const valley = 0.42 * bump(t, 0.43, 0.63, 1.05);

  // combine
  let y = left + right - valley;

  // Edge taper so far-left & far-right shrink a bit more (like your image)
  const edge = Math.sin(Math.PI * Math.min(1, Math.max(0, t)));
  y *= Math.pow(edge, 0.95);

  return Math.max(0, y);
}

export default function WaveBars({
  width = 1100,
  height = 280,
  bars = 46,
  barWidth = 10,
  gap = 10,
  radius = 10,
  intensity = 1,
  mirror = false,
  className,
}: WaveBarsProps) {
  const { x0, step } = useMemo(() => {
    const step = barWidth + gap;
    const viewWidth = (bars - 1) * step + barWidth;
    const x0 = (width - viewWidth) / 2;
    return { x0, step };
  }, [width, bars, barWidth, gap]);

  const barsData = useMemo(() => {
    const topPadding = 18;
    const bottomPadding = 18;
    const usableH = height - topPadding - bottomPadding;

    const micro = (i: number) => 0.92 + 0.08 * Math.sin(i * 0.55);

    return Array.from({ length: bars }, (_, i) => {
      const idx = mirror ? bars - 1 - i : i;
      const t = idx / (bars - 1);

      const env = envelope(t) * micro(idx) * intensity;
      const h = clamp01(env) * usableH + usableH * 0.08;

      const x = x0 + i * step;
      const y = topPadding + (usableH - h);

      return { x, y, h };
    });
  }, [bars, height, intensity, mirror, step, x0]);

  const svgId = useId();

  return (
    <svg
      className={className}
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      aria-hidden="true"
      style={{ display: "block" }}
    >
      <defs>
        <linearGradient id={`${svgId}-grad`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(40,150,255,0.95)" />
          <stop offset="35%" stopColor="rgba(125,110,255,0.85)" />
          <stop offset="70%" stopColor="rgba(255,170,90,0.85)" />
          <stop offset="100%" stopColor="rgba(255,205,135,0.9)" />
        </linearGradient>

        <filter id={`${svgId}-glow`} x="-40%" y="-40%" width="180%" height="180%">
          <feGaussianBlur stdDeviation="2.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* IMPORTANT FIX: mask must be WHITE to reveal content */}
        <linearGradient id={`${svgId}-fade`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="white" stopOpacity="0" />
          <stop offset="12%" stopColor="white" stopOpacity="1" />
          <stop offset="88%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        <mask id={`${svgId}-mask`}>
          <rect x="0" y="0" width={width} height={height} fill={`url(#${svgId}-fade)`} />
        </mask>
      </defs>

      <g filter={`url(#id`} mask={`url(#${svgId}-mask)`}>
        {barsData.map((b, i) => (
          <rect
            key={i}
            x={b.x}
            y={b.y}
            width={barWidth}
            height={b.h}
            rx={radius}
            fill={`url(#${svgId}-grad)`}
            opacity="0.95"
          />
        ))}
      </g>

      <g mask={`url(#${svgId}-mask)`} opacity="0.35">
        {barsData.map((b, i) => (
          <rect
            key={i}
            x={b.x + barWidth * 0.22}
            y={b.y}
            width={barWidth * 0.18}
            height={b.h}
            rx={radius}
            fill="white"
            opacity="0.22"
          />
        ))}
      </g>
    </svg>
  );
}