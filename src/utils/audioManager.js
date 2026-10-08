// Centralized Audio Manager with Web Audio Synthesizer Fallbacks
class AudioManager {
  constructor() {
    this.bgAudio = null;
    this.isMuted = false;
    this.audioContext = null;
    this.bgMusicStarted = false;
    this.volume = 0.4;
  }

  init(bgMusicPath = '/assets/music/birthday.mp3', initialVolume = 0.4) {
    this.volume = initialVolume;
    if (typeof window !== 'undefined') {
      // Check stored mute preference
      const storedMute = localStorage.getItem('birthday_site_muted');
      if (storedMute !== null) {
        this.isMuted = storedMute === 'true';
      }

      this.bgAudio = new Audio(bgMusicPath);
      this.bgAudio.loop = true;
      this.bgAudio.volume = this.isMuted ? 0 : this.volume;

      // Silently handle error if background music file doesn't exist
      this.bgAudio.addEventListener('error', (e) => {
        console.warn('Background music track not found or failed to load. Sound synthesis active.', e);
      });
    }
  }

  // Lazy initialize AudioContext on user interaction
  getAudioContext() {
    if (!this.audioContext && typeof window !== 'undefined') {
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      if (AudioContextClass) {
        this.audioContext = new AudioContextClass();
      }
    }
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume();
    }
    return this.audioContext;
  }

  startBgMusic() {
    if (this.bgAudio && !this.bgMusicStarted) {
      this.getAudioContext();
      this.bgAudio.play().then(() => {
        this.bgMusicStarted = true;
      }).catch(err => {
        console.warn('Autoplay prevented or music file missing:', err);
      });
    }
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('birthday_site_muted', this.isMuted.toString());
    }
    if (this.bgAudio) {
      this.bgAudio.volume = this.isMuted ? 0 : this.volume;
    }
    return this.isMuted;
  }

  setMuted(muted) {
    this.isMuted = muted;
    if (typeof window !== 'undefined') {
      localStorage.setItem('birthday_site_muted', this.isMuted.toString());
    }
    if (this.bgAudio) {
      this.bgAudio.volume = this.isMuted ? 0 : this.volume;
    }
  }

  // Web Audio API Synthesized Sound Effects (Always work without external files!)
  playToneEffect(type = 'chime') {
    if (this.isMuted) return;
    try {
      const ctx = this.getAudioContext();
      if (!ctx) return;

      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'chime') {
        // Soft magical harp/chime sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now); // C5
        osc.frequency.exponentialRampToValueAtTime(1046.5, now + 0.4); // C6
        gain.gain.setValueAtTime(0.15, now);
        gain.gain.exponentialRampToValueAtTime(0.001, now + 0.5);
        osc.start(now);
        osc.stop(now + 0.5);
      } else if (type === 'pop') {
        // Pop / Catch heart sound
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.12);
        osc.start(now);
        osc.stop(now + 0.12);
      } else if (type === 'blow') {
        // Soft wind / candle blow out noise
        osc.type = 'sine';
        osc.frequency.setValueAtTime(180, now);
        osc.frequency.linearRampToValueAtTime(60, now + 0.6);
        gain.gain.setValueAtTime(0.2, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.6);
        osc.start(now);
        osc.stop(now + 0.6);
      } else if (type === 'celebration') {
        // Arpeggio fanfare for win / cake blow out
        const notes = [523.25, 659.25, 783.99, 1046.5]; // C E G C
        notes.forEach((freq, idx) => {
          const noteOsc = ctx.createOscillator();
          const noteGain = ctx.createGain();
          noteOsc.type = 'sine';
          noteOsc.frequency.setValueAtTime(freq, now + idx * 0.08);
          noteGain.gain.setValueAtTime(0.15, now + idx * 0.08);
          noteGain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.08 + 0.4);
          noteOsc.connect(noteGain);
          noteGain.connect(ctx.destination);
          noteOsc.start(now + idx * 0.08);
          noteOsc.stop(now + idx * 0.08 + 0.4);
        });
      } else if (type === 'envelope') {
        // Soft paper slide sound
        osc.type = 'sine';
        osc.frequency.setValueAtTime(400, now);
        osc.frequency.exponentialRampToValueAtTime(600, now + 0.2);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.001, now + 0.25);
        osc.start(now);
        osc.stop(now + 0.25);
      }
    } catch (err) {
      console.warn('Web Audio synthesis error:', err);
    }
  }

  stopAll() {
    if (this.bgAudio) {
      this.bgAudio.pause();
      this.bgAudio.currentTime = 0;
      this.bgMusicStarted = false;
    }
  }
}

export const audioManager = new AudioManager();
