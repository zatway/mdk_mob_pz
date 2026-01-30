import {ServiceState} from './ServiceState.ts';

export class MediaService {
  private static instance: MediaService | null = null;
  private state: ServiceState = 'stopped';
  private timer: NodeJS.Timeout | null = null;
  private onStateChange: ((state: ServiceState) => void) | null = null;

  static getInstance(): MediaService {
    if (!MediaService.instance) {
      MediaService.instance = new MediaService();
    }
    return MediaService.instance;
  }

  setOnStateChange(callback: (state: ServiceState) => void) {
    this.onStateChange = callback;
  }

  startService() {
    if (this.state !== 'stopped') {
      return;
    }

    this.state = 'starting';
    this.onStateChange?.(this.state);

    //Симуляция инициализации сервиса
    setTimeout(() => {
      this.state = 'running';
      this.onStateChange?.(this.state);
      this.startPlayback();
    }, 1000);
  }

  stopService() {
    if (this.state === 'stopped') {
      return;
    }

    this.state = 'stopping';
    this.onStateChange?.(this.state);

    this.stopPlayback();

    setTimeout(() => {
      this.state = 'stopped';
      this.onStateChange?.(this.state);
    }, 500);
  }

  private startPlayback() {
    this.timer = setInterval(() => {
    }, 1000);
  }

  private stopPlayback() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  pauseService() {
    if (this.state === 'running') {
      this.stopPlayback();
      this.state = 'stopped';
      this.onStateChange?.(this.state);
    }
  }

  resumeService() {
    if (this.state === 'stopped') {
      this.startService();
    }
  }

  getServiceInfo() {
    return {
      state: this.state,
      isRunning: this.state === 'running',
      uptime: this.timer ? 'Active' : 'Inactive',
    };
  }
}
