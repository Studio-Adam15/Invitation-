import { useEffect, useState } from 'react';
import { ClosedEnvelopeStage } from './components/ClosedEnvelopeStage';
import { InvitationView } from './components/InvitationView';
import { Language } from './config/weddingConfig';
import { musicEngine } from './utils/musicEngine';

const SESSION_OPENED_KEY = 'ayoub_linda_envelope_opened';

export default function App() {
  const [lang, setLang] = useState<Language>('ar');
  const [isOpened, setIsOpened] = useState<boolean>(() => {
    try {
      return window.sessionStorage.getItem(SESSION_OPENED_KEY) === '1';
    } catch {
      return false;
    }
  });
  const [musicPlaying, setMusicPlaying] = useState<boolean>(() =>
    musicEngine.isPlaying(),
  );

  // Sync HTML lang and RTL/LTR direction without page reload
  useEffect(() => {
    const html = document.documentElement;
    html.lang = lang;
    html.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  // Keep React music state synced with audio engine
  useEffect(() => {
    return musicEngine.subscribe(setMusicPlaying);
  }, []);

  const handleToggleLang = () => {
    setLang((prev) => (prev === 'ar' ? 'en' : 'ar'));
  };

  // Music starts ONLY when the visitor explicitly enables it via the Music control
  const handleToggleMusic = () => {
    void musicEngine.toggle();
  };

  const handleCompleteOpen = () => {
    try {
      window.sessionStorage.setItem(SESSION_OPENED_KEY, '1');
    } catch {
      // Ignore storage failures in restricted contexts
    }
    setIsOpened(true);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  const handleReplayEnvelope = () => {
    try {
      window.sessionStorage.removeItem(SESSION_OPENED_KEY);
    } catch {
      // Ignore storage failures
    }
    setIsOpened(false);
    window.scrollTo({ top: 0, behavior: 'auto' });
  };

  if (!isOpened) {
    return (
      <ClosedEnvelopeStage
        lang={lang}
        onToggleLang={handleToggleLang}
        musicPlaying={musicPlaying}
        onToggleMusic={handleToggleMusic}
        onCompleteOpen={handleCompleteOpen}
      />
    );
  }

  return (
    <InvitationView
      lang={lang}
      onToggleLang={handleToggleLang}
      musicPlaying={musicPlaying}
      onToggleMusic={handleToggleMusic}
      onReplayEnvelope={handleReplayEnvelope}
    />
  );
}
