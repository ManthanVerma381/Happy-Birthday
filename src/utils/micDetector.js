// Web Audio API Microphone Air Blow Detector
export class MicDetector {
  constructor(onBlowDetected, onError) {
    this.onBlowDetected = onBlowDetected;
    this.onError = onError;
    this.audioContext = null;
    this.analyser = null;
    this.microphone = null;
    this.stream = null;
    this.isListening = false;
    this.animationFrameId = null;
    this.blowThreshold = 45; // RMS Volume / Frequency threshold for blowing air
  }

  async startListening() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      if (this.onError) this.onError('Microphone not supported by browser.');
      return false;
    }

    try {
      this.stream = await navigator.mediaDevices.getUserMedia({ audio: true, video: false });
      const AudioContextClass = window.AudioContext || window.webkitAudioContext;
      this.audioContext = new AudioContextClass();
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.4;

      this.microphone = this.audioContext.createMediaStreamSource(this.stream);
      this.microphone.connect(this.analyser);

      this.isListening = true;
      this.detectLoop();
      return true;
    } catch (err) {
      console.warn('Microphone permission denied or unavailable:', err);
      if (this.onError) this.onError(err.message || 'Permission denied.');
      this.stop();
      return false;
    }
  }

  detectLoop() {
    if (!this.isListening || !this.analyser) return;

    const dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    this.analyser.getByteFrequencyData(dataArray);

    // Compute average intensity across low-mid frequencies (typical of blowing into mic)
    let sum = 0;
    for (let i = 0; i < dataArray.length; i++) {
      sum += dataArray[i];
    }
    const average = sum / dataArray.length;

    if (average > this.blowThreshold) {
      if (this.onBlowDetected) {
        this.onBlowDetected();
      }
      this.stop();
      return;
    }

    this.animationFrameId = requestAnimationFrame(() => this.detectLoop());
  }

  stop() {
    this.isListening = false;
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    if (this.stream) {
      this.stream.getTracks().forEach(track => track.stop());
      this.stream = null;
    }
    if (this.audioContext && this.audioContext.state !== 'closed') {
      this.audioContext.close();
      this.audioContext = null;
    }
  }
}
