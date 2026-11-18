import React, { useEffect, useRef, useState } from 'react';

export interface GlassIconsItem {
  id?: string;
  icon: React.ReactNode;
  color?: string;
  label: string;
  href?: string;
  target?: string;
  onClick?: () => void;
  ariaLabel?: string;
  className?: string;
}

export interface GlassIconsProps {
  items: GlassIconsItem[];
  size?: number;
  gap?: number;
  columns?: number;
  roundness?: number;
  bevel?: number;
  frost?: number;
  shine?: number;
  tint?: string;
  tintOpacity?: number;
  iconColor?: string;
  plate?: 'tilt' | 'offset' | 'circle' | 'none';
  tilt?: number;
  spread?: number;
  hover?: 'lift' | 'float' | 'press' | 'none';
  parallax?: number;
  labels?: 'hover' | 'always' | 'none';
  intro?: boolean;
  theme?: 'dark' | 'light';
  className?: string;
  style?: React.CSSProperties;
}

const PRESET_GRADIENTS: Record<string, string> = {
  burgundy: 'linear-gradient(135deg, #7C3142 0%, #421923 100%)',
  gold: 'linear-gradient(135deg, #D9BA82 0%, #9F7C45 100%)',
  wine: 'linear-gradient(135deg, #5A222F 0%, #2C0F16 100%)',
  rose: 'linear-gradient(135deg, #B56974 0%, #7B3340 100%)',
  champagne: 'linear-gradient(135deg, #E3C998 0%, #B38D53 100%)',
  blue: 'linear-gradient(135deg, hsl(214, 95%, 66%), hsl(226, 80%, 50%))',
  purple: 'linear-gradient(135deg, hsl(276, 84%, 70%), hsl(262, 66%, 52%))',
  red: 'linear-gradient(135deg, hsl(354, 95%, 68%), hsl(342, 80%, 52%))',
  indigo: 'linear-gradient(135deg, hsl(236, 90%, 72%), hsl(246, 64%, 54%))',
  orange: 'linear-gradient(135deg, hsl(38, 100%, 62%), hsl(20, 94%, 54%))',
  green: 'linear-gradient(135deg, hsl(146, 66%, 54%), hsl(162, 82%, 34%))',
  teal: 'linear-gradient(135deg, hsl(184, 80%, 56%), hsl(196, 84%, 40%))',
  pink: 'linear-gradient(135deg, hsl(326, 92%, 74%), hsl(314, 70%, 54%))',
  graphite: 'linear-gradient(135deg, hsl(250, 6%, 46%), hsl(250, 8%, 22%))',
  silver: 'linear-gradient(135deg, hsl(240, 6%, 92%), hsl(240, 5%, 70%))',
};

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

