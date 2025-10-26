import React, {useEffect, useMemo, useRef, useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, TouchableOpacity, Switch} from 'react-native';
import ControlButton from './ControlButton.tsx';

type SourceKey = 'RAW' | 'HTTP' | 'STREAM' | 'SD' | 'URI';

const SOURCES: {key: SourceKey; label: string; value: string}[] = [
  {key: 'RAW', label: 'res/raw', value: 'raw://music.mp3'},
  {key: 'HTTP', label: 'http', value: 'https://example.com/music.mp3'},
  {key: 'STREAM', label: 'stream', value: 'https://example.com/stream'},
  {key: 'SD', label: 'sdcard', value: 'file:///sdcard/Music/local.mp3'},
  {key: 'URI', label: 'uri', value: 'content://media/internal/audio/media/1'},
];

type PlayerState = 'idle' | 'preparing' | 'playing' | 'paused' | 'stopped';

const App_12: React.FC = () => {
  const [source, setSource] = useState<SourceKey>('RAW');
  const [loop, setLoop] = useState(false);
  const [playerState, setPlayerState] = useState<PlayerState>('idle');
  const [positionMs, setPositionMs] = useState(0);
  const durationMs = 180_000;
  const timerRef = useRef<NodeJS.Timer | null>(null);

  const sourceValue = useMemo(() => SOURCES.find(s => s.key === source)?.value ?? '', [source]);

  const isPlaying = playerState === 'playing';

  useEffect(() => {
    if (isPlaying) {
      if (timerRef.current) clearInterval(timerRef.current as unknown as number);
      timerRef.current = setInterval(() => {
        setPositionMs(prev => {
          const next = prev + 500;
          if (next >= durationMs) {
            if (loop) {
              return 0;
            }
            stop();
            return durationMs;
          }
          return next;
        });
      }, 500);
    } else if (timerRef.current) {
      clearInterval(timerRef.current as unknown as number);
      timerRef.current = null;
    }
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current as unknown as number);
        timerRef.current = null;
      }
    };
  }, [isPlaying, loop]);

  const prepareAndStart = () => {
    const needsAsync = source === 'HTTP' || source === 'STREAM';
    setPlayerState('preparing');
    const startPlayback = () => {
      setPlayerState('playing');
    };
    if (needsAsync) {
      setTimeout(startPlayback, 700);
    } else {
      startPlayback();
    }
  };

  const pause = () => setPlayerState(prev => (prev === 'playing' ? 'paused' : prev));
  const resume = () => setPlayerState(prev => (prev === 'paused' ? 'playing' : prev));
  const stop = () => {
    setPlayerState('stopped');
    setPositionMs(0);
  };
  const seekBy = (deltaMs: number) => {
    setPositionMs(prev => Math.max(0, Math.min(durationMs, prev + deltaMs)));
  };

  const mmss = (ms: number) => {
    const totalSec = Math.round(ms / 1000);
    const m = Math.floor(totalSec / 60)
      .toString()
      .padStart(2, '0');
    const s = (totalSec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const progress = positionMs / durationMs;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Аудиоплеер (демо)</Text>
      <Text style={styles.subtitle}>Источник: {sourceValue}</Text>

      <View style={styles.rowWrap}>
        {SOURCES.map(s => (
          <TouchableOpacity key={s.key} style={[styles.chip, s.key === source && styles.chipActive]} onPress={() => setSource(s.key)}>
            <Text style={[styles.chipText, s.key === source && styles.chipTextActive]}>{s.label}</Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.controlsRow}>
        <ControlButton label="Пауза" onPress={pause} disabled={!isPlaying} />
        <ControlButton label="Стоп" onPress={stop} disabled={playerState === 'idle' || playerState === 'stopped'} />
        <View style={styles.loopBox}>
          <Text style={styles.loopLabel}>Повтор</Text>
          <Switch value={loop} onValueChange={setLoop} />
        </View>
      </View>

      <View style={styles.controlsRow}>
        <ControlButton label={playerState === 'preparing' ? 'Подготовка…' : 'Воспроизвести'} onPress={prepareAndStart} disabled={playerState === 'preparing'} />
      </View>

      <View style={styles.controlsRow}>
        <ControlButton label="<< 5с" onPress={() => seekBy(-5000)} />
        <ControlButton label=">> 5с" onPress={() => seekBy(5000)} />
        <ControlButton
          label="Лог"
          onPress={() => {
            setPositionMs(p => p);
          }}
        />
      </View>

      <View style={styles.progressBox}>
        <View style={styles.progressBarBg}>
          <View style={[styles.progressBarFg, {width: `${Math.max(0, Math.min(100, progress * 100))}%`}]} />
        </View>
        <Text style={styles.progressText}>
          {mmss(positionMs)} / {mmss(durationMs)} • {playerState}
        </Text>
      </View>
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
  },
  subtitle: {
    marginTop: 6,
    color: '#616161',
  },
  rowWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 12,
    gap: 8,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#EEEEEE',
    borderRadius: 20,
    marginRight: 8,
    marginBottom: 8,
  },
  chipActive: {
    backgroundColor: '#BBDEFB',
  },
  chipText: {
    color: '#424242',
    fontWeight: '700',
  },
  chipTextActive: {
    color: '#0D47A1',
  },
  controlsRow: {
    flexDirection: 'row',
    marginTop: 12,
    alignItems: 'center',
  },
  loopBox: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 'auto',
  },
  loopLabel: {
    marginRight: 8,
    color: '#424242',
    fontWeight: '700',
  },
  progressBox: {
    marginTop: 16,
  },
  progressBarBg: {
    height: 8,
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    overflow: 'hidden',
  },
  progressBarFg: {
    height: '100%',
    backgroundColor: '#1E88E5',
  },
  progressText: {
    marginTop: 6,
    color: '#424242',
  },
});

export default App_12;



