import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {User} from './User.ts';

const STORAGE_KEY = 'user_data';

const App_14: React.FC = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [savedUser, setSavedUser] = useState<User | null>(null);
  const [imageVisible, setImageVisible] = useState(false);

  // Загрузка данных при старте
  useEffect(() => {
    loadData();
  }, []);

  const saveData = async () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Введите имя');
      return;
    }
    const ageNum = Number(age);
    if (!Number.isFinite(ageNum) || ageNum <= 0) {
      Alert.alert('Ошибка', 'Введите корректный возраст');
      return;
    }

    try {
      const user = new User(name.trim(), ageNum);
      await AsyncStorage.setItem(STORAGE_KEY, user.toJSON());
      Alert.alert('Успех', 'Данные сохранены');
      setImageVisible(true);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить данные');
    }
  };

  const loadData = async () => {
    try {
      const json = await AsyncStorage.getItem(STORAGE_KEY);
      if (json) {
        const user = User.fromJSON(json);
        setSavedUser(user);
        setName(user.getName());
        setAge(String(user.getAge()));
        setImageVisible(true);
      }
    } catch (error) {
      // Данных нет или ошибка чтения
    }
  };

  const getData = () => {
    loadData();
    if (savedUser) {
      Alert.alert(
        'Данные получены',
        `Name: ${savedUser.getName()} Age: ${savedUser.getAge()}`,
      );
    } else {
      Alert.alert('Информация', 'Нет сохраненных данных');
    }
  };

  const clearData = async () => {
    try {
      await AsyncStorage.removeItem(STORAGE_KEY);
      setSavedUser(null);
      setName('');
      setAge('');
      setImageVisible(false);
      Alert.alert('Успех', 'Данные очищены');
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось очистить данные');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Изменение состояния</Text>
      <Text style={styles.subtitle}>Сохранение и восстановление данных User</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Имя:</Text>
        <TextInput
          style={styles.input}
          value={name}
          onChangeText={setName}
          placeholder="Введите имя"
        />

        <Text style={styles.label}>Возраст:</Text>
        <TextInput
          style={styles.input}
          value={age}
          onChangeText={setAge}
          placeholder="Введите возраст"
          keyboardType="numeric"
        />
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveData}>
          <Text style={styles.buttonText}>СОХРАНИТЬ</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.button, styles.getButton]} onPress={getData}>
          <Text style={styles.buttonText}>ПОЛУЧИТЬ ДАННЫЕ</Text>
        </TouchableOpacity>
      </View>

      {savedUser && (
        <View style={styles.dataDisplay}>
          <Text style={styles.dataText}>
            Name: {savedUser.getName()} Age: {savedUser.getAge()}
          </Text>
        </View>
      )}

      {imageVisible && (
        <View style={styles.imageContainer}>
          <Image
            source={require('../PZ_2/image/avatar.png')}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.imageLabel}>Аватар пользователя</Text>
        </View>
      )}

      <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearData}>
        <Text style={styles.buttonText}>Очистить данные</Text>
      </TouchableOpacity>
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
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#424242',
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#FAFAFA',
    fontSize: 16,
  },
  buttonsRow: {
    flexDirection: 'row',
    marginBottom: 16,
    gap: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: '#6200EE',
  },
  getButton: {
    backgroundColor: '#6200EE',
  },
  clearButton: {
    backgroundColor: '#E53935',
    marginTop: 12,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  dataDisplay: {
    backgroundColor: '#F5F5F5',
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  dataText: {
    fontSize: 16,
    color: '#424242',
    fontWeight: '600',
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 16,
    padding: 16,
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 8,
  },
  imageLabel: {
    fontSize: 14,
    color: '#616161',
    fontWeight: '600',
  },
});

export default App_14;
