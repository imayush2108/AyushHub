// Web Audio API ambient audio synthesizer
// Generates real, pleasant lo-fi ambient music chords and beat pulses directly in the browser!

class AmbientSynth {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.intervalId = null;
    this.gainNode = null;
    this.volume = 0.6;
    this.currentTrack = 'lofi';
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.gainNode = this.ctx.createGain();
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
      this.gainNode.connect(this.ctx.destination);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  setVolume(vol) {
    this.volume = Math.max(0, Math.min(1, vol));
    if (this.gainNode && this.ctx) {
      this.gainNode.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  playChord(frequencies, duration = 2.4, type = 'sine') {
    if (!this.ctx || !this.isPlaying) return;

    frequencies.forEach((freq) => {
      const osc = this.ctx.createOscillator();
      const noteGain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      // Soft envelope for lo-fi chill warmth
      const now = this.ctx.currentTime;
      noteGain.gain.setValueAtTime(0, now);
      noteGain.gain.linearRampToValueAtTime(0.08 * this.volume, now + 0.4);
      noteGain.gain.exponentialRampToValueAtTime(0.001, now + duration);

      osc.connect(noteGain);
      noteGain.connect(this.gainNode);

      osc.start(now);
      osc.stop(now + duration);
    });
  }

  playLofi() {
    // Warm jazz/lo-fi progression: Cmaj7 -> Am7 -> Dm7 -> G7
    const chords = [
      [261.63, 329.63, 392.00, 493.88], // Cmaj7
      [220.00, 261.63, 329.63, 392.00], // Am7
      [146.83, 220.00, 261.63, 349.23], // Dm7
      [196.00, 246.94, 293.66, 349.23]  // G7
    ];
    let step = 0;
    this.intervalId = setInterval(() => {
      if (!this.isPlaying) return;
      this.playChord(chords[step % chords.length], 2.8, 'sine');
      step++;
    }, 2800);
  }

  playSynthwave() {
    // Retro synth progression in A minor
    const chords = [
      [220.00, 261.63, 329.63], // Am
      [174.61, 220.00, 261.63], // F
      [261.63, 329.63, 392.00], // C
      [196.00, 246.94, 293.66]  // G
    ];
    let step = 0;
    this.intervalId = setInterval(() => {
      if (!this.isPlaying) return;
      this.playChord(chords[step % chords.length], 1.8, 'triangle');
      step++;
    }, 1800);
  }

  playChillGaming() {
    // Ambient gaming adventure chords
    const chords = [
      [164.81, 246.94, 329.63, 392.00], // Em7
      [220.00, 261.63, 329.63, 440.00], // Am
      [196.00, 246.94, 293.66, 392.00], // G
      [146.83, 220.00, 293.66, 370.00]  // D
    ];
    let step = 0;
    this.intervalId = setInterval(() => {
      if (!this.isPlaying) return;
      this.playChord(chords[step % chords.length], 2.2, 'sine');
      step++;
    }, 2200);
  }

  start(track = 'lofi') {
    this.init();
    this.stop();
    this.isPlaying = true;
    this.currentTrack = track;

    if (track === 'lofi') {
      this.playLofi();
    } else if (track === 'synthwave') {
      this.playSynthwave();
    } else {
      this.playChillGaming();
    }
  }

  stop() {
    this.isPlaying = false;
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }
}

export const ambientPlayer = new AmbientSynth();
