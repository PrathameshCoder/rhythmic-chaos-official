'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';

const GRADIENT_CORE =
  'linear-gradient(to bottom,' +
  'transparent 0%,' +
  '#2274c9 10%,' +
  '#2274c9 42%,' +
  '#b090b1 52%,' +
  '#eba56b 65%,' +
  '#f0b87a 90%,' +
  'transparent 100%)';

const GRADIENT_GLOW =
  'linear-gradient(to bottom,' +
  'transparent 0%,' +
  'transparent 6%,' +
  '#2274c9 15%,' +
  '#2274c9 42%,' +
  '#b090b1 52%,' +
  '#eba56b 65%,' +
  '#f0b87a 84%,' +
  'transparent 94%,' +
  'transparent 100%)';

const BAR_COUNT  = 32;
const BAR_HEIGHT = 400;
const BAR_GAP    = 20;

const BAR_OFFSETS: number[] = [
   38,   6, -30, -61,  -91, -117, -137, -149,
  -147, -137, -160, -140, -142, -121,  -90,  -57,
   -26,   3,  27,  42,   49,   42,   24,  17,
    18,  28,  46,  69,   98,  129,  162, 182,
];

const BAR_OPACITY: number[] = [
  0.25, 0.55,
  0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75,
  0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75,
  0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75, 0.75,
  0.60, 0.18,
];

export default function InteractiveWaveform() {
  const outersRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const outers = outersRef.current.filter(Boolean) as HTMLDivElement[];
    if (!outers.length) return;

    outers.forEach((el, i) => {
      gsap.set(el, { y: BAR_OFFSETS[i], scaleY: 0, opacity: 0, transformOrigin: 'center center' });
    });

    gsap.to(outers, {
      scaleY:   1,
      opacity:  (i: number) => BAR_OPACITY[i],
      duration: 1.8,
      ease:     'power3.out',
      delay:    0.2,
      stagger:  { each: 0.020, from: 'center' },
    });

    return () => { gsap.killTweensOf(outers); };
  }, []);

  const onEnter = (i: number) => {
    gsap.to(outersRef.current[i], { scaleY: 1.12, opacity: 1, duration: 0.5, ease: 'elastic.out(1,0.45)', overwrite: 'auto' });
  };
  const onLeave = (i: number) => {
    gsap.to(outersRef.current[i], { scaleY: 1, opacity: BAR_OPACITY[i], duration: 0.5, ease: 'elastic.out(1,0.45)', overwrite: 'auto' });
  };

  return (
    <>
      <style>{`
        .bar-outer {
          position: relative;
          width: 5px;
          height: ${BAR_HEIGHT}px;
          flex-shrink: 0;
          will-change: transform, opacity;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          cursor: none;
        }
        .bar-glow {
          position: absolute;
          top: 0;
          left: 50%;
          transform: translateX(-50%);
          width: 10px;
          height: 100%;
          pointer-events: none;
          filter: blur(3px);
          opacity: 0.35;
        }
        .bar-core {
          position: absolute;
          inset: 0;
          pointer-events: none;
          -webkit-mask-image: linear-gradient(
            to bottom, transparent 0%, black 10%, black 90%, transparent 100%
          );
          mask-image: linear-gradient(
            to bottom, transparent 0%, black 10%, black 90%, transparent 100%
          );
        }
        .music {
          display: flex;
          align-items: center;
          gap: ${BAR_GAP}px;
          width: fit-content;
        }
      `}</style>

      <div
        className="relative w-full h-screen flex items-center justify-center overflow-hidden cursor-none"
        style={{ background: '#000' }}
      >
        <div className="music">
          {Array.from({ length: BAR_COUNT }, (_, i) => (
            <div
              key={i}
              ref={el => { outersRef.current[i] = el; }}
              className="bar-outer"
              onMouseEnter={() => onEnter(i)}
              onMouseLeave={() => onLeave(i)}
              style={{
                transform: `translateZ(0) translateY(${BAR_OFFSETS[i]}px)`,
                opacity:   BAR_OPACITY[i],
              }}
            >
              <div className="bar-glow" style={{ background: GRADIENT_GLOW }} />
              <div className="bar-core" style={{ background: GRADIENT_CORE }} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}