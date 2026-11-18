import React, {
  useEffect,
  useId,
  useLayoutEffect,
  useRef,
  useState,
} from 'react';

export interface AnimatedListItemData {
  id?: string;
  icon?: React.ReactNode;
  image?: string;
  title: string;
  description?: string;
  meta?: string;
}

export type AnimatedListEntry = string | AnimatedListItemData;

export interface AnimatedListProps {
  items: AnimatedListEntry[];
  onItemSelect?: (item: AnimatedListEntry, index: number) => void;
  renderItem?: (
    item: AnimatedListEntry,
    index: number,
    selected: boolean,
  ) => React.ReactNode;
  initialSelectedIndex?: number;
  selectOnHover?: boolean;
  enableArrowNavigation?: boolean;
  loop?: boolean;
  animation?: 'pop' | 'slide' | 'fade' | 'none';
  animateOnce?: boolean;
  stagger?: number;
  showGradients?: boolean;
  fadeSize?: number;
  displayScrollbar?: boolean;
  frame?: boolean;
  theme?: 'dark' | 'light';
  accentColor?: string;
  radius?: number;
  gap?: number;
  width?: number | string;
  maxHeight?: number | string;
  className?: string;
  itemClassName?: string;
  style?: React.CSSProperties;
}

const useIsomorphicLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect;

const THEMES = {
  dark: {
    '--al-frame': 'rgba(66, 25, 35, 0.85)',
    '--al-frame-edge': 'rgba(197, 164, 107, 0.35)',
    '--al-frame-highlight': 'rgba(255, 249, 240, 0.08)',
    '--al-frame-shadow':
      '0 22px 44px -20px rgba(0, 0, 0, 0.65), 0 6px 16px -8px rgba(0, 0, 0, 0.4)',
    '--al-tile': 'linear-gradient(180deg, #54202C 0%, #3E1720 100%)',
    '--al-tile-edge': 'rgba(197, 164, 107, 0.25)',
    '--al-tile-highlight': 'rgba(255, 249, 240, 0.1)',
    '--al-tile-shadow': '0 4px 10px -4px rgba(0, 0, 0, 0.5)',
    '--al-well': 'rgba(197, 164, 107, 0.14)',
    '--al-ink': '#FFF9F0',
    '--al-muted': 'rgba(245, 235, 221, 0.72)',
    '--al-thumb': 'rgba(197, 164, 107, 0.35)',
    '--al-ring': 'rgba(197, 164, 107, 0.8)',
    '--al-ring-fill': 'rgba(197, 164, 107, 0.08)',
    '--al-hover': 'brightness(1.08)',
    '--al-press': 'brightness(0.9)',
    '--al-active': 'brightness(1.12)',
  },
  light: {
    '--al-frame': 'rgba(245, 235, 221, 0.86)',
    '--al-frame-edge': 'rgba(197, 164, 107, 0.55)',
    '--al-frame-highlight': 'rgba(255, 249, 240, 0.95)',
    '--al-frame-shadow':
      '0 22px 44px -24px rgba(66, 25, 35, 0.22), 0 6px 16px -10px rgba(66, 25, 35, 0.12)',
    '--al-tile': 'linear-gradient(180deg, #FFFDF9 0%, #FBF3E7 100%)',
    '--al-tile-edge': 'rgba(197, 164, 107, 0.42)',
    '--al-tile-highlight': 'rgba(255, 255, 255, 1)',
    '--al-tile-shadow': '0 4px 12px -6px rgba(66, 25, 35, 0.18)',
    '--al-well': 'rgba(103, 39, 53, 0.08)',
    '--al-ink': '#421923',
    '--al-muted': 'rgba(114, 82, 76, 0.9)',
    '--al-thumb': 'rgba(103, 39, 53, 0.22)',
    '--al-ring': 'rgba(103, 39, 53, 0.55)',
    '--al-ring-fill': 'rgba(103, 39, 53, 0.04)',
    '--al-hover': 'brightness(0.985)',
    '--al-press': 'brightness(0.95)',
    '--al-active': 'none',
  },
} as const;

const HIDDEN = {
  pop: {
    above: 'translate3d(0, -12px, 0) scale(0.86)',
    below: 'translate3d(0, 12px, 0) scale(0.86)',
  },
  slide: {
    above: 'translate3d(0, -24px, 0) scale(0.98)',
    below: 'translate3d(0, 24px, 0) scale(0.98)',
  },
  fade: {
    above: 'translate3d(0, -4px, 0)',
    below: 'translate3d(0, 4px, 0)',
  },
} as const;

