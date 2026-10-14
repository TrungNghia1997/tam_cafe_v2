/**
 * Trình phát âm thanh không gian mộc mạc (Web Audio API)
 * Tạo giai điệu ngũ cung truyền thống êm dịu, tiếng gió tre và giọt nước chầm chậm
 */

class AmbientSound {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.timer = null;
    // Điệu thức ngũ cung Việt Nam (C4, D4, F4, G4, A4, C5, D5)
    this.scale = [261.63, 293.66, 349.23, 392.00, 440.00, 523.25, 587.33];
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  playBambooChime(freq) {
    if (!this.ctx || !this.isPlaying) return;
    const now = this.ctx.currentTime;

    // Oscillator 1 (Main chime)
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(freq, now);

    // Harmonic overtone
    const osc2 = this.ctx.createOscillator();
    const gain2 = this.ctx.createGain();
    osc2.type = "triangle";
    osc2.frequency.setValueAtTime(freq * 2.01, now);

    // Filter to warm it up
    const filter = this.ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(1800, now);

    // Envelope: sharp gentle tap, long warm decay
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.08, now + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.5);

    gain2.gain.setValueAtTime(0.001, now);
    gain2.gain.exponentialRampToValueAtTime(0.02, now + 0.03);
    gain2.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

    osc.connect(gain);
    osc2.connect(gain2);
    gain.connect(filter);
    gain2.connect(filter);
    filter.connect(this.ctx.destination);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 2.6);
    osc2.stop(now + 1.3);
  }

  scheduleNextNote() {
    if (!this.isPlaying) return;
    const randomIndex = Math.floor(Math.random() * this.scale.length);
    const freq = this.scale[randomIndex];
    this.playBambooChime(freq);

    // Random interval between 2.2s and 4.8s
    const nextInterval = 2200 + Math.random() * 2600;
    this.timer = setTimeout(() => this.scheduleNextNote(), nextInterval);
  }

  toggle() {
    this.init();
    if (this.isPlaying) {
      this.isPlaying = false;
      if (this.timer) clearTimeout(this.timer);
      return false;
    } else {
      this.isPlaying = true;
      this.scheduleNextNote();
      return true;
    }
  }
}

window.ambientSound = new AmbientSound();
