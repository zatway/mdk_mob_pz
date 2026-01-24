import React, {useState} from 'react';
import {View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator} from 'react-native';
import {loginUser} from '../db/Database';
import {User} from '../db/models';
import {colors} from '../../styles/colors.ts';

interface LoginScreenProps {
  setLogin: (user: User) => void;
  onRegister: () => void;
}

const LoginScreen = ({setLogin, onRegister}: LoginScreenProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Ошибка', 'Заполните все поля');
      return;
    }

    setLoading(true);
    const user = await loginUser(email, password);
    setLoading(false);

    if (user) {
      setLogin(user);
    } else {
      Alert.alert('Ошибка', 'Неверный email или пароль');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Вход</Text>
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
        placeholder="Пароль"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      {loading ? (
        <ActivityIndicator size="large" color={colors.primaryPurple} />
      ) : (
        <Button title="Войти" onPress={handleLogin} color={colors.primaryPurple} />
      )}

      <View style={{marginTop: 10}}>
        <Button
          title="Регистрация"
          color={colors.info}
          onPress={() => onRegister()}
        />
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {flex: 1, padding: 20, justifyContent: 'center'},
  title: {fontSize: 28, fontWeight: 'bold', marginBottom: 30, textAlign: 'center'},
  input: {borderWidth: 1, borderColor: colors.info, padding: 12, marginBottom: 16, borderRadius: 6},
});
