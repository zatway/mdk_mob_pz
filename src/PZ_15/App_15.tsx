import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  ScrollView,
  Alert,
  Platform,
} from 'react-native';
import RNFS from 'react-native-fs';
import {colors} from '../styles/colors';
import AsyncStorage from '@react-native-async-storage/async-storage';

const FILE_NAME = 'note.txt';
const ASYNC_KEY = 'noteText';

const App_15 = () => {
  const [text, setText] = useState('');
  const [internalUri, setInternalUri] = useState<string | null>(null);
  const [externalUri, setExternalUri] = useState<string | null>(null);
  const [status, setStatus] = useState('Готов');
  const [useExternal, setUseExternal] = useState(false);

  useEffect(() => {
    const internalPath = `${RNFS.DocumentDirectoryPath}/${FILE_NAME}`;
    const externalPath = RNFS.ExternalDirectoryPath
      ? `${RNFS.ExternalDirectoryPath}/${FILE_NAME}`
      : null;

    setInternalUri(internalPath);
    setExternalUri(externalPath);

    loadFromAsyncStorage();

    readFromFile();
  }, []);

  useEffect(() => {
    const saveAsync = async () => {
      if (text.trim()) {
        await AsyncStorage.setItem(ASYNC_KEY, text).catch(console.warn);
      }
    };
    saveAsync();
  }, [text]);

  const loadFromAsyncStorage = async () => {
    try {
      const saved = await AsyncStorage.getItem(ASYNC_KEY);
      if (saved) {
        setText(saved);
        setStatus('Восстановлено из быстрого хранилища');
      }
    } catch (err) {
      console.warn('AsyncStorage', err);
    }
  };

  const getCurrentPath = () => (useExternal ? externalUri : internalUri) || '';

  const saveToFile = async () => {
    const path = getCurrentPath();
    if (!path) {
      setStatus('Путь не определён');
      return;
    }

    setStatus('Сохранение');

    try {
      await RNFS.writeFile(path, text, 'utf8');
      setStatus(
        `Сохранено в ${useExternal ? 'внешнее' : 'внутреннее'} хранилище`,
      );
      Alert.alert('Успех', `Файл сохранён:\n${path}`);
    } catch (err: any) {
      setStatus('Ошибка сохранения');
      Alert.alert('Ошибка', err.message || String(err));
    }
  };

  const readFromFile = async () => {
    const path = getCurrentPath();
    if (!path) {
      return;
    }

    setStatus('Чтение');

    try {
      const exists = await RNFS.exists(path);
      if (!exists) {
        setStatus('Файл ещё не существует');
        return;
      }

      const content = await RNFS.readFile(path, 'utf8');
      setText(content);
      setStatus(
        `Прочитано из ${useExternal ? 'внешнего' : 'внутреннего'} файла`,
      );
    } catch (err: any) {
      setStatus('Ошибка чтения или файл отсутствует');
      console.warn(err);
    }
  };

  const clearFile = async () => {
    const path = getCurrentPath();
    if (!path) {
      return;
    }

    try {
      const exists = await RNFS.exists(path);
      if (exists) {
        await RNFS.unlink(path);
      }
      setText('');
      await AsyncStorage.removeItem(ASYNC_KEY);
      setStatus('Файл удалён, кэш очищен');
      Alert.alert('Очищено', 'Заметка и временное состояние удалены');
    } catch (err: any) {
      Alert.alert('Ошибка удаления', err.message || String(err));
    }
  };

  const currentPath = getCurrentPath();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoCard}>
        <Text style={styles.label}>Текущее хранилище:</Text>
        <Text style={styles.value}>
          {useExternal
            ? 'Внешнее приватное'
            : 'Внутреннее'}
        </Text>

        <TouchableOpacity
          style={styles.switchBtn}
          onPress={() => setUseExternal(!useExternal)}>
          <Text style={styles.switchText}>
            Переключить на {useExternal ? 'внутреннее' : 'внешнее'}
          </Text>
        </TouchableOpacity>

        <Text style={styles.label}>Путь к файлу:</Text>
        <Text style={styles.path} selectable>
          {currentPath || 'Загружается'}
        </Text>

        <Text style={styles.label}>Статус: {status}</Text>
      </View>

      <TextInput
        style={styles.input}
        multiline
        numberOfLines={10}
        placeholder="Текс заметки"
        placeholderTextColor={colors.textHint}
        value={text}
        onChangeText={setText}
        textAlignVertical="top"
      />

      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.btnPrimary} onPress={saveToFile}>
          <Text style={styles.btnText}>Сохранить</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.btnSecondary} onPress={readFromFile}>
          <Text style={styles.btnText}>Прочитать</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.btnDanger} onPress={clearFile}>
        <Text style={styles.btnText}>Очистить файл и кэш</Text>
      </TouchableOpacity>

      <ScrollView style={styles.previewContainer}>
        <Text style={styles.previewTitle}>Текущий текст:</Text>
        <Text style={styles.previewText}>{text || 'пусто'}</Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundGrey,
    padding: 16,
  },
  infoCard: {
    backgroundColor: colors.backgroundLight,
    borderRadius: 12,
    padding: 14,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.divider,
  },
  label: {
    fontSize: 13,
    color: colors.textSecondary,
    marginTop: 6,
    marginBottom: 2,
  },
  value: {
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: '500',
  },
  switchBtn: {
    alignSelf: 'flex-start',
    marginVertical: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: colors.primary,
    borderRadius: 8,
  },
  switchText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: '600',
  },
  path: {
    fontSize: 12,
    color: colors.greyBorder,
    fontFamily: Platform.OS === 'ios' ? 'Menlo' : 'monospace',
    marginBottom: 8,
  },
  input: {
    backgroundColor: colors.white,
    borderWidth: 1,
    borderColor: colors.greyBorder,
    borderRadius: 12,
    padding: 14,
    fontSize: 16,
    color: colors.textPrimary,
    minHeight: 160,
    marginBottom: 16,
    shadowColor: colors.black,
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.08,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  btnPrimary: {
    flex: 1,
    backgroundColor: colors.primaryPurple,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 8,
  },
  btnSecondary: {
    flex: 1,
    backgroundColor: colors.info,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 8,
  },
  btnDanger: {
    backgroundColor: colors.danger,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  btnText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: '600',
  },
  previewContainer: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: colors.divider,
    flex: 1,
  },
  previewTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
    marginBottom: 8,
  },
  previewText: {
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 22,
  },
});

export default App_15;
