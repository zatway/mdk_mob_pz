import React, {useEffect, useRef, useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Alert, ViewStyle} from 'react-native';
import {ServiceState} from './ServiceState.ts';
import {MediaService} from './MediaService.ts';
import {colors} from '../styles/colors.ts';
import {commonStyles} from '../styles/commonStyles.ts';


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
    ...commonStyles.container,
    backgroundColor: colors.white,
    padding: 16,
  },
  title: {
    ...commonStyles.title,
    fontSize: 20,
    fontWeight: '800',
    color: colors.textPrimary,
    marginBottom: 6,
  },
  subtitle: {
    ...commonStyles.subtitle,
    fontSize: 14,
    marginBottom: 20,
  },
  statusBox: {
    ...commonStyles.row,
    backgroundColor: colors.backgroundGrey,
    padding: 16,
    borderRadius: 12,
    marginBottom: 20,
  } as ViewStyle,
  statusLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
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
    ...commonStyles.row,
    marginBottom: 12,
  } as ViewStyle,
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  startButton: {
    backgroundColor: colors.success,
  },
  stopButton: {
    backgroundColor: colors.danger,
  },
  pauseButton: {
    backgroundColor: colors.warning,
  },
  resumeButton: {
    backgroundColor: colors.primary,
  },
  buttonDisabled: {
    backgroundColor: colors.divider,
  },
  buttonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '700',
  },
  infoButton: {
    backgroundColor: colors.accentPurple,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 8,
  },
  infoBox: {
    backgroundColor: colors.successBackground,
    padding: 16,
    borderRadius: 12,
    marginTop: 16,
  },
  infoText: {
    fontSize: 14,
    color: colors.successText,
    fontFamily: 'monospace',
  },
});

export default App_13;

