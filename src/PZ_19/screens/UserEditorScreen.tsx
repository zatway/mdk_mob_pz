import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {User} from '../db/models';
import {updateUser} from '../db/Database';
import {colors} from '../../styles/colors.ts';

interface UserEditorScreenProps {
  user: User;
  onSave: () => void;
  onCancel: () => void;
}

const UserEditorScreen = ({user, onSave, onCancel}: UserEditorScreenProps) => {
  const [name, setName] = useState(user.name);
  const [status, setStatus] = useState(user.status || '');
  const [birthDate, setBirthDate] = useState<Date>(new Date(user.dayOfBirth));
  const [open, setOpen] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) {
      Alert.alert('Ошибка', 'Имя не может быть пустым');
      return;
    }

    const updatedUser: User = {
      ...user,
      name: name.trim(),
      status: status.trim(),
      dayOfBirth: birthDate.toISOString().split('T')[0],
    };

    const success = await updateUser(updatedUser);
    if (success) {
      Alert.alert('Успех', 'Данные сохранены', [{text: 'OK', onPress: onSave}]);
    } else {
      Alert.alert('Ошибка', 'Не удалось сохранить изменения');
    }
  };

  const formattedDate = birthDate.toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Редактирование профиля</Text>

      <Text style={styles.label}>Имя</Text>
      <TextInput
        style={styles.input}
        value={name}
        onChangeText={setName}
        placeholder="Введите имя"
      />

      <Text style={styles.label}>Статус</Text>
      <TextInput
        style={styles.input}
        value={status}
        onChangeText={setStatus}
        placeholder="Введите статус"
      />

      <Text style={styles.label}>Дата рождения</Text>
      <TouchableOpacity
        style={styles.dateInput}
        onPress={() => setOpen(true)}>
        <Text style={styles.dateText}>{formattedDate}</Text>
      </TouchableOpacity>

      <View style={styles.buttonContainer}>
        <View style={styles.buttonWrapper}>
          <Button title="Отмена" onPress={onCancel} color={colors.warning} />
        </View>
        <View style={styles.buttonWrapper}>
          <Button title="Сохранить" onPress={handleSave} color={colors.primaryPurple} />
        </View>
      </View>

      <DatePicker
        modal
        open={open}
        date={birthDate}
        onConfirm={(date) => {
          setOpen(false);
          setBirthDate(date);
        }}
        onCancel={() => setOpen(false)}
        mode="date"
        locale="ru"
      />
    </View>
  );
};

export default UserEditorScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: colors.backgroundLight,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: colors.primaryPurple,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '600',
    color: colors.greyBorder,
  },
  input: {
    borderWidth: 1,
    borderColor: colors.white,
    padding: 12,
    marginBottom: 20,
    borderRadius: 8,
    fontSize: 16,
  },
  dateInput: {
    borderWidth: 1,
    borderColor: colors.white,
    padding: 12,
    marginBottom: 30,
    borderRadius: 8,
    justifyContent: 'center',
  },
  dateText: {
    fontSize: 16,
    color: colors.black,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    width: '45%',
  },
});
