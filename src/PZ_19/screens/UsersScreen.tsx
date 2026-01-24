import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {getAllUsers, logoutUser} from '../db/Database'; // Импортируем logoutUser
import {User} from '../db/models';
import {calculateAge} from '../calculateAge.ts';
import {colors} from '../../styles/colors.ts';
import UserEditorScreen from './UserEditorScreen';

interface UsersScreenProps {
  authorizedUser: User;
  logout: () => void; // Колбэк для очистки стейта в App.tsx
}

const UsersScreen = ({authorizedUser, logout}: UsersScreenProps) => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setLoading(true);
    const data = await getAllUsers();
    setUsers(data);
    setLoading(false);
  };

  const handleLogout = async () => {
    await logoutUser(); // Выход из Firebase
    logout(); // Очистка локального стейта
  };

  const onEditSuccess = () => {
    setIsEditing(false);
    setSelectedUser(null);
    loadUsers();
  };

  const onEditCancel = () => {
    setIsEditing(false);
  };

  const renderItem = ({item}: {item: User}) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => setSelectedUser(item)}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.status}>
        {item.status ? item.status : 'Нет статуса'}
      </Text>
    </TouchableOpacity>
  );

  if (isEditing && selectedUser) {
    return (
      <UserEditorScreen
        user={selectedUser}
        onSave={onEditSuccess}
        onCancel={onEditCancel}
      />
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Привет, {authorizedUser.name}!</Text>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Выйти</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>Пользователи</Text>

      {loading ? (
        <ActivityIndicator size="large" color={colors.primaryPurple} />
      ) : (
        <FlatList
          data={users}
          keyExtractor={item => item.id}
          renderItem={renderItem}
          style={{flex: 1}}
          scrollEnabled
        />
      )}

      {selectedUser && (
        <View style={styles.userPanel}>
          <View style={styles.panelHeader}>
            <TouchableOpacity onPress={() => setSelectedUser(null)}>
              <Text style={styles.back}>← Назад</Text>
            </TouchableOpacity>

            {authorizedUser.id === selectedUser.id && (
              <TouchableOpacity
                style={styles.editButton}
                onPress={() => setIsEditing(true)}>
                <Text style={styles.editText}>Ред.</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.panelTitle}>Профиль</Text>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Имя:</Text>
            <Text style={styles.value}>{selectedUser.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Статус:</Text>
            <Text style={styles.value}>
              {selectedUser.status || 'Не установлен'}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Возраст:</Text>
            <Text style={styles.value}>
              {calculateAge(selectedUser.dayOfBirth)}
            </Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.label}>Email:</Text>
            <Text style={styles.value}>{selectedUser.email}</Text>
          </View>
        </View>
      )}
    </SafeAreaView>
  );
};

export default UsersScreen;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.backgroundLight},
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderColor: colors.divider,
    backgroundColor: colors.white,
  },
  logoutButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: colors.warning,
    borderRadius: 8,
  },
  logoutText: {color: colors.white, fontWeight: '600'},
  greeting: {fontSize: 18, fontWeight: 'bold', color: colors.primary},
  title: {fontSize: 22, fontWeight: '600', padding: 16, color: '#333'},
  listItem: {padding: 15, borderBottomWidth: 1, borderColor: '#eee', backgroundColor: '#fff'},
  name: {fontSize: 17, fontWeight: '500', color: '#000'},
  status: {color: 'gray', marginTop: 4, fontStyle: 'italic'},
  userPanel: {
    position: 'absolute', bottom: 0, left: 0, right: 0,
    padding: 20, backgroundColor: '#fff', borderTopWidth: 1, borderColor: colors.primaryPurple,
    elevation: 20, height: '40%',
  },
  panelHeader: {flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10},
  back: {fontSize: 18, color: colors.primaryPurple, fontWeight: '600'},
  editButton: {backgroundColor: colors.primaryPurple, paddingHorizontal: 15, paddingVertical: 5, borderRadius: 5},
  editText: {color: '#fff', fontWeight: 'bold'},
  panelTitle: {fontSize: 24, fontWeight: 'bold', marginBottom: 15, color: '#000'},
  infoRow: {flexDirection: 'row', marginBottom: 8, alignItems: 'center'},
  label: {fontWeight: 'bold', width: 80, fontSize: 16},
  value: {fontSize: 16, flex: 1},
});
