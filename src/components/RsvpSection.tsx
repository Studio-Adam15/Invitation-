import React, { useState } from 'react';
import { Check, Copy, Heart, Minus, Plus, Send } from 'lucide-react';
import { COPY, Language, RSVP_CONFIG } from '../config/weddingConfig';
import { CornerFloral } from './BotanicalDecor';
import { RevealOnScroll } from './RevealOnScroll';

interface RsvpSectionProps {
  lang: Language;
}

type AttendanceChoice = 'yes' | 'no';

export const RsvpSection: React.FC<RsvpSectionProps> = ({ lang }) => {
  const t = COPY[lang];

  const [guestName, setGuestName] = useState('');
  const [attendance, setAttendance] = useState<AttendanceChoice>('yes');
  const [guestCount, setGuestCount] = useState(1);
  const [note, setNote] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [submittedMode, setSubmittedMode] = useState<
    null | 'unconfigured' | 'live'
  >(null);
  const [copied, setCopied] = useState(false);

  const buildFormattedMessage = () => {
    const trimmedName = guestName.trim();
    const trimmedNote = note.trim();
    if (lang === 'ar') {
      const status =
        attendance === 'yes'
          ? `${t.rsvp.attendingYes} (${guestCount} ${
              guestCount === 1 ? t.rsvp.guestsUnit : t.rsvp.guestsPlural
            })`
          : t.rsvp.attendingNo;
      return [
        'رد دعوة زفاف أيوب وليندا (20 ديسمبر 2026)',
        `الاسم: ${trimmedName}`,
        `الحضور: ${status}`,
        trimmedNote ? `رسالة: ${trimmedNote}` : null,
      ]
        .filter(Boolean)
        .join('\n');
    }

    const status =
      attendance === 'yes'
        ? `${t.rsvp.attendingYes} (${guestCount} ${
            guestCount === 1 ? t.rsvp.guestsUnit : t.rsvp.guestsPlural
          })`
        : t.rsvp.attendingNo;
    return [
      'Wedding RSVP — Ayoub & Linda (December 20, 2026)',
      `Name: ${trimmedName}`,
      `Attendance: ${status}`,
      trimmedNote ? `Message: ${trimmedNote}` : null,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting || hasSubmitted) return;

    setErrorMsg('');

    if (!guestName.trim()) {
      setErrorMsg(t.rsvp.errorNameRequired);
      return;
    }

    if (RSVP_CONFIG.mode === 'unconfigured') {
      setHasSubmitted(true);
      setSubmittedMode('unconfigured');
      return;
    }

    if (RSVP_CONFIG.mode === 'whatsapp' && RSVP_CONFIG.whatsappNumber) {
      setHasSubmitted(true);
      const encoded = encodeURIComponent(buildFormattedMessage());
      const cleanNumber = RSVP_CONFIG.whatsappNumber.replace(/[^\d]/g, '');
      window.open(
        `https://wa.me/${cleanNumber}?text=${encoded}`,
        '_blank',
        'noopener,noreferrer',
      );
      setSubmittedMode('live');
      return;
    }

    if (RSVP_CONFIG.mode === 'webhook' && RSVP_CONFIG.webhookUrl) {
      setIsSubmitting(true);
      try {
        const res = await fetch(RSVP_CONFIG.webhookUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            guestName: guestName.trim(),
            attending: attendance === 'yes',
            guestCount: attendance === 'yes' ? guestCount : 0,
            note: note.trim(),
            language: lang,
          }),
        });
        if (!res.ok) {
          throw new Error('Request failed');
        }
        setHasSubmitted(true);
        setSubmittedMode('live');
      } catch {
        setErrorMsg(t.rsvp.errorNetwork);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(buildFormattedMessage());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2200);
    } catch {
      // Clipboard blocked silently
    }
  };

  const handleReset = () => {
    setHasSubmitted(false);
    setSubmittedMode(null);
    setCopied(false);
    setErrorMsg('');
  };

  return (
    <section
      id="rsvp"
      aria-labelledby="rsvp-heading"
      className="relative py-16 sm:py-24 px-5 sm:px-8"
    >
      <div className="max-w-xl mx-auto">
        <RevealOnScroll>
          <div className="relative bg-[#FFF9F0] paper-texture border border-[#C5A46B]/70 px-6 py-10 sm:px-10 sm:py-12 shadow-[0_22px_54px_-24px_rgba(66,25,35,0.22)] overflow-hidden">
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-2.5 border border-[#C5A46B]/35"
            />

            <CornerFloral
              position="top-right"
              className="absolute -top-4 -right-4 w-32 h-32 sm:w-40 sm:h-40 opacity-75"
            />
            <CornerFloral
              position="bottom-left"
              className="absolute -bottom-4 -left-4 w-32 h-32 sm:w-40 sm:h-40 opacity-75"
            />

            <div className="relative z-10 text-center mb-8">
              <p className="text-xs tracking-[0.26em] uppercase text-[#C5A46B] font-medium mb-2.5">
                {t.rsvp.eyebrow}
              </p>
              <h2
                id="rsvp-heading"
                className={`text-[#672735] ${
                  lang === 'ar'
                    ? 'font-arabic-calligraphy text-3xl sm:text-4xl'
                    : 'font-english-serif text-3xl sm:text-4xl font-medium'
                }`}
              >
                {t.rsvp.title}
              </h2>
              <p className="mt-2.5 text-sm text-[#72524C] leading-relaxed">
                {t.rsvp.subtitle}
              </p>
            </div>

            {submittedMode ? (
              <div className="relative z-10 space-y-5 text-center">
                <div className="p-6 bg-[#F5EBDD]/85 border border-[#C5A46B]/60">
                  <div className="w-11 h-11 rounded-full bg-[#672735] text-[#FFF9F0] flex items-center justify-center mx-auto mb-3.5 shadow-sm">
                    <Heart className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <h3
                    className={`text-2xl text-[#672735] mb-2 ${
                      lang === 'ar'
                        ? 'font-arabic-calligraphy text-3xl'
                        : 'font-english-serif font-semibold'
                    }`}
                  >
                    {t.rsvp.thankYouTitle}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#421923]/85 leading-relaxed">
                    {submittedMode === 'live'
                      ? t.rsvp.liveSuccessBody
                      : t.rsvp.previewNoticeBody}
                  </p>
                </div>

                <pre className="text-start whitespace-pre-wrap font-body text-xs sm:text-sm text-[#421923] bg-white/80 border border-[#C5A46B]/45 p-4 leading-relaxed">
                  {buildFormattedMessage()}
                </pre>

                <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
                  <button
                    type="button"
                    onClick={handleCopy}
                    className="w-full sm:w-auto min-h-[46px] px-6 py-2.5 bg-[#672735] text-[#FFF9F0] hover:bg-[#421923] active:scale-[0.98] transition-all text-sm font-medium inline-flex items-center justify-center gap-2 cursor-pointer whitespace-nowrap"
                  >
                    {copied ? (
                      <Check className="w-4 h-4" aria-hidden="true" />
                    ) : (
                      <Copy className="w-4 h-4" aria-hidden="true" />
                    )}
                    <span>
                      {copied ? t.rsvp.copiedResponse : t.rsvp.copyResponse}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={handleReset}
                    className="w-full sm:w-auto min-h-[46px] px-5 py-2.5 border border-[#C5A46B]/75 text-[#421923] hover:bg-[#DCC8AA]/40 transition-colors text-sm font-medium cursor-pointer whitespace-nowrap"
                  >
                    {t.rsvp.editResponse}
                  </button>
                </div>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="relative z-10 space-y-6"
              >
                <div>
                  <label
                    htmlFor="rsvp-guest-name"
                    className="block text-xs sm:text-sm font-medium text-[#421923] mb-2"
                  >
                    {t.rsvp.nameLabel}
                  </label>
                  <input
                    id="rsvp-guest-name"
                    type="text"
                    required
                    value={guestName}
                    onChange={(e) => {
                      setGuestName(e.target.value);
                      if (errorMsg) setErrorMsg('');
                    }}
                    placeholder={t.rsvp.namePlaceholder}
                    className="w-full min-h-[48px] px-4 py-2.5 bg-white/85 border border-[#C5A46B]/60 text-[#421923] placeholder:text-[#72524C]/55 text-sm sm:text-base focus:outline-none focus:border-[#672735] focus:ring-1 focus:ring-[#672735] transition-colors"
                  />
                </div>

                <div>
                  <span className="block text-xs sm:text-sm font-medium text-[#421923] mb-2">
                    {t.rsvp.attendanceLabel}
                  </span>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setAttendance('yes')}
                      aria-pressed={attendance === 'yes'}
                      className={`min-h-[48px] px-3 py-2.5 border text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                        attendance === 'yes'
                          ? 'bg-[#672735] text-[#FFF9F0] border-[#672735] shadow-sm'
                          : 'bg-white/65 text-[#421923] border-[#C5A46B]/60 hover:border-[#672735]/60'
                      }`}
                    >
                      {attendance === 'yes' && (
                        <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                      )}
                      <span>{t.rsvp.attendingYes}</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => setAttendance('no')}
                      aria-pressed={attendance === 'no'}
                      className={`min-h-[48px] px-3 py-2.5 border text-xs sm:text-sm font-medium inline-flex items-center justify-center gap-2 transition-colors cursor-pointer ${
                        attendance === 'no'
                          ? 'bg-[#421923] text-[#FFF9F0] border-[#421923] shadow-sm'
                          : 'bg-white/65 text-[#421923] border-[#C5A46B]/60 hover:border-[#421923]/60'
                      }`}
                    >
                      {attendance === 'no' && (
                        <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
                      )}
                      <span>{t.rsvp.attendingNo}</span>
                    </button>
                  </div>
                </div>

                {attendance === 'yes' && (
                  <div>
                    <span className="block text-xs sm:text-sm font-medium text-[#421923] mb-2">
                      {t.rsvp.guestsLabel}
                    </span>
                    <div className="flex items-center justify-between bg-white/80 border border-[#C5A46B]/60 px-3 py-1.5">
                      <button
                        type="button"
                        onClick={() => setGuestCount((c) => Math.max(1, c - 1))}
                        disabled={guestCount <= 1}
                        aria-label="Decrease guests"
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#421923] hover:bg-[#DCC8AA]/40 disabled:opacity-35 transition-colors cursor-pointer"
                      >
                        <Minus className="w-4 h-4" />
                      </button>

                      <span className="text-sm sm:text-base font-medium text-[#672735] tabular-nums">
                        {guestCount}{' '}
                        {guestCount === 1
                          ? t.rsvp.guestsUnit
                          : t.rsvp.guestsPlural}
                      </span>

                      <button
                        type="button"
                        onClick={() => setGuestCount((c) => Math.min(8, c + 1))}
                        disabled={guestCount >= 8}
                        aria-label="Increase guests"
                        className="min-h-[44px] min-w-[44px] flex items-center justify-center text-[#421923] hover:bg-[#DCC8AA]/40 disabled:opacity-35 transition-colors cursor-pointer"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                <div>
                  <label
                    htmlFor="rsvp-note"
                    className="block text-xs sm:text-sm font-medium text-[#421923] mb-2"
                  >
                    {t.rsvp.noteLabel}
                  </label>
                  <textarea
                    id="rsvp-note"
                    rows={3}
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    placeholder={t.rsvp.notePlaceholder}
                    className="w-full px-4 py-3 bg-white/85 border border-[#C5A46B]/60 text-[#421923] placeholder:text-[#72524C]/55 text-sm focus:outline-none focus:border-[#672735] focus:ring-1 focus:ring-[#672735] transition-colors resize-none"
                  />
                </div>

                {errorMsg && (
                  <p
                    role="alert"
                    className="text-xs sm:text-sm text-[#672735] font-medium text-center"
                  >
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full min-h-[50px] px-6 py-3 bg-[#672735] hover:bg-[#421923] active:scale-[0.99] text-[#FFF9F0] border border-[#C5A46B]/70 shadow-[0_12px_24px_-10px_rgba(66,25,35,0.45)] transition-all text-sm sm:text-base font-medium flex items-center justify-center gap-2.5 cursor-pointer disabled:opacity-60"
                >
                  <Send className="w-4 h-4" aria-hidden="true" />
                  <span>
                    {isSubmitting ? t.rsvp.submitting : t.rsvp.submitButton}
                  </span>
                </button>
              </form>
            )}
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