const hexToRgba = (hex: string, alpha: number) => {
  const clean = hex.replace('#', '').trim();
  if (clean.length === 3) {
    const r = parseInt(clean[0] + clean[0], 16);
    const g = parseInt(clean[1] + clean[1], 16);
    const b = parseInt(clean[2] + clean[2], 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  if (clean.length === 6) {
    const r = parseInt(clean.slice(0, 2), 16);
    const g = parseInt(clean.slice(2, 4), 16);
    const b = parseInt(clean.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }
  return `rgba(255, 249, 240, ${alpha})`;
};

export const GlassIcons: React.FC<GlassIconsProps> = ({
  items = [],
  size = 64,
  gap = 28,
  columns = 5,
  roundness = 0.55,
  frost = 0.28,
  shine = 0.72,
  tint = '#FFF9F0',
  tintOpacity = 0.28,
  iconColor,
  plate = 'tilt',
  tilt = 14,
  spread = 0.5,
  hover = 'lift',
  parallax = 1,
  labels = 'always',
  intro = true,
  theme = 'light',
  className = '',
  style,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const [entered, setEntered] = useState(!intro);
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [pressedIdx, setPressedIdx] = useState<number | null>(null);
  const [pointerShift, setPointerShift] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  const tile = Math.max(44, Math.round(size));
  const radius =
    plate === 'circle' ? tile / 2 : Math.round((tile / 2) * clamp(roundness, 0, 1));
  const blurPx = Math.round(4 + clamp(frost, 0, 1) * 18);
  const glassTint = hexToRgba(tint, clamp(tintOpacity, 0, 0.85));
  const ink =
    iconColor ?? (theme === 'light' && plate === 'none' ? '#421923' : '#FFF9F0');

  useEffect(() => {
    if (!intro || entered) return;
    const node = rootRef.current;
    if (!node) return;
    const reduced = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduced || typeof IntersectionObserver === 'undefined') {
      setEntered(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setEntered(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [intro, entered]);

  const themeVars =
    theme === 'light'
      ? ({
          '--glass-icons-label': '#421923',
          '--glass-icons-edge': 'rgba(255, 255, 255, 0.65)',
          '--glass-icons-drop': 'rgba(66, 25, 35, 0.24)',
        } as React.CSSProperties)
      : ({
          '--glass-icons-label': 'rgba(255, 249, 240, 0.9)',
          '--glass-icons-edge': 'rgba(255, 255, 255, 0.2)',
          '--glass-icons-drop': 'rgba(0, 0, 0, 0.45)',
        } as React.CSSProperties);

  const colCount = Math.min(columns, Math.max(1, items.length));

  return (
    <div
      ref={rootRef}
      className={`glass-icons ${className}`}
      style={{
        ...themeVars,
        gridTemplateColumns: `repeat(auto-fit, minmax(${Math.max(tile + 24, 72)}px, 1fr))`,
        maxWidth: `${colCount * (tile + gap + 12)}px`,
        gap: `${gap}px ${Math.max(12, Math.round(gap * 0.65))}px`,
        ...style,
      }}
    >
      {items.map((item, idx) => {
        const isHovered = activeIdx === idx;
        const isPressed = pressedIdx === idx;
        const bg =
          (item.color ? PRESET_GRADIENTS[item.color] : undefined) ??
          item.color ??
          PRESET_GRADIENTS.burgundy;

        const shiftX = isHovered ? pointerShift.x * parallax * 5 : 0;
        const shiftY = isHovered ? pointerShift.y * parallax * 5 : 0;

        let plateTransform = 'translate3d(0, 0, 0) scale(0.85)';
        if (entered) {
          if (plate === 'tilt') {
            const angle = tilt + (isHovered && hover === 'lift' ? 8 : 0);
            const dx = isHovered && hover === 'lift' ? -5 + shiftX : shiftX;
            const dy = isHovered && hover === 'lift' ? -5 + shiftY : shiftY;
            const s = isPressed && hover === 'press' ? 0.93 : 1;
            plateTransform = `translate3d(${dx}px, ${dy}px, 0) rotate(${angle}deg) scale(${s})`;
          } else if (plate === 'offset') {
            const reach = spread * tile * 0.22 + (isHovered ? 4 : 0);
            plateTransform = `translate3d(${reach + shiftX}px, ${-reach + shiftY}px, 0)`;
          } else if (plate === 'circle') {
            const reach = spread * tile * 0.18 + (isHovered ? 3 : 0);
            const s = isHovered ? 1.07 : 1;
            plateTransform = `translate3d(${reach + shiftX}px, ${-reach + shiftY}px, 0) scale(${s})`;
          }
        }

        let glassTransform = entered
          ? 'translate3d(0, 0, 0) scale(1)'
          : 'translate3d(0, 12px, 0) scale(0.92)';
        if (entered) {
          if (isPressed) {
            glassTransform = 'translate3d(0, 1px, 0) scale(0.94)';
          } else if (isHovered && hover === 'lift') {
            glassTransform = 'translate3d(0, -5px, 0) scale(1.03)';
          } else if (isHovered && hover === 'float') {
            glassTransform = 'translate3d(0, -8px, 0) scale(1.02)';
          } else if (isHovered && hover === 'press') {
            glassTransform = 'translate3d(0, -2px, 0) scale(0.98)';
          }
        }

        const content = (
          <>
            <div
              className="glass-icons__stage"
              style={{ width: `${tile}px`, height: `${tile}px` }}
            >
              {plate !== 'none' && (
                <span
                  aria-hidden="true"
                  className="glass-icons__plate"
                  style={{
                    background: bg,
                    borderRadius: plate === 'circle' ? '9999px' : `${radius}px`,
                    opacity: entered ? 1 : 0,
                    transform: plateTransform,
                    transitionDelay: `${idx * 65}ms`,
                  }}
                />
              )}

              <span
                className="glass-icons__glass"
                style={
                  {
                    backgroundColor: glassTint,
                    borderRadius: `${radius}px`,
                    opacity: entered ? 1 : 0,
                    transform: glassTransform,
                    transitionDelay: isHovered || isPressed ? '0ms' : `${idx * 65}ms`,
                    '--gi-blur': `${blurPx}px`,
                    '--gi-shine': String(clamp(shine, 0, 1) * 0.72),
                  } as React.CSSProperties
                }
              >
                <span aria-hidden="true" className="glass-icons__bevel" />
                <span
                  className="glass-icons__glyph"
                  style={{
                    color: ink,
                    transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                  }}
                >
                  {item.icon}
                </span>
              </span>
            </div>

            {labels !== 'none' && (
              <span
                className="glass-icons__label font-body"
                style={{
                  opacity: labels === 'always' || isHovered ? 1 : 0,
                  transform:
                    labels === 'always' || isHovered
                      ? 'translate3d(0, 0, 0)'
                      : 'translate3d(0, -4px, 0)',
                }}
              >
                {item.label}
              </span>
            )}
          </>
        );

        const commonHandlers = {
          onMouseEnter: () => setActiveIdx(idx),
          onMouseLeave: () => {
            setActiveIdx(null);
            setPressedIdx(null);
            setPointerShift({ x: 0, y: 0 });
          },
          onPointerDown: () => setPressedIdx(idx),
          onPointerUp: () => setPressedIdx(null),
          onMouseMove: (e: React.MouseEvent<HTMLElement>) => {
            const rect = e.currentTarget.getBoundingClientRect();
            const nx = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
            const ny = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
            setPointerShift({ x: -nx, y: -ny });
          },
          onFocus: () => setActiveIdx(idx),
          onBlur: () => setActiveIdx(null),
        };

        if (item.href) {
          return (
            <a
              key={item.id ?? `${item.label}-${idx}`}
              href={item.href}
              target={item.target}
              aria-label={item.ariaLabel ?? item.label}
              className={`glass-icons__item min-h-[44px] ${item.className ?? ''}`}
              {...commonHandlers}
            >
              {content}
            </a>
          );
        }

        return (
          <button
            key={item.id ?? `${item.label}-${idx}`}
            type="button"
            onClick={item.onClick}
            aria-label={item.ariaLabel ?? item.label}
            className={`glass-icons__item min-h-[44px] ${item.className ?? ''}`}
            {...commonHandlers}
          >
            {content}
          </button>
        );
      })}
    </div>
  );
};

export default GlassIcons;
