import React, { useEffect, useMemo, useState } from 'react';
import { Calendar } from 'lucide-react';
import {
  COPY,
  Language,
  WEDDING_TARGET_ISO,
} from '../config/weddingConfig';
import { RevealOnScroll } from './RevealOnScroll';

interface CalendarCountdownProps {
  lang: Language;
}

interface TimeRemaining {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  isPast: boolean;
}

function computeRemaining(targetMs: number): TimeRemaining {
  const diff = targetMs - Date.now();
  if (diff <= 0) {
    return { days: 0, hours: 0, minutes: 0, seconds: 0, isPast: true };
  }
  const days = Math.floor(diff / 86_400_000);
  const hours = Math.floor((diff % 86_400_000) / 3_600_000);
  const minutes = Math.floor((diff % 3_600_000) / 60_000);
  const seconds = Math.floor((diff % 60_000) / 1_000);
  return { days, hours, minutes, seconds, isPast: false };
}

const DEC_2026_DAYS: (number | null)[] = [
  null,
  null,
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  null,
  null,
];

const WEEKDAYS_EN = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];
const WEEKDAYS_AR = ['أح', 'إث', 'ثل', 'أر', 'خم', 'جم', 'سب'];

export const CalendarCountdown: React.FC<CalendarCountdownProps> = ({
  lang,
}) => {
  const t = COPY[lang];
  const targetMs = useMemo(() => new Date(WEDDING_TARGET_ISO).getTime(), []);
  const [remaining, setRemaining] = useState<TimeRemaining>(() =>
    computeRemaining(targetMs),
  );

  useEffect(() => {
    setRemaining(computeRemaining(targetMs));
    const timer = window.setInterval(() => {
      setRemaining(computeRemaining(targetMs));
    }, 1000);
    return () => window.clearInterval(timer);
  }, [targetMs]);

  const units = [
    { key: 'days', value: remaining.days, label: t.countdown.days },
    { key: 'hours', value: remaining.hours, label: t.countdown.hours },
    { key: 'minutes', value: remaining.minutes, label: t.countdown.minutes },
    { key: 'seconds', value: remaining.seconds, label: t.countdown.seconds },
  ];

  const weekdays = lang === 'ar' ? WEEKDAYS_AR : WEEKDAYS_EN;

  return (
    <section
      id="countdown"
      aria-labelledby="wedding-date-heading"
      className="relative py-16 sm:py-24 px-5 sm:px-8"
    >
      <div className="max-w-3xl mx-auto">
        <RevealOnScroll>
          <div className="relative bg-[#FFF9F0] paper-texture border border-[#C5A46B]/65 px-6 py-10 sm:px-12 sm:py-14 shadow-[0_18px_48px_-24px_rgba(66,25,35,0.2)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-2.5 sm:inset-3.5 border border-[#C5A46B]/35"
            />

            <div className="relative z-10 text-center">
              <div className="inline-flex items-center justify-center gap-2 text-xs tracking-[0.26em] uppercase text-[#C5A46B] font-medium mb-3">
                <Calendar className="w-3.5 h-3.5 text-[#672735]" aria-hidden="true" />
                <span>{t.dateEyebrow}</span>
              </div>

              <h2
                id="wedding-date-heading"
                dir="ltr"
                className="font-english-serif text-3xl sm:text-5xl font-medium tracking-[0.12em] text-[#672735]"
              >
                {t.dateHeadlineEn}
              </h2>

              <p
                className={`mt-3 text-lg sm:text-2xl text-[#421923] ${
                  lang === 'ar'
                    ? 'font-arabic-calligraphy text-2xl sm:text-[28px]'
                    : 'font-english-serif italic'
                }`}
              >
                {t.dateFull}
              </p>

              {/* Decorative December 2026 Mini Calendar */}
              <div className="mt-8 mb-10 max-w-[310px] mx-auto pt-5 pb-5 px-5 border-y border-[#C5A46B]/40 bg-[#F5EBDD]/55">
                <div className="flex items-center justify-between mb-3.5">
                  <span className="text-xs font-medium tracking-[0.14em] uppercase text-[#72524C]">
                    {t.calendarMonth}
                  </span>
                  <span
                    aria-hidden="true"
                    className="text-xs text-[#C5A46B] font-english-serif font-medium"
                  >
                    20 · 12 · 2026
                  </span>
                </div>

                <div className="grid grid-cols-7 gap-y-2 text-center">
                  {weekdays.map((day, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-medium text-[#72524C]/80 pb-1"
                    >
                      {day}
                    </span>
                  ))}

                  {DEC_2026_DAYS.map((day, idx) => {
                    const isWeddingDay = day === 20;
                    if (!day) {
                      return <span key={idx} className="h-8" />;
                    }
                    return (
                      <div
                        key={idx}
                        className="flex items-center justify-center h-8"
                      >
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-xs tabular-nums ${
                            isWeddingDay
                              ? 'bg-[#672735] text-[#FFF9F0] font-semibold ring-2 ring-[#C5A46B]/75 ring-offset-2 ring-offset-[#F5EBDD] shadow-sm'
                              : 'text-[#421923]/80 font-normal'
                          }`}
                        >
                          {day}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              <p className="text-xs tracking-[0.2em] uppercase text-[#72524C] mb-4">
                {t.countdown.eyebrow}
              </p>

              {remaining.isPast ? (
                <p
                  className={`py-4 text-2xl text-[#672735] ${
                    lang === 'ar'
                      ? 'font-arabic-calligraphy'
                      : 'font-english-serif italic'
                  }`}
                >
                  {t.countdown.arrived}
                </p>
              ) : (
                <div
                  dir="ltr"
                  className="grid grid-cols-4 gap-2.5 sm:gap-5 max-w-lg mx-auto"
                >
                  {units.map((unit) => (
                    <div
                      key={unit.key}
                      className="flex flex-col items-center justify-center py-4 px-2 bg-[#F5EBDD]/65 border border-[#C5A46B]/60 shadow-[inset_0_1px_0_rgba(255,249,240,0.9)]"
                    >
                      <span
                        key={`${unit.key}-${unit.value}`}
                        className="animate-digit-settle font-english-serif text-3xl sm:text-4xl font-semibold text-[#672735] tabular-nums leading-none"
                      >
                        {String(unit.value).padStart(2, '0')}
                      </span>
                      <span className="mt-2 text-[11px] sm:text-xs font-medium text-[#72524C] tracking-wide">
                        {unit.label}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <p className="mt-5 text-xs text-[#72524C]/85">
                {t.timezoneNote}
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
