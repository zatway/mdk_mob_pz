import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from 'react-native';

type Contact = {
  id: string;
  name: string;
  phone: string;
};

const initialContacts: Contact[] = [
  {id: '1', name: 'Иван Иванов', phone: '+7 900 000-00-01'},
  {id: '2', name: 'Мария Петрова', phone: '+7 900 000-00-02'},
  {id: '3', name: 'Павел Смирнов', phone: '+7 900 000-00-03'},
];

const App_10: React.FC = () => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');

  const canAdd = useMemo(() => name.trim().length > 0 && phone.trim().length > 0, [name, phone]);
  const canRemove = selectedIds.size > 0;

  const addContact = () => {
    if (!canAdd) {
      Alert.alert('Ошибка', 'Заполните имя и телефон.');
      return;
    }
    const newContact: Contact = {
      id: String(Date.now()),
      name: name.trim(),
      phone: phone.trim(),
    };
    setContacts(prev => [newContact, ...prev]);
    setName('');
    setPhone('');
  };

  const toggleSelect = (id: string) => {
    setSelectedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const removeSelected = () => {
    if (!canRemove) return;
    setContacts(prev => prev.filter(c => !selectedIds.has(c.id)));
    setSelectedIds(new Set());
  };

  const renderItem = ({item}: {item: Contact}) => {
    const selected = selectedIds.has(item.id);
    return (
      <TouchableOpacity onPress={() => toggleSelect(item.id)}>
        <View style={[styles.itemRow, selected && styles.itemRowSelected]}>
          <View style={styles.itemAvatar}>
            <Text style={styles.itemAvatarText}>{item.name.slice(0, 1)}</Text>
          </View>
          <View style={styles.itemTextBox}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPhone}>{item.phone}</Text>
          </View>
          {selected && <Text style={styles.itemCheck}>✓</Text>}
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Добавление и удаление в списке</Text>

      <View style={styles.controlsRow}>
        <TextInput
          style={[styles.input, {flex: 1}]}
          placeholder="Имя"
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={[styles.input, {flex: 1, marginLeft: 8}]}
          placeholder="Телефон"
          value={phone}
          onChangeText={setPhone}
          keyboardType="phone-pad"
        />
      </View>

      <View style={styles.buttonsRow}>
        <TouchableOpacity style={[styles.btn, !canAdd && styles.btnDisabled]} onPress={addContact} disabled={!canAdd}>
          <Text style={styles.btnText}>+ Добавить</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.btn, !canRemove && styles.btnDisabled]} onPress={removeSelected} disabled={!canRemove}>
          <Text style={styles.btnText}>- Удалить выбранные</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={{marginTop: 12}}
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{height: 8}} />}
        extraData={selectedIds}
      />
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
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
    marginBottom: 12,
  },
  controlsRow: {
    flexDirection: 'row',
  },
  buttonsRow: {
    flexDirection: 'row',
    marginTop: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E0E0E0',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#FAFAFA',
  },
  btn: {
    flex: 1,
    backgroundColor: '#1E88E5',
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  btnDisabled: {
    backgroundColor: '#90CAF9',
  },
  btnText: {
    color: '#ffffff',
    fontWeight: '700',
  },
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    padding: 12,
  },
  itemRowSelected: {
    backgroundColor: '#E3F2FD',
    borderWidth: 1,
    borderColor: '#90CAF9',
  },
  itemAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#BBDEFB',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  itemAvatarText: {
    color: '#0D47A1',
    fontWeight: '700',
  },
  itemTextBox: {
    flex: 1,
  },
  itemName: {
    color: '#212121',
    fontWeight: '700',
  },
  itemPhone: {
    color: '#616161',
    marginTop: 2,
  },
  itemCheck: {
    color: '#1E88E5',
    fontWeight: '700',
    fontSize: 18,
    marginLeft: 8,
  },
});

export default App_10;


