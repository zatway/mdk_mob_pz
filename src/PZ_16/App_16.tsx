import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  Alert, ViewStyle, TextStyle,
} from 'react-native';
import {DatabaseHelper} from './DatabaseHelper';
import { colors } from '../styles/colors';
import {commonStyles} from '../styles/commonStyles.ts';

type User = {
  id: number;
  name: string;
  age: number;
  email: string;
};

type Screen = 'Main' | 'User';

const App_16: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('Main');
  const [users, setUsers] = useState<User[]>([]);
  const [editingUserId, setEditingUserId] = useState<number | null>(null);
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [email, setEmail] = useState('');
  const dbHelper = DatabaseHelper.getInstance();

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const allUsers = await dbHelper.getAllUsers();
      setUsers(allUsers);
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось загрузить пользователей');
    }
  };

  const goHome = () => {
    setScreen('Main');
    setEditingUserId(null);
    setName('');
    setAge('');
    setEmail('');
    loadUsers();
  };

  const openUserActivity = (userId: number | null = null) => {
    setEditingUserId(userId);
    if (userId) {
      // Редактирование - загружаем данные пользователя
      dbHelper.getUserById(userId).then((user) => {
        if (user) {
          setName(user.name);
          setAge(String(user.age));
          setEmail(user.email || '');
        }
      });
    } else {
      // Добавление - очищаем поля
      setName('');
      setAge('');
      setEmail('');
    }
    setScreen('User');
  };

  const saveUser = async () => {
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
      if (editingUserId) {
        // UPDATE
        await dbHelper.updateUser(editingUserId, name.trim(), ageNum, email.trim());
        Alert.alert('Успех', 'Пользователь обновлен');
      } else {
        // INSERT
        await dbHelper.insertUser(name.trim(), ageNum, email.trim());
        Alert.alert('Успех', 'Пользователь добавлен');
      }
      goHome();
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось сохранить пользователя');
    }
  };

  const deleteUser = async () => {
    if (!editingUserId) return;

    Alert.alert('Подтверждение', 'Удалить пользователя?', [
      {text: 'Отмена', style: 'cancel'},
      {
        text: 'Удалить',
        style: 'destructive',
        onPress: async () => {
          try {
            await dbHelper.deleteUser(editingUserId);
            Alert.alert('Успех', 'Пользователь удален');
            goHome();
          } catch (error) {
            Alert.alert('Ошибка', 'Не удалось удалить пользователя');
          }
        },
      },
    ]);
  };

  // MainActivity - список пользователей
  if (screen === 'Main') {
    const renderUser = ({item}: {item: User}) => (
      <TouchableOpacity
        style={styles.userItem}
        onPress={() => openUserActivity(item.id)}>
        <View style={styles.userInfo}>
          <Text style={styles.userName}>{item.name}</Text>
          <Text style={styles.userDetails}>
            Возраст: {item.age} {item.email ? `• Email: ${item.email}` : ''}
          </Text>
        </View>
        <Text style={styles.arrow}>→</Text>
      </TouchableOpacity>
    );

    return (
      <SafeAreaView style={styles.container}>

        <TouchableOpacity
          style={styles.addButton}
          onPress={() => openUserActivity(null)}>
          <Text style={styles.addButtonText}>+ Добавить пользователя</Text>
        </TouchableOpacity>

        <FlatList
          data={users}
          keyExtractor={(item) => String(item.id)}
          renderItem={renderUser}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          ListEmptyComponent={
            <View style={styles.emptyContainer}>
              <Text style={styles.emptyText}>Нет пользователей</Text>
              <Text style={styles.emptySubtext}>Нажмите кнопку выше для добавления</Text>
            </View>
          }
        />
      </SafeAreaView>
    );
  }

  // UserActivity - форма добавления/редактирования
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>
        {editingUserId ? 'Редактирование пользователя' : 'Добавление пользователя'}
      </Text>

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

        <Text style={styles.label}>Email (дополнительное поле):</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Введите email"
          keyboardType="email-address"
        />
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.button, styles.saveButton]} onPress={saveUser}>
          <Text style={styles.buttonText}>
            {editingUserId ? 'Обновить' : 'Добавить'}
          </Text>
        </TouchableOpacity>

        {editingUserId ? (
          <TouchableOpacity style={[styles.button, styles.deleteButton]} onPress={deleteUser}>
            <Text style={styles.buttonText}>Удалить</Text>
          </TouchableOpacity>
        ) : null}
      </View>

      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={goHome}>
        <Text style={styles.buttonText}>Назад к списку</Text>
      </TouchableOpacity>
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
  addButton: {
    backgroundColor: colors.success,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    ...commonStyles.buttonText,
  } as TextStyle,
  userItem: {
    ...commonStyles.rowSpaceBetween,
    backgroundColor: colors.backgroundListItem,
    padding: 16,
    borderRadius: 12,
  } as ViewStyle,
  userInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: 4,
  },
  userDetails: {
    fontSize: 14,
    color: colors.textTertiary,
  },
  arrow: {
    fontSize: 20,
    color: colors.greyMedium,
    marginLeft: 12,
  },
  separator: {
    height: 8,
  },
  emptyContainer: {
    alignItems: 'center',
    paddingVertical: 40,
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.greyMedium,
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: colors.greyBorder,
  },
  form: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.textSecondary,
    marginBottom: 8,
    marginTop: 12,
  },
  input: {
    ...commonStyles.input,
    paddingVertical: 12,
  },
  buttonsRow: {
    ...commonStyles.row,
    marginBottom: 12,
    gap: 8,
  } as ViewStyle,
  button: {
    flex: 1,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButton: {
    backgroundColor: colors.primaryPurple,
  },
  deleteButton: {
    backgroundColor: colors.danger,
  },
  cancelButton: {
    backgroundColor: colors.greyMedium,
    marginTop: 8,
  },
  buttonText: {
    ...commonStyles.buttonText,
  } as TextStyle,
});

export default App_16;
