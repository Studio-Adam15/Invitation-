import React from 'react';

interface AmbientPetalsProps {
  variant?: 'envelope' | 'editorial' | 'dusk';
}

const GOLD_SPECKS = [
  { left: '12%', top: '18%', size: 4, dx: '14px', dy: '-24px', dur: '6.2s', delay: '0s' },
  { left: '26%', top: '68%', size: 3, dx: '-10px', dy: '-18px', dur: '5.4s', delay: '1.1s' },
  { left: '44%', top: '24%', size: 3.5, dx: '12px', dy: '-22px', dur: '6.8s', delay: '0.6s' },
  { left: '68%', top: '16%', size: 4, dx: '-14px', dy: '-20px', dur: '5.8s', delay: '1.8s' },
  { left: '82%', top: '42%', size: 3, dx: '10px', dy: '-26px', dur: '6.5s', delay: '0.4s' },
  { left: '78%', top: '76%', size: 4, dx: '-12px', dy: '-22px', dur: '5.9s', delay: '2.1s' },
  { left: '18%', top: '84%', size: 3, dx: '16px', dy: '-18px', dur: '7.1s', delay: '1.4s' },
  { left: '54%', top: '82%', size: 3.5, dx: '-8px', dy: '-24px', dur: '6.0s', delay: '0.9s' },
];

const ROSE_PETALS = [
  { left: '16%', size: 12, x: '36px', rot: '210deg', dur: '15s', delay: '0.5s' },
  { left: '74%', size: 14, x: '-44px', rot: '-180deg', dur: '17s', delay: '4.2s' },
  { left: '88%', size: 11, x: '-28px', rot: '260deg', dur: '14s', delay: '8.5s' },
];

export const AmbientPetals: React.FC<AmbientPetalsProps> = ({
  variant = 'envelope',
}) => {
  const speckOpacity = variant === 'dusk' ? 'opacity-80' : 'opacity-65';

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden select-none"
    >
      {/* Floating golden dust particles */}
      {GOLD_SPECKS.map((s, idx) => (
        <span
          key={`speck-${idx}`}
          className={`animate-gold-dust-idle absolute rounded-full ${speckOpacity}`}
          style={
            {
              left: s.left,
              top: s.top,
              width: `${s.size}px`,
              height: `${s.size}px`,
              background:
                'radial-gradient(circle, #FFF9F0 0%, #E2C894 45%, #C5A46B 100%)',
              '--dx': s.dx,
              '--dy': s.dy,
              '--dur': s.dur,
              animationDelay: s.delay,
              willChange: 'transform, opacity',
            } as React.CSSProperties
          }
        />
      ))}

      {/* Delicate drifting burgundy rose petals */}
      {ROSE_PETALS.map((p, idx) => (
        <span
          key={`petal-${idx}`}
          className="animate-petal-drift absolute top-0"
          style={
            {
              left: p.left,
              width: `${p.size}px`,
              height: `${p.size * 1.35}px`,
              borderRadius: '85% 15% 80% 20% / 75% 25% 75% 25%',
              background:
                'linear-gradient(145deg, #8F384B 0%, #672735 55%, #421923 100%)',
              '--petal-x': p.x,
              '--petal-rot': p.rot,
              '--dur': p.dur,
              animationDelay: p.delay,
              willChange: 'transform, opacity',
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
};
