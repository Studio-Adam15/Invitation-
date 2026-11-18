import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  CakeSlice,
  CalendarHeart,
  CheckCircle2,
  Clock,
  HeartHandshake,
  ListMusic,
  MapPin,
  Music,
  RotateCcw,
  Shirt,
  Sparkles,
  Utensils,
  VolumeX,
} from 'lucide-react';
import { COPY, Language } from '../config/weddingConfig';
import { AmbientPetals } from './AmbientPetals';
import { AnimatedList, AnimatedListItemData } from './AnimatedList';
import { CornerFloral, GarlandFloral } from './BotanicalDecor';
import { CalendarCountdown } from './CalendarCountdown';
import { GlassIcons, GlassIconsItem } from './GlassIcons';
import { RevealOnScroll } from './RevealOnScroll';
import { RsvpSection } from './RsvpSection';
import ScrollReveal from './ScrollReveal';
import { VenueSection } from './VenueSection';

interface InvitationViewProps {
  lang: Language;
  onToggleLang: () => void;
  musicPlaying: boolean;
  onToggleMusic: () => void;
  onReplayEnvelope: () => void;
}

const IntertwinedRingsEmblem: React.FC = () => (
  <svg
    viewBox="0 0 180 100"
    className="w-36 sm:w-44 h-auto mx-auto"
    fill="none"
    aria-hidden="true"
  >
    <defs>
      <linearGradient id="ringGold" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F5E4BE" />
        <stop offset="40%" stopColor="#C5A46B" />
        <stop offset="75%" stopColor="#E6CC96" />
        <stop offset="100%" stopColor="#8A6733" />
      </linearGradient>
    </defs>

    {/* Botanical sprigs framing the rings */}
    <g stroke="#C5A46B" strokeWidth="1.2" strokeLinecap="round" opacity="0.75">
      <path d="M36 74 C22 66, 16 54, 14 40" />
      <path d="M144 74 C158 66, 164 54, 166 40" />
      <ellipse cx="22" cy="56" rx="6" ry="2.6" transform="rotate(-35 22 56)" fill="#DCC8AA" />
      <ellipse cx="158" cy="56" rx="6" ry="2.6" transform="rotate(35 158 56)" fill="#DCC8AA" />
    </g>

    {/* Left ring */}
    <circle
      cx="72"
      cy="52"
      r="27"
      stroke="url(#ringGold)"
      strokeWidth="5.5"
    />
    <circle
      cx="72"
      cy="52"
      r="24.5"
      stroke="#FFF9F0"
      strokeOpacity="0.55"
      strokeWidth="1"
    />

    {/* Right ring */}
    <circle
      cx="108"
      cy="52"
      r="27"
      stroke="url(#ringGold)"
      strokeWidth="5.5"
    />
    <circle
      cx="108"
      cy="52"
      r="24.5"
      stroke="#FFF9F0"
      strokeOpacity="0.55"
      strokeWidth="1"
    />

    {/* Subtle interlocking arc over left ring */}
    <path
      d="M84 37 A27 27 0 0 1 97 69"
      stroke="url(#ringGold)"
      strokeWidth="5.5"
      strokeLinecap="round"
    />
  </svg>
);

