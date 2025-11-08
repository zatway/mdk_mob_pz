import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert} from 'react-native';

type ServiceState = 'stopped' | 'starting' | 'running' | 'stopping';

// Simulated MediaService class
class MediaService {
  private static instance: MediaService | null = null;
  private state: ServiceState = 'stopped';
  private timer: NodeJS.Timer | null = null;
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

  getState(): ServiceState {
    return this.state;
  }

  // Simulate startService() -> onStartCommand()
  startService() {
    if (this.state !== 'stopped') return;
    
    this.state = 'starting';
    this.onStateChange?.(this.state);
    
    // Simulate service initialization
    setTimeout(() => {
      this.state = 'running';
      this.onStateChange?.(this.state);
      this.startPlayback();
    }, 1000);
  }

  // Simulate stopService() -> onDestroy()
  stopService() {
    if (this.state === 'stopped') return;
    
    this.state = 'stopping';
    this.onStateChange?.(this.state);
    
    this.stopPlayback();
    
    setTimeout(() => {
      this.state = 'stopped';
      this.onStateChange?.(this.state);
    }, 500);
  }

  private startPlayback() {
    // Simulate audio playback with timer
    this.timer = setInterval(() => {
      // Service is running and "playing" audio
    }, 1000);
  }

  private stopPlayback() {
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
  }

  // Additional service functions
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

const App_13: React.FC = () => {
  const [serviceState, setServiceState] = useState<ServiceState>('stopped');
  const [serviceInfo, setServiceInfo] = useState<string>('');
  const serviceRef = useRef<MediaService | null>(null);

  useEffect(() => {
    serviceRef.current = MediaService.getInstance();
    serviceRef.current.setOnStateChange(setServiceState);
    
    return () => {
      // Cleanup on unmount
      if (serviceRef.current) {
        serviceRef.current.stopService();
      }
    };
  }, []);

  const startService = () => {
    serviceRef.current?.startService();
  };

  const stopService = () => {
    serviceRef.current?.stopService();
  };

  const pauseService = () => {
    serviceRef.current?.pauseService();
  };

  const resumeService = () => {
    serviceRef.current?.resumeService();
  };

  const getServiceInfo = () => {
    if (serviceRef.current) {
      const info = serviceRef.current.getServiceInfo();
      setServiceInfo(`State: ${info.state}\nRunning: ${info.isRunning}\nUptime: ${info.uptime}`);
    }
  };

  const getStateColor = () => {
    switch (serviceState) {
      case 'stopped': return '#E53935';
      case 'starting': return '#FF9800';
      case 'running': return '#43A047';
      case 'stopping': return '#FF9800';
      default: return '#9E9E9E';
    }
  };

  const getStateText = () => {
    switch (serviceState) {
      case 'stopped': return 'Остановлен';
      case 'starting': return 'Запускается...';
      case 'running': return 'Работает';
      case 'stopping': return 'Останавливается...';
      default: return 'Неизвестно';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>MediaService (демо)</Text>
      <Text style={styles.subtitle}>Сервис воспроизведения музыки</Text>

      <View style={styles.statusBox}>
        <Text style={styles.statusLabel}>Статус сервиса:</Text>
        <View style={[styles.statusIndicator, {backgroundColor: getStateColor()}]} />
        <Text style={[styles.statusText, {color: getStateColor()}]}>{getStateText()}</Text>
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity 
          style={[styles.button, styles.startButton, serviceState !== 'stopped' && styles.buttonDisabled]} 
          onPress={startService}
          disabled={serviceState !== 'stopped'}
        >
          <Text style={styles.buttonText}>Запустить сервис</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.stopButton, serviceState === 'stopped' && styles.buttonDisabled]} 
          onPress={stopService}
          disabled={serviceState === 'stopped'}
        >
          <Text style={styles.buttonText}>Остановить сервис</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.controlsRow}>
        <TouchableOpacity 
          style={[styles.button, styles.pauseButton, serviceState !== 'running' && styles.buttonDisabled]} 
          onPress={pauseService}
          disabled={serviceState !== 'running'}
        >
          <Text style={styles.buttonText}>Пауза</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.resumeButton, serviceState !== 'stopped' && styles.buttonDisabled]} 
          onPress={resumeService}
          disabled={serviceState !== 'stopped'}
        >
          <Text style={styles.buttonText}>Возобновить</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.infoButton} onPress={getServiceInfo}>
        <Text style={styles.buttonText}>Получить информацию о сервисе</Text>
      </TouchableOpacity>

      {serviceInfo ? (
        <View style={styles.infoBox}>
          <Text style={styles.infoText}>{serviceInfo}</Text>
        </View>
      ) : null}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: '800',
    color: '#212121',
    marginBottom: 6,
  },
  subtitle: {
    fontSize: 14,
    color: '#616161',
    marginBottom: 20,
  },
  statusBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  },
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
    marginRight: 12,
  },
  statusIndicator: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '700',
  },
  controlsRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  startButton: {
    backgroundColor: '#43A047',
  },
  stopButton: {
    backgroundColor: '#E53935',
  },
  pauseButton: {
    backgroundColor: '#FF9800',
  },
  resumeButton: {
    backgroundColor: '#2196F3',
  },
  buttonDisabled: {
    backgroundColor: '#E0E0E0',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  infoButton: {
    backgroundColor: '#9C27B0',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  infoBox: {
    backgroundColor: '#E8F5E8',
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  infoText: {
    fontSize: 14,
    color: '#2E7D32',
    fontFamily: 'monospace',
  },
});

export default App_13;

