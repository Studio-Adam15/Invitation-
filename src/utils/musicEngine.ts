/**
 * Dual-mode romantic instrumental music engine.
 * 1. Checks if an optional `/audio/wedding-theme.mp3` exists and plays cleanly.
 * 2. If absent or unplayable, seamlessly performs a gentle romantic Web Audio
 *    harp & piano arpeggio progression (D major / B minor) with soft echo.
 * Never autoplays prior to explicit user interaction.
 */

const OPTIONAL_AUDIO_SRC = '/audio/wedding-theme.mp3';

// Gentle romantic progression in D major (Hz)
const PROGRESSION: number[][] = [
  // Dmaj9: D3, A3, E4, F#4, A4, D5
  [146.83, 220.0, 329.63, 369.99, 440.0, 587.33],
  // Bm7: B2, F#3, A3, D4, F#4, B4
  [123.47, 185.0, 220.0, 293.66, 369.99, 493.88],
  // Gmaj7: G2, D3, F#3, B3, D4, G4
  [98.0, 146.83, 185.0, 246.94, 293.66, 392.0],
  // A6sus4 -> A7: A2, E3, G3, C#4, E4, A4
  [110.0, 164.81, 196.0, 277.18, 329.63, 440.0],
];

class WeddingMusicEngine {
  private audioEl: HTMLAudioElement | null = null;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private schedulerId: number | null = null;
  private playing = false;
  private mode: 'uninitialized' | 'file' | 'synth' = 'uninitialized';
  private chordIndex = 0;
  private noteIndex = 0;
  private listeners = new Set<(playing: boolean) => void>();

  public subscribe(fn: (playing: boolean) => void): () => void {
    this.listeners.add(fn);
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) => fn(this.playing));
  }

  public isPlaying(): boolean {
    return this.playing;
  }

  private async detectOptionalAudioFile(): Promise<boolean> {
    try {
      const response = await fetch(OPTIONAL_AUDIO_SRC, { method: 'HEAD' });
      const contentType = response.headers.get('content-type') || '';
      return response.ok && contentType.startsWith('audio/');
    } catch {
      return false;
    }
  }

  private startSynth() {
    const AudioCtx =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext })
        .webkitAudioContext;

    if (!AudioCtx) return;

    if (!this.ctx) {
      this.ctx = new AudioCtx();
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);

      // Gentle low-pass warmth
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1900, this.ctx.currentTime);

      // Soft ambient delay tail
      const delay = this.ctx.createDelay(1.0);
      delay.delayTime.setValueAtTime(0.36, this.ctx.currentTime);
      const feedback = this.ctx.createGain();
      feedback.gain.setValueAtTime(0.28, this.ctx.currentTime);
      const wetGain = this.ctx.createGain();
      wetGain.gain.setValueAtTime(0.25, this.ctx.currentTime);

      this.masterGain.connect(filter);
      filter.connect(this.ctx.destination);

      filter.connect(delay);
      delay.connect(feedback);
      feedback.connect(delay);
      delay.connect(wetGain);
      wetGain.connect(this.ctx.destination);
    }

    if (this.ctx.state === 'suspended') {
      void this.ctx.resume();
    }

    if (this.masterGain && this.ctx) {
      this.masterGain.gain.cancelScheduledValues(this.ctx.currentTime);
      this.masterGain.gain.setValueAtTime(0.001, this.ctx.currentTime);
      this.masterGain.gain.linearRampToValueAtTime(0.18, this.ctx.currentTime + 1.4);
    }

    if (this.schedulerId !== null) {
      window.clearInterval(this.schedulerId);
    }

    const playNote = () => {
      if (!this.ctx || !this.masterGain || !this.playing) return;
      const chord = PROGRESSION[this.chordIndex];
      const freq = chord[this.noteIndex];
      const now = this.ctx.currentTime;

      const osc = this.ctx.createOscillator();
      const subOsc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now);

      subOsc.type = 'triangle';
      subOsc.frequency.setValueAtTime(freq * 2, now);

      const subGain = this.ctx.createGain();
      subGain.gain.setValueAtTime(0.08, now);

      noteGain.gain.setValueAtTime(0.0001, now);
      noteGain.gain.linearRampToValueAtTime(0.34, now + 0.04);
      noteGain.gain.exponentialRampToValueAtTime(0.0008, now + 2.6);

      osc.connect(noteGain);
      subOsc.connect(subGain);
      subGain.connect(noteGain);
      noteGain.connect(this.masterGain);

      osc.start(now);
      subOsc.start(now);
      osc.stop(now + 2.7);
      subOsc.stop(now + 2.7);

      this.noteIndex += 1;
      if (this.noteIndex >= chord.length) {
        this.noteIndex = 0;
        this.chordIndex = (this.chordIndex + 1) % PROGRESSION.length;
      }
    };

    playNote();
    this.schedulerId = window.setInterval(playNote, 620);
  }

  public async play(): Promise<void> {
    if (this.playing) return;

    if (this.mode === 'uninitialized') {
      const hasFile = await this.detectOptionalAudioFile();
      this.mode = hasFile ? 'file' : 'synth';
    }

    this.playing = true;
    this.notify();

    if (this.mode === 'file') {
      try {
        if (!this.audioEl) {
          this.audioEl = new Audio(OPTIONAL_AUDIO_SRC);
          this.audioEl.loop = true;
          this.audioEl.volume = 0.45;
          this.audioEl.addEventListener('error', () => {
            this.mode = 'synth';
            if (this.playing) this.startSynth();
          });
        }
        await this.audioEl.play();
        return;
      } catch {
        this.mode = 'synth';
      }
    }

    this.startSynth();
  }

  public pause(): void {
    if (!this.playing) return;
    this.playing = false;
    this.notify();

    if (this.audioEl) {
      this.audioEl.pause();
    }

    if (this.schedulerId !== null) {
      window.clearInterval(this.schedulerId);
      this.schedulerId = null;
    }

    if (this.ctx && this.masterGain) {
      const now = this.ctx.currentTime;
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setTargetAtTime(0.0001, now, 0.18);
    }
  }

  public async toggle(): Promise<void> {
    if (this.playing) {
      this.pause();
    } else {
      await this.play();
    }
  }
}

export const musicEngine = new WeddingMusicEngine();