const scrollToSection = (id: string) => {
  const el = document.getElementById(id);
  if (el) {
    el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};

export const InvitationView: React.FC<InvitationViewProps> = ({
  lang,
  onToggleLang,
  musicPlaying,
  onToggleMusic,
  onReplayEnvelope,
}) => {
  const t = COPY[lang];
  const [heroEntered, setHeroEntered] = useState(false);
  const [selectedScheduleIdx, setSelectedScheduleIdx] = useState<number>(0);
  const parallaxTopRef = useRef<HTMLDivElement | null>(null);
  const parallaxBottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setHeroEntered(true));
    return () => window.cancelAnimationFrame(raf);
  }, []);

  // Lightweight GPU scroll parallax for decorative florals only
  useEffect(() => {
    const prefersReduced =
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      window.requestAnimationFrame(() => {
        const y = Math.min(window.scrollY, 500);
        if (parallaxTopRef.current) {
          parallaxTopRef.current.style.transform = `translate3d(0, ${y * 0.08}px, 0)`;
        }
        if (parallaxBottomRef.current) {
          parallaxBottomRef.current.style.transform = `translate3d(0, ${-y * 0.06}px, 0)`;
        }
        ticking = false;
      });
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const chapterIcons: GlassIconsItem[] = useMemo(
    () => [
      {
        id: 'chapter-countdown',
        icon: <CalendarHeart className="w-5 h-5" aria-hidden="true" />,
        color: 'burgundy',
        label: t.highlights.countdown,
        onClick: () => scrollToSection('countdown'),
      },
      {
        id: 'chapter-schedule',
        icon: <Clock className="w-5 h-5" aria-hidden="true" />,
        color: 'gold',
        label: t.highlights.schedule,
        onClick: () => scrollToSection('schedule'),
      },
      {
        id: 'chapter-venue',
        icon: <MapPin className="w-5 h-5" aria-hidden="true" />,
        color: 'wine',
        label: t.highlights.venue,
        onClick: () => scrollToSection('venue'),
      },
      {
        id: 'chapter-rsvp',
        icon: <HeartHandshake className="w-5 h-5" aria-hidden="true" />,
        color: 'rose',
        label: t.highlights.rsvp,
        onClick: () => scrollToSection('rsvp'),
      },
      {
        id: 'chapter-music',
        icon: musicPlaying ? (
          <Music className="w-5 h-5" aria-hidden="true" />
        ) : (
          <ListMusic className="w-5 h-5" aria-hidden="true" />
        ),
        color: 'champagne',
        label: t.highlights.music,
        onClick: onToggleMusic,
        ariaLabel: musicPlaying ? t.musicOn : t.musicOff,
      },
    ],
    [t, musicPlaying, onToggleMusic],
  );

  const scheduleItems: AnimatedListItemData[] = useMemo(() => {
    const iconMap: Record<string, React.ReactNode> = {
      welcome: <Sparkles className="w-[18px] h-[18px]" />,
      entrance: <HeartHandshake className="w-[18px] h-[18px]" />,
      dinner: <Utensils className="w-[18px] h-[18px]" />,
      cake: <CakeSlice className="w-[18px] h-[18px]" />,
      dress: <Shirt className="w-[18px] h-[18px]" />,
    };
    return t.schedule.items.map((item) => ({
      id: item.id,
      icon: iconMap[item.id] ?? <CheckCircle2 className="w-[18px] h-[18px]" />,
      title: item.title,
      description: item.description,
      meta: item.meta,
    }));
  }, [t]);

  return (
    <div className="min-h-screen bg-[#F5EBDD] paper-texture text-[#421923] relative overflow-x-hidden">
      {/* Minimal Floating Stationery Utility Controls (dir=ltr keeps physical corner placement consistent) */}
      <div
        dir="ltr"
        className="fixed top-3.5 inset-x-3.5 sm:top-5 sm:inset-x-6 z-40 flex items-center justify-between pointer-events-none"
      >
        <button
          type="button"
          onClick={onToggleMusic}
          aria-label={musicPlaying ? t.musicOn : t.musicOff}
          title={musicPlaying ? t.musicOn : t.musicOff}
          className="pointer-events-auto min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-full bg-[#FFF9F0]/92 backdrop-blur-sm border border-[#C5A46B]/75 text-[#421923] hover:bg-[#F5EBDD] active:scale-95 transition-transform flex items-center gap-2 text-xs font-medium shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46B]"
        >
          {musicPlaying ? (
            <Music className="w-4 h-4 text-[#672735] animate-pulse" aria-hidden="true" />
          ) : (
            <VolumeX className="w-4 h-4 text-[#72524C]" aria-hidden="true" />
          )}
          <span className="hidden sm:inline whitespace-nowrap">{t.musicShort}</span>
        </button>

        <button
          type="button"
          onClick={onToggleLang}
          aria-label={t.langAria}
          className="pointer-events-auto min-h-[44px] min-w-[58px] px-4 py-2 rounded-full bg-[#421923] text-[#FFF9F0] border border-[#C5A46B]/70 hover:bg-[#672735] active:scale-95 transition-transform text-xs font-medium tracking-wider shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46B] whitespace-nowrap"
        >
          {t.langToggle}
        </button>
      </div>

      {/* Main Editorial Invitation Card */}
      <main>
        <section
          aria-label={t.envelopeTitle}
          className="relative min-h-[94dvh] flex items-center justify-center px-4 sm:px-8 pt-20 pb-10 overflow-hidden"
        >
          <AmbientPetals variant="editorial" />

          <div
            className="w-full max-w-2xl"
            style={{
              opacity: heroEntered ? 1 : 0,
              transform: heroEntered
                ? 'translate3d(0, 0, 0) scale(1)'
                : 'translate3d(0, 28px, 0) scale(0.98)',
              transition:
                'opacity 850ms cubic-bezier(0.16, 1, 0.3, 1), transform 850ms cubic-bezier(0.16, 1, 0.3, 1)',
              willChange: heroEntered ? 'auto' : 'transform, opacity',
            }}
          >
            <div className="relative bg-[#FFF9F0] paper-texture border border-[#C5A46B]/80 px-6 py-12 sm:px-14 sm:py-16 shadow-[0_26px_70px_-22px_rgba(66,25,35,0.25)] overflow-hidden">
              {/* Thin Champagne Gold Inner Double Border */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-3 sm:inset-4 border border-[#C5A46B]/45"
              />

              {/* Parallax Botanical Corner Lilies (pure transparent SVG) */}
              <div
                ref={parallaxTopRef}
                className="pointer-events-none absolute -top-3 -right-3 w-36 h-36 sm:w-48 sm:h-48 opacity-90"
              >
                <CornerFloral position="top-right" className="w-full h-full" />
              </div>
              <div
                ref={parallaxBottomRef}
                className="pointer-events-none absolute -bottom-3 -left-3 w-36 h-36 sm:w-48 sm:h-48 opacity-90"
              >
                <CornerFloral position="bottom-left" className="w-full h-full" />
              </div>

              <div className="relative z-10 flex flex-col items-center text-center">
                {/* Top White Lily Garland */}
                <div className="w-full mb-3">
                  <GarlandFloral />
                </div>

                {/* Monogram */}
                <div
                  dir="ltr"
                  className="font-english-serif text-2xl sm:text-3xl tracking-[0.26em] gold-foil-text font-semibold"
                >
                  A <span className="text-[#C5A46B] text-base align-middle">✦</span> L
                </div>

                {/* Bismillah & Opening Copy with ScrollReveal */}
                <div className="mt-6 max-w-lg">
                  {lang === 'ar' ? (
                    <>
                      <ScrollReveal
                        mode="enter"
                        effect="rise"
                        splitBy="words"
                        enableBlur={false}
                        baseOpacity={0.15}
                        stagger={0.06}
                        textClassName="font-arabic-calligraphy text-2xl sm:text-[30px] text-[#421923] mb-3 [word-spacing:0.12em]"
                      >
                        {t.bismillah}
                      </ScrollReveal>
                      <ScrollReveal
                        mode="enter"
                        effect="fade"
                        splitBy="words"
                        baseOpacity={0.2}
                        blurStrength={2.5}
                        stagger={0.04}
                        textClassName="text-base sm:text-[17px] text-[#421923]/88 leading-[2.05] [word-spacing:0.12em]"
                      >
                        {t.introLine}
                      </ScrollReveal>
                    </>
                  ) : (
                    <ScrollReveal
                      mode="enter"
                      effect="fade"
                      splitBy="words"
                      baseOpacity={0.2}
                      stagger={0.05}
                      textClassName="font-english-serif italic text-lg sm:text-xl text-[#72524C] tracking-[0.06em]"
                    >
                      {t.introLine}
                    </ScrollReveal>
                  )}
                </div>

                {/* Centerpiece Couple Showcase */}
                <div className="my-9 sm:my-11 w-full">
                  {lang === 'ar' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-[1fr_auto_1fr] items-center gap-5 sm:gap-7 max-w-xl mx-auto">
                      <div className="flex flex-col items-center">
                        <span className="text-xs tracking-[0.2em] text-[#72524C] font-medium mb-1">
                          {t.groomLabel}
                        </span>
                        <h1 className="font-arabic-calligraphy font-bold text-[44px] sm:text-[54px] leading-[1.32] gold-foil-text inline-block">
                          {t.groomName}
                        </h1>
                      </div>

                      <div
                        aria-hidden="true"
                        className="flex sm:flex-col items-center justify-center gap-2"
                      >
                        <span className="w-10 sm:w-px h-px sm:h-10 bg-[#C5A46B]/65" />
                        <span className="text-[#672735] text-sm font-english-serif">
                          &amp;
                        </span>
                        <span className="w-10 sm:w-px h-px sm:h-10 bg-[#C5A46B]/65" />
                      </div>

                      <div className="flex flex-col items-center">
                        <span className="text-xs tracking-[0.2em] text-[#72524C] font-medium mb-1">
                          {t.brideLabel}
                        </span>
                        <p className="font-arabic-calligraphy font-bold text-[44px] sm:text-[54px] leading-[1.32] gold-foil-text inline-block">
                          {t.brideName}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center">
                      <h1 className="font-english-serif font-semibold text-[44px] sm:text-[64px] leading-[1.12] tracking-[0.04em] gold-foil-text inline-block">
                        {t.groomName}
                      </h1>
                      <div
                        aria-hidden="true"
                        className="my-3 flex items-center gap-4"
                      >
                        <span className="w-12 h-px bg-[#C5A46B]/65" />
                        <span className="font-english-serif italic text-3xl text-[#672735]">
                          &amp;
                        </span>
                        <span className="w-12 h-px bg-[#C5A46B]/65" />
                      </div>
                      <p className="font-english-serif font-semibold text-[44px] sm:text-[64px] leading-[1.12] tracking-[0.04em] gold-foil-text inline-block">
                        {t.brideName}
                      </p>
                    </div>
                  )}
                </div>

                {/* Ornamental Diamond Separator */}
                <div
                  aria-hidden="true"
                  className="flex items-center justify-center gap-3 mb-7"
                >
                  <span className="w-14 h-px bg-[#C5A46B]/60" />
                  <span className="w-2 h-2 rotate-45 bg-[#672735]" />
                  <span className="w-14 h-px bg-[#C5A46B]/60" />
                </div>

                {/* Secondary Editorial Prose with ScrollReveal */}
                {lang === 'ar' ? (
                  <div className="space-y-4 max-w-md">
                    <ScrollReveal
                      mode="enter"
                      effect="fade"
                      splitBy="words"
                      baseOpacity={0.2}
                      stagger={0.04}
                      textClassName="text-base sm:text-[17px] text-[#421923]/88 leading-[2] [word-spacing:0.12em]"
                    >
                      {t.closingLine}
                    </ScrollReveal>
                    <div
                      dir="ltr"
                      className="pt-2 font-english-serif text-sm sm:text-base text-[#72524C] tracking-[0.05em] leading-relaxed"
                    >
                      <p className="italic">{t.secondaryEnglishIntro}</p>
                      <p className="font-semibold text-[#421923] mt-0.5">
                        {t.secondaryEnglishNames}
                      </p>
                      <p className="italic mt-0.5">{t.secondaryEnglishClosing}</p>
                    </div>
                  </div>
                ) : (
                  <ScrollReveal
                    mode="enter"
                    effect="fade"
                    splitBy="words"
                    baseOpacity={0.2}
                    stagger={0.04}
                    textClassName="max-w-md font-english-serif italic text-lg sm:text-[21px] text-[#421923]/88 leading-relaxed tracking-[0.05em]"
                  >
                    {t.closingLine}
                  </ScrollReveal>
                )}

                <div
                  aria-hidden="true"
                  className="mt-8 w-24 h-px bg-gradient-to-r from-transparent via-[#C5A46B] to-transparent"
                />

                <p
                  dir="ltr"
                  className="mt-5 font-english-serif text-sm sm:text-base tracking-[0.24em] text-[#672735] font-semibold uppercase"
                >
                  Sunday, December 20, 2026
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* GlassIcons — Interactive Wedding Chapters Quick Dock */}
        <section
          aria-label={t.highlights.eyebrow}
          className="relative py-8 sm:py-12 px-5 sm:px-8"
        >
          <div className="max-w-3xl mx-auto text-center">
            <p className="text-xs tracking-[0.26em] uppercase text-[#C5A46B] font-medium mb-6">
              {t.highlights.eyebrow}
            </p>
            <GlassIcons
              items={chapterIcons}
              size={58}
              gap={26}
              columns={5}
              roundness={0.55}
              plate="tilt"
              tilt={14}
              hover="lift"
              labels="always"
              theme="light"
              tint="#FFF9F0"
              tintOpacity={0.32}
            />
          </div>
        </section>

        {/* Wedding Date & Live Jordan Countdown */}
        <CalendarCountdown lang={lang} />

        {/* AnimatedList — Evening Celebration Program & Guest Guide */}
        <section
          id="schedule"
          aria-labelledby="schedule-heading"
          className="relative py-16 sm:py-20 px-5 sm:px-8"
        >
          <div className="max-w-2xl mx-auto">
            <RevealOnScroll>
              <div className="text-center mb-8">
                <p className="text-xs tracking-[0.26em] uppercase text-[#C5A46B] font-medium mb-2.5">
                  {t.schedule.eyebrow}
                </p>
                <ScrollReveal
                  mode="enter"
                  effect="rise"
                  splitBy="words"
                  enableBlur={false}
                  baseOpacity={0.2}
                  stagger={0.05}
                  textClassName={`text-[#672735] ${
                    lang === 'ar'
                      ? 'font-arabic-calligraphy text-3xl sm:text-4xl'
                      : 'font-english-serif text-3xl sm:text-4xl font-medium'
                  }`}
                >
                  {t.schedule.title}
                </ScrollReveal>
                <p
                  id="schedule-heading"
                  className="mt-2.5 text-sm text-[#72524C] max-w-md mx-auto leading-relaxed"
                >
                  {t.schedule.subtitle}
                </p>
              </div>

              <AnimatedList
                items={scheduleItems}
                initialSelectedIndex={selectedScheduleIdx}
                onItemSelect={(_, index) => setSelectedScheduleIdx(index)}
                animation="pop"
                animateOnce
                theme="light"
                accentColor="#672735"
                radius={10}
                gap={10}
                width={620}
                maxHeight={460}
              />
            </RevealOnScroll>
          </div>
        </section>

        {/* Wedding Location */}
        <VenueSection lang={lang} />

        {/* RSVP — Attendance Confirmation */}
        <RsvpSection lang={lang} />

        {/* Final Closing Scene — Intertwined Rings & Warm Wishes */}
        <section
          aria-labelledby="closing-heading"
          className="relative py-16 sm:py-24 px-5 sm:px-8 overflow-hidden"
        >
          <div className="max-w-xl mx-auto">
            <RevealOnScroll>
              <div className="relative bg-[#FFF9F0] paper-texture border border-[#C5A46B]/70 px-6 py-12 sm:px-12 sm:py-16 text-center shadow-[0_22px_54px_-24px_rgba(66,25,35,0.22)] overflow-hidden">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-2.5 border border-[#C5A46B]/35"
                />

                <CornerFloral
                  position="top-right"
                  className="absolute -top-4 -right-4 w-32 h-32 sm:w-40 sm:h-40 opacity-80"
                />
                <CornerFloral
                  position="bottom-left"
                  className="absolute -bottom-4 -left-4 w-32 h-32 sm:w-40 sm:h-40 opacity-80"
                />

                <div className="relative z-10 flex flex-col items-center">
                  <IntertwinedRingsEmblem />

                  <div id="closing-heading" className="mt-5">
                    <ScrollReveal
                      mode="enter"
                      effect="rise"
                      splitBy="words"
                      enableBlur={false}
                      baseOpacity={0.2}
                      stagger={0.07}
                      textClassName={`text-[#672735] ${
                        lang === 'ar'
                          ? 'font-arabic-calligraphy text-3xl sm:text-4xl'
                          : 'font-english-serif text-3xl sm:text-4xl font-medium'
                      }`}
                    >
                      {t.closing.title}
                    </ScrollReveal>
                  </div>

                  <ScrollReveal
                    mode="enter"
                    effect="fade"
                    splitBy="words"
                    baseOpacity={0.2}
                    stagger={0.04}
                    containerClassName="mt-4 max-w-md"
                    textClassName={`text-[#421923]/88 leading-[2] ${
                      lang === 'ar'
                        ? 'text-base sm:text-[17px]'
                        : 'font-english-serif italic text-lg sm:text-xl tracking-[0.04em]'
                    }`}
                  >
                    {t.closing.body}
                  </ScrollReveal>

                  <p
                    className={`mt-7 text-[#672735] ${
                      lang === 'ar'
                        ? 'font-arabic-calligraphy text-3xl sm:text-4xl'
                        : 'font-english-serif text-3xl sm:text-4xl font-semibold tracking-wide'
                    }`}
                  >
                    {t.closing.names}
                  </p>

                  <div
                    aria-hidden="true"
                    className="my-5 flex items-center gap-3 text-[#C5A46B]"
                  >
                    <span className="w-12 h-px bg-[#C5A46B]/65" />
                    <span className="text-sm text-[#672735]">♥</span>
                    <span className="w-12 h-px bg-[#C5A46B]/65" />
                  </div>

                  <button
                    type="button"
                    onClick={onReplayEnvelope}
                    className="min-h-[48px] px-7 py-3 rounded-full bg-[#672735] hover:bg-[#421923] active:scale-[0.98] text-[#FFF9F0] border border-[#C5A46B]/70 shadow-[0_12px_26px_-10px_rgba(66,25,35,0.48)] transition-all text-sm font-medium inline-flex items-center justify-center gap-2.5 cursor-pointer whitespace-nowrap"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    <span>{t.replayEnvelope}</span>
                  </button>
                </div>
              </div>
            </RevealOnScroll>
          </div>
        </section>
      </main>

      {/* Atmospheric Wine Dusk Monogram Epilogue */}
      <footer
        className="relative py-20 px-5 text-center text-[#FFF9F0] overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 50% 35%, #672735 0%, #421923 72%, #2B0F16 100%)',
        }}
      >
        <AmbientPetals variant="dusk" />

        <div className="relative z-10 flex flex-col items-center">
          <div
            dir="ltr"
            className="font-english-serif text-4xl sm:text-5xl tracking-[0.26em] text-[#E2C894] font-medium"
          >
            A <span className="text-[#C5A46B] text-xl align-middle">✦</span> L
          </div>
          <span aria-hidden="true" className="mt-3 text-[#C5A46B] text-sm">
            ♥
          </span>
          <p className="mt-4 text-xs tracking-[0.24em] uppercase text-[#DCC8AA]/90">
            {t.closing.epilogueTag}
          </p>
          <p className="mt-1.5 text-xs tracking-[0.2em] text-[#DCC8AA]/70">
            {t.closing.epilogueDate}
          </p>
        </div>
      </footer>
    </div>
  );
};