const SPRING =
  'linear(0, 0.0603, 0.2033, 0.3821, 0.5633, 0.7258, 0.8584, 0.9574, 1.0242, 1.0634, 1.0809, 1.0828, 1.0747, 1.0613, 1.046, 1.0313, 1.0186, 1.0085, 1.0012, 0.9965, 0.994, 0.9931, 0.9933, 0.9941, 0.9953, 0.9966, 0.9978, 0.9988, 1)';

const smootherstep = (t: number) => t * t * t * (t * (t * 6 - 15) + 10);

const FADE_MASK = (() => {
  const steps = [0, 0.15, 0.3, 0.45, 0.6, 0.75, 0.9, 1];
  const top = steps.map(
    (t) =>
      `rgba(0, 0, 0, ${smootherstep(t).toFixed(3)}) calc(var(--al-fade-top, 0px) * ${t})`,
  );
  const bottom = [...steps]
    .reverse()
    .map(
      (t) =>
        `rgba(0, 0, 0, ${smootherstep(t).toFixed(3)}) calc(100% - var(--al-fade-bottom, 0px) * ${t})`,
    );
  return `linear-gradient(to bottom, ${[...top, ...bottom].join(', ')})`;
})();

const cssSize = (value: number | string) =>
  typeof value === 'number' ? `${value}px` : value;

