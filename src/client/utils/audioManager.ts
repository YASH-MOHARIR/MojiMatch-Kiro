/**
 * Audio Manager for MojiMatcher
 * Handles all sound effects and music playback
 */

// Import the audio file as a module
import buttonClickSound from '/btn-click.mp3?url';

type SoundName =
  | 'start'
  | 'correct'
  | 'wrong'
  | 'combo3'
  | 'combo5'
  | 'combo10'
  | 'tick'
  | 'fasttick'
  | 'gameover'
  | 'buttonclick';

class AudioManager {
  private music: HTMLAudioElement | null = null;
  private sfxEnabled: boolean = true;
  private musicEnabled: boolean = true;
  private buttonClickAudio: HTMLAudioElement | null = null;

  constructor() {
    this.loadSettings();
    this.loadButtonClickSound();
  }

  /**
   * Load button click sound
   */
  private loadButtonClickSound() {
    try {
      console.log('🔊 Loading button click sound from:', buttonClickSound);
      this.buttonClickAudio = new Audio(buttonClickSound);
      this.buttonClickAudio.volume = 0.5; // Increased volume
      this.buttonClickAudio.preload = 'auto';
      
      // Add error handler
      this.buttonClickAudio.addEventListener('error', (e) => {
        console.error('❌ Failed to load button click sound:', e);
        console.error('Attempted path:', buttonClickSound);
      });
      
      // Add loaded handler for debugging
      this.buttonClickAudio.addEventListener('canplaythrough', () => {
        console.log('✅ Button click sound loaded successfully!');
      });
      
      this.buttonClickAudio.addEventListener('loadeddata', () => {
        console.log('✅ Button click sound data loaded');
      });
    } catch (error) {
      console.error('❌ Error initializing button click sound:', error);
    }
  }

  /**
   * Load audio settings from localStorage
   */
  private loadSettings() {
    const settings = localStorage.getItem('mojimatcher:audio-settings');
    if (settings) {
      const parsed = JSON.parse(settings);
      this.sfxEnabled = parsed.sfxEnabled ?? true;
      this.musicEnabled = parsed.musicEnabled ?? true;
    }
  }

  /**
   * Save audio settings to localStorage
   */
  private saveSettings() {
    localStorage.setItem(
      'mojimatcher:audio-settings',
      JSON.stringify({
        sfxEnabled: this.sfxEnabled,
        musicEnabled: this.musicEnabled,
      })
    );
  }

  /**
   * Play a sound effect
   * Uses Web Audio API with simple oscillator tones for now
   */
  playSound(name: SoundName) {
    if (!this.sfxEnabled) return;

    // Create audio context
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    // Configure sound based on type
    switch (name) {
      case 'start':
        oscillator.frequency.value = 523.25; // C5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
        break;

      case 'correct':
        oscillator.frequency.value = 659.25; // E5
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.2);
        break;

      case 'wrong':
        oscillator.type = 'sawtooth';
        oscillator.frequency.value = 130.81; // C3
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.15);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.15);
        break;

      case 'combo3':
        oscillator.frequency.value = 783.99; // G5
        gainNode.gain.setValueAtTime(0.25, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.25);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.25);
        break;

      case 'combo5':
        oscillator.frequency.value = 880.0; // A5
        gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.3);
        break;

      case 'combo10':
        oscillator.frequency.value = 1046.5; // C6
        gainNode.gain.setValueAtTime(0.35, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.4);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.4);
        break;

      case 'tick':
        oscillator.frequency.value = 440.0; // A4
        gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.05);
        break;

      case 'fasttick':
        oscillator.frequency.value = 554.37; // C#5
        gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.05);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.05);
        break;

      case 'gameover':
        // Buzzer sound - harsh, attention-grabbing
        oscillator.type = 'sawtooth';
        oscillator.frequency.value = 200; // Low frequency
        gainNode.gain.setValueAtTime(0.4, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
        oscillator.start();
        oscillator.stop(audioContext.currentTime + 0.8);
        
        // Add a second oscillator for more buzzer effect
        const oscillator2 = audioContext.createOscillator();
        const gainNode2 = audioContext.createGain();
        oscillator2.connect(gainNode2);
        gainNode2.connect(audioContext.destination);
        oscillator2.type = 'square';
        oscillator2.frequency.value = 150;
        gainNode2.gain.setValueAtTime(0.3, audioContext.currentTime);
        gainNode2.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.8);
        oscillator2.start();
        oscillator2.stop(audioContext.currentTime + 0.8);
        break;

      case 'buttonclick':
        // Play the button click MP3 file
        console.log('🔊 Button click requested, audio loaded:', !!this.buttonClickAudio);
        if (this.buttonClickAudio) {
          try {
            this.buttonClickAudio.currentTime = 0;
            console.log('🎵 Playing button click sound...');
            this.buttonClickAudio.play()
              .then(() => console.log('✅ Button click sound played successfully'))
              .catch((error) => {
                console.warn('⚠️ Button click sound play failed:', error.name, error.message);
              });
          } catch (error) {
            console.error('❌ Error playing button click sound:', error);
          }
        } else {
          console.warn('⚠️ Button click audio not loaded');
        }
        break;
    }
  }

  /**
   * Toggle sound effects on/off
   */
  toggleSFX(enabled: boolean) {
    this.sfxEnabled = enabled;
    this.saveSettings();
  }

  /**
   * Toggle music on/off
   */
  toggleMusic(enabled: boolean) {
    this.musicEnabled = enabled;
    this.saveSettings();

    if (!enabled && this.music) {
      this.music.pause();
    } else if (enabled && this.music) {
      this.music.play().catch(() => {
        // Ignore autoplay errors
      });
    }
  }

  /**
   * Get current SFX state
   */
  isSFXEnabled(): boolean {
    return this.sfxEnabled;
  }

  /**
   * Get current music state
   */
  isMusicEnabled(): boolean {
    return this.musicEnabled;
  }
}

// Export singleton instance
export const audioManager = new AudioManager();
