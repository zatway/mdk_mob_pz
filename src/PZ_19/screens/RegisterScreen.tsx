import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import DatePicker from 'react-native-date-picker';

// Импортируем новую функцию из Firebase Database
import {registerUser} from '../db/Database';
import {User} from '../db/models';
import {colors} from '../../styles/colors.ts';

interface RegisterScreenProps {
  setLogin: (user: User) => void;
  onLogin: () => void;
}

const RegisterScreen = ({setLogin, onLogin}: RegisterScreenProps) => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    if (!email || !password || !birthDate || !name.trim()) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    if(password.length < 6) {
      Alert.alert('Ошибка', 'Длина пароля должна быть не менее 6 символов');
      return;
    }

    if(!email.includes('@')) {
      Alert.alert('Ошибка', 'Почта не корректна');
      return;
    }

    setLoading(true);
    const dayOfBirth = birthDate.toISOString().split('T')[0];

    const user = await registerUser(email, password, name.trim(), dayOfBirth);

    setLoading(false);

    if (user) {
      setLogin(user);
    } else {
      Alert.alert('Ошибка', 'Не удалось зарегистрироваться (проверьте Email или интернет)');
    }
  };

  const showDatePicker = () => setOpen(true);
  const hideDatePicker = () => setOpen(false);

  const formattedDate = birthDate
    ? birthDate.toLocaleDateString('ru-RU', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    : '';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Регистрация</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        placeholder="Имя"
        value={name}
        onChangeText={setName}
      />

      <TouchableOpacity
        style={styles.dateInput}
        onPress={showDatePicker}
        activeOpacity={0.7}>
        <Text style={birthDate ? styles.dateText : styles.placeholderText}>
          {birthDate ? formattedDate : 'Дата рождения'}
        </Text>
      </TouchableOpacity>

      <TextInput
        style={styles.input}
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color={colors.primaryPurple} />
      ) : (
        <Button
          title="Зарегистрироваться"
          onPress={handleRegister}
          color={colors.primaryPurple}
        />
      )}

      <Button
        title="Уже есть аккаунт → Войти"
        onPress={onLogin}
        color={colors.info}
      />

      <DatePicker
        modal
        open={open}
        date={birthDate ?? new Date(2000, 0, 1)}
        onConfirm={date => {
          setBirthDate(date);
          hideDatePicker();
        }}
        onCancel={hideDatePicker}
        mode="date"
        locale="ru"
      />
    </View>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, justifyContent: 'center'},
  title: {fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center'},
  input: {borderWidth: 1, borderColor: colors.info, padding: 12, marginBottom: 16, borderRadius: 8},
  dateInput: {borderWidth: 1, borderColor: colors.info, padding: 12, marginBottom: 16, borderRadius: 8},
  dateText: {fontSize: 14},
  placeholderText: {fontSize: 16, color: colors.black},
});
