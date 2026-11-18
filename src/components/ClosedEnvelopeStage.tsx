import React, { useEffect, useRef, useState } from 'react';
import { Music, VolumeX } from 'lucide-react';
import { COPY, Language } from '../config/weddingConfig';
import { AmbientPetals } from './AmbientPetals';
import { CornerFloral } from './BotanicalDecor';
import { WaxSeal } from './WaxSeal';

interface ClosedEnvelopeStageProps {
  lang: Language;
  onToggleLang: () => void;
  musicPlaying: boolean;
  onToggleMusic: () => void;
  onCompleteOpen: () => void;
}

export const ClosedEnvelopeStage: React.FC<ClosedEnvelopeStageProps> = ({
  lang,
  onToggleLang,
  musicPlaying,
  onToggleMusic,
  onCompleteOpen,
}) => {
  const [isOpening, setIsOpening] = useState(false);
  const [entered, setEntered] = useState(false);
  const timerRef = useRef<number | null>(null);
  const t = COPY[lang];

  useEffect(() => {
    const raf = window.requestAnimationFrame(() => setEntered(true));
    return () => {
      window.cancelAnimationFrame(raf);
      if (timerRef.current !== null) {
        window.clearTimeout(timerRef.current);
      }
    };
  }, []);

  const handleOpen = () => {
    if (isOpening) return;
    setIsOpening(true);

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    timerRef.current = window.setTimeout(
      onCompleteOpen,
      prefersReducedMotion ? 260 : 1450,
    );
  };

  return (
    <div
      className="relative min-h-[100dvh] w-full flex items-center justify-center overflow-hidden px-0 sm:px-6 sm:py-8"
      style={{
        background:
          'radial-gradient(ellipse at 50% 42%, #FFF9F0 0%, #F5EBDD 58%, #DCC8AA 100%)',
      }}
    >
      {/* Floating golden dust & drifting burgundy petals */}
      <AmbientPetals variant="envelope" />

      {/* Soft golden light burst spreading across the screen on click */}
      {isOpening && (
        <div
          aria-hidden="true"
          className="pointer-events-none fixed inset-0 z-40 flex items-center justify-center"
        >
          <div
            className="animate-golden-burst w-72 h-72 rounded-full"
            style={{
              background:
                'radial-gradient(circle, rgba(255,249,240,0.92) 0%, rgba(197,164,107,0.5) 40%, transparent 72%)',
              willChange: 'transform, opacity',
            }}
          />
        </div>
      )}

      {/* Subtle corner utility controls positioned in unobstructed corners (top-left Music, bottom-right AR/EN) */}
      <button
        type="button"
        onClick={onToggleMusic}
        aria-label={musicPlaying ? t.musicOn : t.musicOff}
        title={musicPlaying ? t.musicOn : t.musicOff}
        style={{
          opacity: isOpening ? 0 : 1,
          transition: 'opacity 220ms ease-out',
        }}
        className="fixed top-4 left-4 sm:top-6 sm:left-6 z-50 min-h-[44px] min-w-[44px] px-3.5 py-2 rounded-full border border-[#C5A46B]/75 bg-[#FFF9F0]/95 text-[#421923] hover:bg-[#F5EBDD] active:scale-95 transition-transform flex items-center gap-2 text-xs font-medium shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46B]"
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
        style={{
          opacity: isOpening ? 0 : 1,
          transition: 'opacity 220ms ease-out',
        }}
        className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-50 min-h-[44px] min-w-[58px] px-4 py-2 rounded-full bg-[#421923] text-[#FFF9F0] border border-[#C5A46B]/70 hover:bg-[#672735] active:scale-95 transition-transform text-xs font-medium tracking-wider shadow-md cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C5A46B] whitespace-nowrap"
      >
        {t.langToggle}
      </button>

      {/* Subtle cinematic entrance + 3D Envelope Stage */}
      <div
        className="perspective-stage relative w-full sm:max-w-[440px] md:max-w-[468px] flex items-center justify-center"
        style={{
          opacity: entered ? 1 : 0,
          transform: entered ? 'translate3d(0, 0, 0) scale(1)' : 'translate3d(0, 18px, 0) scale(0.98)',
          transition: 'opacity 650ms cubic-bezier(0.16, 1, 0.3, 1), transform 650ms cubic-bezier(0.16, 1, 0.3, 1)',
          willChange: 'transform, opacity',
        }}
      >
        {/* Physical Envelope Body */}
        <div
          className="relative w-full min-h-[100dvh] sm:min-h-[690px] sm:h-[85dvh] sm:max-h-[820px] sm:rounded-[8px] preserve-3d shadow-[0_28px_70px_-20px_rgba(66,25,35,0.34)]"
          style={{
            transform: isOpening ? 'translate3d(0, 14%, 0)' : 'translate3d(0, 0, 0)',
            opacity: isOpening ? 0 : 1,
            transition: isOpening
              ? 'transform 820ms cubic-bezier(0.16, 1, 0.3, 1) 400ms, opacity 320ms ease-out 1120ms'
              : 'none',
            willChange: 'transform, opacity',
          }}
        >
          {/* 1. Deep Burgundy Inner Envelope Lining (visible as flap unfolds!) */}
          <div
            aria-hidden="true"
            className="absolute inset-0 sm:rounded-[8px] overflow-hidden border border-[#C5A46B]/70"
            style={{
              zIndex: 2,
              background:
                'radial-gradient(ellipse at 50% 35%, #672735 0%, #421923 80%)',
            }}
          >
            <div className="absolute inset-3 border border-[#C5A46B]/35 pointer-events-none" />
          </div>

          {/* 2. Inner Cream Invitation Card — Smoothly rises upward out of burgundy pocket */}
          <div
            aria-hidden="true"
            className="absolute left-[7%] right-[7%] top-[14%] bottom-[10%] bg-[#FFF9F0] paper-texture border border-[#C5A46B]/80 shadow-[0_20px_45px_rgba(66,25,35,0.28)] flex flex-col items-center justify-start pt-10 px-6 text-center overflow-hidden"
            style={{
              zIndex: 6,
              transform: isOpening
                ? 'translate3d(0, -56%, 0) scale(1.03)'
                : 'translate3d(0, 6%, 0) scale(0.97)',
              opacity: isOpening ? 1 : 0,
              transition:
                'transform 820ms cubic-bezier(0.16, 1, 0.3, 1) 420ms, opacity 260ms ease-out 280ms',
              willChange: 'transform, opacity',
            }}
          >
            <div className="absolute inset-2.5 border border-[#C5A46B]/45 pointer-events-none" />
            <CornerFloral
              position="top-right"
              className="absolute -top-3 -right-3 w-36 h-36 opacity-85"
            />
            <div
              dir="ltr"
              className="relative z-10 font-english-serif text-3xl tracking-[0.26em] gold-foil-text font-semibold mt-4 mb-3"
            >
              A <span className="text-[#C5A46B] text-base align-middle">✦</span> L
            </div>
            <div className="relative z-10 w-20 h-px bg-[#C5A46B]/60 mb-4" />
            <p
              className={`relative z-10 text-[#672735] ${
                lang === 'ar'
                  ? 'font-arabic-calligraphy text-2xl'
                  : 'font-english-serif text-xl italic'
              }`}
            >
              {t.bismillah}
            </p>
          </div>

          {/* 3. Lower & Side Pocket Face (warm handmade ivory paper) */}
          <div
            className="absolute inset-0 bg-[#F5EBDD] paper-texture sm:rounded-[8px] overflow-hidden flex flex-col justify-end"
            style={{
              zIndex: 12,
              clipPath: isOpening
                ? 'polygon(0% 34%, 50% 51%, 100% 34%, 100% 100%, 0% 100%)'
                : 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
            }}
          >
            {/* Subtle vertical center fold crease */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[5px] paper-fold-crease z-10"
            />

            {/* Champagne gold border frame */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-3.5 sm:inset-5 border border-[#C5A46B]/80 z-10"
            />

            {/* Diagonal folded pocket seams */}
            <svg
              aria-hidden="true"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
              className="pointer-events-none absolute inset-0 w-full h-full z-10 opacity-45"
            >
              <path
                d="M0 100 L50 50 L100 100"
                fill="none"
                stroke="#C5A46B"
                strokeWidth="0.32"
              />
            </svg>

            {/* Lower-left white lily floral arrangement */}
            <CornerFloral
              position="bottom-left"
              className="absolute -bottom-3 -left-3 w-48 h-48 sm:w-60 sm:h-60 z-10"
            />

            {/* Lower instruction prompt */}
            <div
              className="relative z-20 flex flex-col items-center pb-20 sm:pb-16 px-8 text-center"
              style={{
                opacity: isOpening ? 0 : 1,
                transform: isOpening ? 'translate3d(0, 8px, 0)' : 'translate3d(0, 0, 0)',
                transition: 'opacity 200ms ease-out, transform 200ms ease-out',
              }}
            >
              <p
                className={`${
                  lang === 'ar'
                    ? 'font-arabic-calligraphy text-[22px] sm:text-2xl text-[#421923]'
                    : 'font-english-serif text-lg sm:text-xl italic text-[#421923] tracking-[0.04em]'
                }`}
              >
                {t.sealHint}
              </p>

              {/* Ornamental diamond divider below prompt */}
              <div
                aria-hidden="true"
                className="mt-3 flex items-center gap-2.5"
              >
                <span className="w-10 h-px bg-[#C5A46B]/75" />
                <span className="w-1.5 h-1.5 rotate-45 bg-[#672735]" />
                <span className="w-10 h-px bg-[#C5A46B]/75" />
              </div>
            </div>
          </div>

          {/* 4. 3D Hinged Top V-Flap (carries دعوة زفاف, A ✦ L, & upper-right lilies) */}
          <div
            className="absolute inset-0 origin-top preserve-3d pointer-events-none"
            style={{
              zIndex: isOpening ? 4 : 18,
              transform: isOpening ? 'rotateX(174deg)' : 'rotateX(0deg)',
              transition:
                'transform 720ms cubic-bezier(0.22, 1, 0.36, 1) 140ms, z-index 1ms linear 420ms',
              willChange: 'transform',
            }}
          >
            {/* Outer face of Top Flap */}
            <div
              className="absolute inset-0 backface-hidden bg-[#F5EBDD] paper-texture sm:rounded-t-[8px] overflow-hidden flex flex-col items-center pt-16 sm:pt-20 px-8 text-center"
              style={{
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 34%, 50% 51%, 0% 34%)',
              }}
            >
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-[5px] paper-fold-crease z-10"
              />
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-3.5 sm:inset-5 border-t border-x border-[#C5A46B]/80 z-10"
              />

              {/* Subtle V-flap seam line */}
              <svg
                aria-hidden="true"
                viewBox="0 0 100 100"
                preserveAspectRatio="none"
                className="pointer-events-none absolute inset-0 w-full h-full z-10 opacity-50"
              >
                <path
                  d="M0 34 L50 51 L100 34"
                  fill="none"
                  stroke="#C5A46B"
                  strokeWidth="0.4"
                />
              </svg>

              {/* Upper-right white lily floral arrangement */}
              <CornerFloral
                position="top-right"
                className="absolute -top-3 -right-3 w-48 h-48 sm:w-60 sm:h-60 z-10"
              />

              {/* Invitation Label: دعوة زفاف + A ✦ L */}
              <div className="relative z-20 flex flex-col items-center">
                <h1
                  className={`text-[#421923] ${
                    lang === 'ar'
                      ? 'font-arabic-calligraphy text-3xl sm:text-[34px] leading-relaxed'
                      : 'font-english-serif text-xl sm:text-2xl font-semibold tracking-[0.18em] uppercase'
                  }`}
                >
                  {t.envelopeTitle}
                </h1>

                <div
                  aria-hidden="true"
                  className="w-24 h-px mt-2.5 mb-5 bg-gradient-to-r from-transparent via-[#C5A46B] to-transparent"
                />

                <div
                  dir="ltr"
                  className="font-english-serif text-[44px] sm:text-[50px] leading-none font-medium tracking-[0.18em] flex items-center justify-center gap-3 select-none"
                >
                  <span className="gold-foil-text">{t.monogramLeft}</span>
                  <span aria-hidden="true" className="text-[#C5A46B] text-xl">
                    ✦
                  </span>
                  <span className="gold-foil-text">{t.monogramRight}</span>
                </div>
              </div>
            </div>

            {/* Inner Burgundy Lining of Top Flap */}
            <div
              aria-hidden="true"
              className="absolute inset-0 backface-hidden"
              style={{
                transform: 'rotateX(180deg)',
                clipPath: 'polygon(0% 0%, 100% 0%, 100% 34%, 50% 51%, 0% 34%)',
                background: 'linear-gradient(180deg, #421923 0%, #672735 100%)',
              }}
            />
          </div>

          {/* 5. Champagne Gold Horizontal Ribbon + Interactive Burgundy Tree Wax Seal */}
          <div
            className="absolute inset-x-0 top-[50%] -translate-y-1/2 flex items-center justify-center"
            style={{ zIndex: 30 }}
          >
            {/* Horizontal Champagne Gold Satin Ribbon */}
            <div
              aria-hidden="true"
              className="absolute inset-x-0 top-1/2 -translate-y-1/2 h-9 sm:h-10 champagne-ribbon"
              style={{
                opacity: isOpening ? 0 : 1,
                transform: isOpening ? 'scaleX(1.12)' : 'scaleX(1)',
                transition: 'opacity 260ms ease-out 60ms, transform 320ms ease-out 60ms',
                willChange: 'transform, opacity',
              }}
            />

            {/* Interactive Burgundy Wax Seal with Gold Botanical Tree */}
            <div className="relative z-10">
              <WaxSeal
                isOpening={isOpening}
                onPress={handleOpen}
                ariaLabel={t.sealHint}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
