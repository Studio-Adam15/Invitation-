import React from 'react';
import { Clock, ExternalLink, MapPin } from 'lucide-react';
import {
  COPY,
  Language,
  WEDDING_VENUE_CONFIG,
} from '../config/weddingConfig';
import { RevealOnScroll } from './RevealOnScroll';

interface VenueSectionProps {
  lang: Language;
}

export const VenueSection: React.FC<VenueSectionProps> = ({ lang }) => {
  const t = COPY[lang];
  const v = WEDDING_VENUE_CONFIG;

  const venueName = lang === 'ar' ? v.nameAr : v.nameEn;
  const venueAddress = lang === 'ar' ? v.addressAr : v.addressEn;
  const venueTime = lang === 'ar' ? v.eventTimeAr : v.eventTimeEn;

  return (
    <section
      id="venue"
      aria-labelledby="venue-heading"
      className="relative py-20 sm:py-24 px-5 sm:px-8 bg-[#672735] text-[#FFF9F0] overflow-hidden"
      style={{
        backgroundImage:
          'linear-gradient(180deg, #672735 0%, #421923 100%)',
      }}
    >
      {/* Subtle animated ambient radial light */}
      <div
        aria-hidden="true"
        className="animate-venue-ambient pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[520px] h-[360px] rounded-full"
        style={{
          background:
            'radial-gradient(circle, rgba(197,164,107,0.22) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <RevealOnScroll>
          <p className="text-xs tracking-[0.26em] uppercase text-[#DCC8AA] font-medium mb-3">
            {t.venue.eyebrow}
          </p>

          <h2
            id="venue-heading"
            className={`text-[#FFF9F0] ${
              lang === 'ar'
                ? 'font-arabic-calligraphy text-3xl sm:text-4xl'
                : 'font-english-serif text-3xl sm:text-4xl font-medium tracking-wide'
            }`}
          >
            {t.venue.title}
          </h2>

          <div
            aria-hidden="true"
            className="flex items-center justify-center gap-3 my-6"
          >
            <span className="w-12 h-px bg-[#C5A46B]/55" />
            <span className="text-[#C5A46B] text-sm">✦</span>
            <span className="w-12 h-px bg-[#C5A46B]/55" />
          </div>

          <div className="relative border border-[#C5A46B]/60 bg-[#421923]/65 px-6 py-10 sm:px-10 sm:py-12 shadow-[0_24px_60px_-24px_rgba(0,0,0,0.45)]">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-2 border border-[#C5A46B]/25"
            />

            {!v.isAnnounced ? (
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-12 h-12 rounded-full border border-[#C5A46B]/65 bg-[#672735]/60 flex items-center justify-center mb-5 text-[#E2C894]">
                  <MapPin className="w-5 h-5" aria-hidden="true" />
                </div>

                <p
                  className={`text-[#FFF9F0] leading-relaxed ${
                    lang === 'ar'
                      ? 'font-arabic-calligraphy text-2xl sm:text-[28px]'
                      : 'font-english-serif text-2xl sm:text-[28px] italic'
                  }`}
                >
                  {t.venue.tbaPrimary}
                </p>

                <p
                  className={`mt-2 text-[#DCC8AA]/85 text-sm sm:text-base ${
                    lang === 'ar'
                      ? 'font-english-serif italic'
                      : 'font-arabic-calligraphy text-lg'
                  }`}
                >
                  {t.venue.tbaSecondary}
                </p>

                <p className="mt-5 max-w-md text-xs sm:text-sm text-[#F5EBDD]/75 leading-relaxed">
                  {t.venue.tbaNote}
                </p>
              </div>
            ) : (
              <div className="relative z-10 flex flex-col items-center space-y-4">
                {venueName && (
                  <h3
                    className={`text-2xl sm:text-3xl text-[#FFF9F0] ${
                      lang === 'ar'
                        ? 'font-arabic-calligraphy'
                        : 'font-english-serif font-medium'
                    }`}
                  >
                    {venueName}
                  </h3>
                )}

                {venueTime && (
                  <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-[#F5EBDD]">
                    <Clock className="w-4 h-4 text-[#C5A46B]" aria-hidden="true" />
                    <span>
                      {t.venue.timeLabel}: {venueTime}
                    </span>
                  </div>
                )}

                {venueAddress && (
                  <div className="flex items-center justify-center gap-2 text-sm sm:text-base text-[#DCC8AA]">
                    <MapPin className="w-4 h-4 text-[#C5A46B]" aria-hidden="true" />
                    <span>{venueAddress}</span>
                  </div>
                )}

                {v.googleMapsUrl && (
                  <div className="pt-3">
                    <a
                      href={v.googleMapsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 min-h-[44px] px-6 py-2.5 border border-[#C5A46B] bg-[#FFF9F0] text-[#421923] hover:bg-[#F5EBDD] transition-colors text-sm font-medium whitespace-nowrap"
                    >
                      <span>{t.venue.openMap}</span>
                      <ExternalLink className="w-4 h-4" aria-hidden="true" />
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