export const AnimatedList: React.FC<AnimatedListProps> = ({
  items,
  onItemSelect,
  renderItem,
  initialSelectedIndex = -1,
  selectOnHover = true,
  enableArrowNavigation = true,
  loop = false,
  animation = 'pop',
  animateOnce = true,
  stagger = 0.06,
  showGradients = true,
  fadeSize = 44,
  displayScrollbar = true,
  frame = true,
  theme = 'light',
  accentColor = '#672735',
  radius = 10,
  gap = 10,
  width = '100%',
  maxHeight = 420,
  className = '',
  itemClassName = '',
  style,
}) => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);
  const indicatorRef = useRef<HTMLDivElement | null>(null);
  const ringRef = useRef<HTMLDivElement | null>(null);
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const engineRef = useRef<{
    place: (snap: boolean) => void;
    syncRing: () => void;
    updateFades: () => void;
    sync: () => void;
  } | null>(null);
  const keyboardRef = useRef(false);
  const navigatingRef = useRef(false);
  const [selected, setSelected] = useState(initialSelectedIndex);
  const baseId = useId();

  const settings = {
    items,
    onItemSelect,
    selected,
    selectOnHover,
    enableArrowNavigation,
    loop,
    animation,
    animateOnce,
    stagger,
    showGradients,
    fadeSize,
  };
  const settingsRef = useRef(settings);
  settingsRef.current = settings;

  useIsomorphicLayoutEffect(() => {
    const root = rootRef.current;
    const viewport = viewportRef.current;
    const track = trackRef.current;
    const indicator = indicatorRef.current;
    const ring = ringRef.current;
    if (!root || !viewport || !track || !indicator || !ring) return;

    const reduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
    const springEase =
      typeof CSS !== 'undefined' &&
      CSS.supports?.('transition-timing-function', 'linear(0, 1)')
        ? SPRING
        : 'cubic-bezier(0.34, 1.4, 0.64, 1)';
    const transition = `transform 580ms ${springEase}, opacity 280ms cubic-bezier(0.22, 1, 0.36, 1), filter 180ms ease`;

    const motion = { y: 0, h: 0, vy: 0, vh: 0, ty: 0, th: 0, ready: false };
    const fades = { top: '', bottom: '' };
    let boxes: ([number, number] | null)[] = [];
    let current: 'pop' | 'slide' | 'fade' | 'none' | null = null;
    let entered = false;
    let engaged = false;
    let pointer = [0, 0];
    let raf = 0;
    let last = 0;

    const mode = (): 'pop' | 'slide' | 'fade' | 'none' => {
      const chosen = settingsRef.current.animation;
      if (chosen === 'none' || !(chosen in HIDDEN)) return 'none';
      return reduced ? 'fade' : chosen;
    };

    const apply = (element: HTMLElement, state: 'above' | 'below' | 'in') => {
      element.dataset.state = state;
      const pose =
        current && current !== 'none' && state !== 'in'
          ? HIDDEN[current][state]
          : '';
      element.style.transform = pose;
      element.style.opacity = pose ? '0' : '';
    };

    const syncRing = () => {
      const item = itemRefs.current[settingsRef.current.selected];
      if (!item) return;
      const state = (item.dataset.state as 'above' | 'below' | 'in') || 'in';
      if (state === ring.dataset.state) return;
      ring.style.transitionDelay = item.style.transitionDelay;
      apply(ring, state);
    };

    const write = () => {
      indicator.style.transform = `translate3d(0, ${motion.y.toFixed(2)}px, 0)`;
      indicator.style.height = `${motion.h.toFixed(2)}px`;
    };

    const frame = (now: number) => {
      raf = 0;
      const dt = Math.min(0.05, (now - last) / 1000 || 0);
      last = now;
      const omega = 30;
      const zeta = 0.78;
      const steps = Math.max(1, Math.ceil(dt / (1 / 240)));
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        motion.vy +=
          (omega * omega * (motion.ty - motion.y) - 2 * zeta * omega * motion.vy) * h;
        motion.vh +=
          (omega * omega * (motion.th - motion.h) - 2 * zeta * omega * motion.vh) * h;
        motion.y += motion.vy * h;
        motion.h += motion.vh * h;
      }
      const moving =
        Math.abs(motion.ty - motion.y) > 0.05 ||
        Math.abs(motion.th - motion.h) > 0.05 ||
        Math.abs(motion.vy) + Math.abs(motion.vh) > 0.5;
      if (!moving) {
        motion.y = motion.ty;
        motion.h = motion.th;
        motion.vy = motion.vh = 0;
      }
      write();
      if (moving) raf = requestAnimationFrame(frame);
    };

    const place = (snap: boolean) => {
      const item = itemRefs.current[settingsRef.current.selected];
      if (!item) {
        indicator.style.opacity = '0';
        motion.ready = false;
        return;
      }
      indicator.style.opacity = '1';
      motion.ty = item.offsetTop;
      motion.th = item.offsetHeight;
      if (snap || reduced || !motion.ready) {
        motion.y = motion.ty;
        motion.h = motion.th;
        motion.vy = motion.vh = 0;
        motion.ready = true;
        write();
        return;
      }
      if (!raf) {
        last = performance.now();
        raf = requestAnimationFrame(frame);
      }
    };

    const updateFades = () => {
      const s = settingsRef.current;
      const span = Math.max(1, s.fadeSize);
      const { scrollTop, scrollHeight, clientHeight } = viewport;
      const top = s.showGradients ? Math.min(span, Math.max(0, scrollTop)) : 0;
      const bottom = s.showGradients
        ? Math.min(span, Math.max(0, scrollHeight - clientHeight - scrollTop))
        : 0;
      const nextTop = `${top.toFixed(1)}px`;
      const nextBottom = `${bottom.toFixed(1)}px`;
      if (nextTop !== fades.top) {
        fades.top = nextTop;
        viewport.style.setProperty('--al-fade-top', nextTop);
      }
      if (nextBottom !== fades.bottom) {
        fades.bottom = nextBottom;
        viewport.style.setProperty('--al-fade-bottom', nextBottom);
      }
    };

    const measure = () => {
      const offset = track.offsetTop;
      boxes = itemRefs.current.map((item) =>
        item ? [offset + item.offsetTop, item.offsetHeight] : null,
      );
    };

    const reveal = (entrance: boolean) => {
      if (!entered) return;
      const s = settingsRef.current;
      const top = viewport.scrollTop;
      const view = viewport.clientHeight;
      let order = 0;
      itemRefs.current.forEach((item, index) => {
        const box = boxes[index];
        if (!item || !box) return;
        const start = box[0] - top;
        const overlap = Math.min(view, start + box[1]) - Math.max(0, start);
        const hidden =
          current !== 'none' &&
          overlap < Math.min(box[1], view) * 0.5 &&
          !(s.animateOnce && item.dataset.seen);
        const state: 'above' | 'below' | 'in' = hidden
          ? start + box[1] / 2 < view / 2
            ? 'above'
            : 'below'
          : 'in';
        if (state === item.dataset.state) return;
        const delay =
          entrance && !hidden ? (order++ * Math.max(0, s.stagger)).toFixed(3) : 0;
        item.style.transitionDelay = delay ? `${delay}s, ${delay}s, 0s` : '';
        if (!hidden) item.dataset.seen = 'true';
        apply(item, state);
      });
      syncRing();
    };

    const sync = () => {
      const s = settingsRef.current;
      itemRefs.current.length = s.items.length;
      const activeItems = itemRefs.current.filter((x): x is HTMLButtonElement =>
        Boolean(x),
      );
      const next = mode();
      const changed = next !== current;
      const restyle = changed
        ? activeItems
        : activeItems.filter((item) => !item.dataset.state);
      current = next;
      if (current === 'none') entered = true;
      if (restyle.length) {
        const elements = changed ? [...restyle, ring] : restyle;
        for (const element of elements) element.style.transition = 'none';
        for (const item of restyle) {
          const prev = item.dataset.state as 'above' | 'below' | 'in' | undefined;
          apply(item, current === 'none' ? 'in' : prev || 'below');
        }
        if (changed) {
          const selState =
            (itemRefs.current[s.selected]?.dataset.state as
              | 'above'
              | 'below'
              | 'in'
              | undefined) || 'in';
          apply(ring, selState);
        }
        void root.offsetHeight;
        for (const element of elements) element.style.transition = transition;
      }
      measure();
      reveal(restyle.length > 0);
    };

    sync();

    const gate =
      typeof IntersectionObserver === 'undefined'
        ? null
        : new IntersectionObserver(
            (entries, observer) => {
              if (!entries.some((entry) => entry.isIntersecting)) return;
              observer.disconnect();
              if (entered) return;
              entered = true;
              measure();
              reveal(true);
            },
            { rootMargin: '0px 0px -8% 0px' },
          );

    if (!entered) {
      if (gate) gate.observe(root);
      else {
        entered = true;
        reveal(true);
      }
    }

    const resizeObserver = new ResizeObserver(() => {
      place(true);
      updateFades();
      measure();
      reveal(false);
    });
    resizeObserver.observe(viewport);
    resizeObserver.observe(track);

    const onScroll = () => {
      updateFades();
      reveal(false);
    };

    const onKey = (event: KeyboardEvent) => {
      const s = settingsRef.current;
      if (!s.enableArrowNavigation || event.defaultPrevented) return;
      if (event.altKey || event.ctrlKey || event.metaKey) return;
      const active = document.activeElement;
      const focused = active === viewport;
      const idle =
        !active ||
        active === document.body ||
        active === document.documentElement;
      if (!focused && !(engaged && idle)) return;

      const count = s.items.length;
      if (!count) return;
      const index = s.selected;
      let next: number | null = null;
      if (event.key === 'ArrowDown') next = index < 0 ? 0 : index + 1;
      else if (event.key === 'ArrowUp') next = index < 0 ? count - 1 : index - 1;
      else if (event.key === 'Home') next = 0;
      else if (event.key === 'End') next = count - 1;
      else if (
        (event.key === 'Enter' || (focused && event.key === ' ')) &&
        index >= 0 &&
        index < count
      ) {
        event.preventDefault();
        s.onItemSelect?.(s.items[index], index);
        return;
      }
      if (next === null) return;
      event.preventDefault();
      next = s.loop
        ? (next + count) % count
        : Math.min(count - 1, Math.max(0, next));
      keyboardRef.current = true;
      navigatingRef.current = true;
      setSelected(next);
    };

    const onPointerMove = (event: PointerEvent) => {
      const moved =
        event.clientX !== pointer[0] || event.clientY !== pointer[1];
      pointer = [event.clientX, event.clientY];
      if (!navigatingRef.current || !moved) return;
      navigatingRef.current = false;
      const target =
        event.target instanceof Element
          ? event.target.closest<HTMLElement>('[data-index]')
          : null;
      if (
        target &&
        root.contains(target) &&
        settingsRef.current.selectOnHover
      ) {
        setSelected(Number(target.dataset.index));
      }
    };

    const onEnter = () => {
      engaged = true;
    };
    const onLeave = () => {
      engaged = false;
    };

    viewport.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('keydown', onKey);
    root.addEventListener('pointerenter', onEnter);
    root.addEventListener('pointerleave', onLeave);
    root.addEventListener('pointermove', onPointerMove);

    updateFades();
    place(true);
    syncRing();

    engineRef.current = { place, syncRing, updateFades, sync };

    return () => {
      cancelAnimationFrame(raf);
      gate?.disconnect();
      resizeObserver.disconnect();
      viewport.removeEventListener('scroll', onScroll);
      window.removeEventListener('keydown', onKey);
      root.removeEventListener('pointerenter', onEnter);
      root.removeEventListener('pointerleave', onLeave);
      root.removeEventListener('pointermove', onPointerMove);
      engineRef.current = null;
    };
  }, []);

  useIsomorphicLayoutEffect(() => {
    engineRef.current?.sync();
  }, [items, animation]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    engine.place(false);
    engine.syncRing();
    if (!keyboardRef.current) return;
    keyboardRef.current = false;

    const viewport = viewportRef.current;
    const track = trackRef.current;
    const item = itemRefs.current[selected];
    if (!viewport || !track || !item) return;

    const top = track.offsetTop + item.offsetTop;
    const bottom = top + item.offsetHeight;
    const room = Math.max(0, (viewport.clientHeight - item.offsetHeight) / 2);
    const margin = Math.min(showGradients ? Math.max(12, fadeSize) : 12, room);
    if (top < viewport.scrollTop + margin) {
      viewport.scrollTo({ top: Math.max(0, top - margin), behavior: 'smooth' });
    } else if (bottom > viewport.scrollTop + viewport.clientHeight - margin) {
      viewport.scrollTo({
        top: bottom - viewport.clientHeight + margin,
        behavior: 'smooth',
      });
    }
  }, [selected, fadeSize, showGradients]);

  const themeVars = THEMES[theme];

  return (
    <div
      ref={rootRef}
      className={`animated-list ${frame ? 'animated-list--framed' : ''} ${className}`}
      style={{
        ...(themeVars as React.CSSProperties),
        ...(accentColor
          ? ({ '--al-accent': accentColor, '--al-ring': accentColor } as React.CSSProperties)
          : {}),
        maxWidth: cssSize(width),
        borderRadius: frame ? `${radius + 6}px` : undefined,
        ...style,
      }}
    >
      <div
        ref={viewportRef}
        tabIndex={0}
        role="listbox"
        aria-activedescendant={
          selected >= 0 ? `${baseId}-item-${selected}` : undefined
        }
        className={`animated-list__viewport ${
          displayScrollbar
            ? 'animated-list__viewport--thin-bar'
            : 'animated-list__viewport--hidden-bar'
        }`}
        style={
          {
            maxHeight: cssSize(maxHeight),
            '--al-fade-mask': FADE_MASK,
          } as React.CSSProperties
        }
      >
        <div
          ref={trackRef}
          className="animated-list__track"
          style={{ gap: `${gap}px` }}
        >
          <div
            ref={indicatorRef}
            aria-hidden="true"
            className="animated-list__ring"
            style={{ borderRadius: `${radius}px`, opacity: 0 }}
          >
            <div ref={ringRef} className="w-full h-full" />
          </div>

          {items.map((entry, index) => {
            const data: AnimatedListItemData =
              typeof entry === 'string' ? { title: entry } : entry;
            const isSelected = selected === index;
            const itemKey = data.id ?? `${data.title}-${index}`;

            return (
              <button
                key={itemKey}
                id={`${baseId}-item-${index}`}
                ref={(el) => {
                  itemRefs.current[index] = el;
                }}
                type="button"
                role="option"
                aria-selected={isSelected}
                data-index={index}
                onMouseEnter={() => {
                  if (selectOnHover && !navigatingRef.current) {
                    setSelected(index);
                  }
                }}
                onClick={() => {
                  setSelected(index);
                  onItemSelect?.(entry, index);
                }}
                className={`animated-list__item ${itemClassName}`}
                style={{ borderRadius: `${radius}px` }}
              >
                {renderItem ? (
                  renderItem(entry, index, isSelected)
                ) : (
                  <>
                    {data.icon && (
                      <span className="animated-list__icon-well" aria-hidden="true">
                        {data.icon}
                      </span>
                    )}
                    <div className="animated-list__body">
                      <div className="animated-list__title">{data.title}</div>
                      {data.description && (
                        <div className="animated-list__desc">
                          {data.description}
                        </div>
                      )}
                    </div>
                    {data.meta && (
                      <span className="animated-list__meta tabular-nums" dir="ltr">
                        {data.meta}
                      </span>
                    )}
                  </>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AnimatedList;
