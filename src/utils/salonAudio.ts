// Web Audio API generator for authentic retro barbershop ambience
// Scissors snips, Trimmer hum, Water spray, Ceiling fan

class SalonAudioService {
  private ctx: AudioContext | null = null;
  private fanNode: AudioNode | null = null;
  private trimmerNode: AudioNode | null = null;
  private fanGain: GainNode | null = null;
  private trimmerGain: GainNode | null = null;

  public isFanActive = false;
  public isTrimmerActive = false;
  public scissorsVolume = 0.5;
  public trimmerVolume = 0.35;
  public fanVolume = 0.25;
  public sprayVolume = 0.5;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Scissors snip sound ("shh-chk!")
  public playScissorSnip() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const bufferSize = this.ctx.sampleRate * 0.08;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
      }

      // First snip
      const noise1 = this.ctx.createBufferSource();
      noise1.buffer = buffer;

      const filter1 = this.ctx.createBiquadFilter();
      filter1.type = 'bandpass';
      filter1.frequency.value = 3200;
      filter1.Q.value = 4.0;

      const gain1 = this.ctx.createGain();
      gain1.gain.setValueAtTime(0, now);
      gain1.gain.linearRampToValueAtTime(0.6 * this.scissorsVolume, now + 0.005);
      gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.045);

      noise1.connect(filter1);
      filter1.connect(gain1);
      gain1.connect(this.ctx.destination);

      noise1.start(now);
      noise1.stop(now + 0.05);

      // Second closing snip ("ch-chk")
      const noise2 = this.ctx.createBufferSource();
      noise2.buffer = buffer;

      const filter2 = this.ctx.createBiquadFilter();
      filter2.type = 'bandpass';
      filter2.frequency.value = 3800;
      filter2.Q.value = 5.0;

      const gain2 = this.ctx.createGain();
      gain2.gain.setValueAtTime(0, now + 0.03);
      gain2.gain.linearRampToValueAtTime(0.7 * this.scissorsVolume, now + 0.035);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

      noise2.connect(filter2);
      filter2.connect(gain2);
      gain2.connect(this.ctx.destination);

      noise2.start(now + 0.03);
      noise2.stop(now + 0.085);
    } catch (e) {
      console.warn('Scissor sound error:', e);
    }
  }

  // Water spray mist sound ("pshhhh")
  public playWaterSpray() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      const duration = 0.22;
      const bufferSize = this.ctx.sampleRate * duration;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);

      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'highpass';
      filter.frequency.setValueAtTime(4500, now);
      filter.frequency.exponentialRampToValueAtTime(3000, now + duration);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.8 * this.sprayVolume, now + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, now + duration);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + duration);
    } catch (e) {
      console.warn('Spray sound error:', e);
    }
  }

  // Hair Trimmer buzz toggle
  public toggleTrimmer(): boolean {
    try {
      this.initContext();
      if (!this.ctx) return false;

      if (this.isTrimmerActive) {
        this.stopTrimmer();
        return false;
      } else {
        this.startTrimmer();
        return true;
      }
    } catch {
      return false;
    }
  }

  public startTrimmer() {
    try {
      this.initContext();
      if (!this.ctx || this.isTrimmerActive) return;

      const now = this.ctx.currentTime;

      // Dual oscillator for realistic motor vibration
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(124, now); // 120Hz motor hum

      const osc2 = this.ctx.createOscillator();
      osc2.type = 'square';
      osc2.frequency.setValueAtTime(126, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 650;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.18 * this.trimmerVolume, now + 0.1);

      osc1.connect(filter);
      osc2.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);

      this.trimmerGain = gain;
      this.trimmerNode = {
        stop: () => {
          try {
            osc1.stop();
            osc2.stop();
          } catch {}
        },
      } as unknown as AudioNode;

      this.isTrimmerActive = true;
    } catch (e) {
      console.warn('Trimmer start error:', e);
    }
  }

  public stopTrimmer() {
    if (this.trimmerGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.trimmerGain.gain.linearRampToValueAtTime(0.001, now + 0.1);
        setTimeout(() => {
          (this.trimmerNode as unknown as { stop?: () => void })?.stop?.();
          this.trimmerNode = null;
          this.trimmerGain = null;
        }, 120);
      } catch {}
    }
    this.isTrimmerActive = false;
  }

  // Ceiling Fan hum toggle
  public toggleFan(): boolean {
    if (this.isFanActive) {
      this.stopFan();
      return false;
    } else {
      this.startFan();
      return true;
    }
  }

  public startFan() {
    try {
      this.initContext();
      if (!this.ctx || this.isFanActive) return;

      const now = this.ctx.currentTime;

      // Low rumble pink noise generator
      const bufferSize = this.ctx.sampleRate * 2;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        data[i] = (b0 + b1 + b2) * 0.15;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;
      noise.loop = true;

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.value = 220;

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.22 * this.fanVolume, now + 0.5);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      this.fanNode = noise;
      this.fanGain = gain;
      this.isFanActive = true;
    } catch (e) {
      console.warn('Fan start error:', e);
    }
  }

  public stopFan() {
    if (this.fanGain && this.ctx) {
      try {
        const now = this.ctx.currentTime;
        this.fanGain.gain.linearRampToValueAtTime(0.001, now + 0.4);
        setTimeout(() => {
          (this.fanNode as AudioBufferSourceNode)?.stop?.();
          this.fanNode = null;
          this.fanGain = null;
        }, 450);
      } catch {}
    }
    this.isFanActive = false;
  }
}

export const salonAudio = new SalonAudioService();

