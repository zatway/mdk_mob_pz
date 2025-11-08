import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import MethodChip from './MethodChip.tsx';
import LabeledInput from './LabeledInput.tsx';
import {UserSerializable} from './UserSerializable.ts';
import {UserParcelable} from './UserParcelable.ts';

type TransferMethod = 'putExtra' | 'serializable' | 'parcelable';

type Screen = 'Main' | 'Second';

const App_8: React.FC = () => {
  const [screen, setScreen] = useState<Screen>('Main');
  const [method, setMethod] = useState<TransferMethod>('putExtra');

  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [age, setAge] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const [receivedBundle, setReceivedBundle] = useState<Record<
    string,
    any
  > | null>(null);
  const [receivedSerializable, setReceivedSerializable] =
    useState<UserSerializable | null>(null);
  const [receivedParcelable, setReceivedParcelable] =
    useState<UserParcelable | null>(null);

  const isValid = useMemo(() => {
    if (!name.trim()) return false;
    if (!age.trim()) return false;
    const ageNum = Number(age);
    return !(!Number.isFinite(ageNum) || ageNum < 0);
  }, [name, age]);

  const onSave = () => {
    if (!isValid) {
      Alert.alert(
        'Ошибка',
        'Поля "Имя" и "Возраст" обязательны. Проверьте введённые данные.',
      );
      return;
    }

    const ageNum = Number(age);

    switch (method) {
      case 'putExtra': {
        const bundle = {
          name,
          company,
          age: ageNum,
          phone: phone || undefined,
          address: address || undefined,
        };
        setReceivedBundle(bundle);
        setReceivedSerializable(null);
        setReceivedParcelable(null);
        break;
      }
      case 'serializable': {
        const user: UserSerializable = {
          name,
          company,
          age: ageNum,
          phone: phone || undefined,
          address: address || undefined,
        };
        setReceivedSerializable(
          JSON.parse(JSON.stringify(user)) as UserSerializable,
        );
        setReceivedBundle(null);
        setReceivedParcelable(null);
        break;
      }
      case 'parcelable': {
        const user = new UserParcelable({
          name,
          company,
          age: ageNum,
          phone: phone || undefined,
          address: address || undefined,
        });
        // Simulate parcel write/read cycle
        const blob = user.writeToParcel();
        const recreated = UserParcelable.createFromParcel(blob);
        setReceivedParcelable(recreated);
        setReceivedBundle(null);
        setReceivedSerializable(null);
        break;
      }
    }

    setScreen('Second');
  };

  const reset = () => {
    setScreen('Main');
    setReceivedBundle(null);
    setReceivedSerializable(null);
    setReceivedParcelable(null);
  };

  if (screen === 'Second') {
    const lines: {label: string; value: string | number | undefined}[] = [];
    if (method === 'putExtra' && receivedBundle) {
      lines.push(
        {label: 'name', value: receivedBundle.name},
        {label: 'company', value: receivedBundle.company},
        {label: 'age', value: receivedBundle.age},
        {label: 'phone', value: receivedBundle.phone},
        {label: 'address', value: receivedBundle.address},
      );
    } else if (method === 'serializable' && receivedSerializable) {
      lines.push(
        {label: 'name', value: receivedSerializable.name},
        {label: 'company', value: receivedSerializable.company},
        {label: 'age', value: receivedSerializable.age},
        {label: 'phone', value: receivedSerializable.phone},
        {label: 'address', value: receivedSerializable.address},
      );
    } else if (method === 'parcelable' && receivedParcelable) {
      lines.push(
        {label: 'name', value: receivedParcelable.name},
        {label: 'company', value: receivedParcelable.company},
        {label: 'age', value: receivedParcelable.age},
        {label: 'phone', value: receivedParcelable.phone},
        {label: 'address', value: receivedParcelable.address},
      );
    }

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.headerRow}>
          <TouchableOpacity style={styles.backButton} onPress={reset}>
            <Text style={styles.backText}>Назад</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{method}</Text>
        </View>
        <View style={styles.resultBox}>
          {lines.map(item => (
            <Text key={item.label} style={styles.resultLine}>
              {item.label}: {String(item.value ?? '')}
            </Text>
          ))}
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>MainActivity</Text>

      <View style={styles.methodsRow}>
        <MethodChip
          label="putExtra()"
          selected={method === 'putExtra'}
          onPress={() => setMethod('putExtra')}
        />
        <MethodChip
          label="Serializable"
          selected={method === 'serializable'}
          onPress={() => setMethod('serializable')}
        />
        <MethodChip
          label="Parcelable"
          selected={method === 'parcelable'}
          onPress={() => setMethod('parcelable')}
        />
      </View>

      <View style={styles.form}>
        <LabeledInput
          label="Имя*"
          value={name}
          onChangeText={setName}
          placeholder="Введите имя"
        />
        <LabeledInput
          label="Компания"
          value={company}
          onChangeText={setCompany}
          placeholder="Введите компанию"
        />
        <LabeledInput
          label="Возраст*"
          value={age}
          onChangeText={setAge}
          placeholder="Например, 21"
          keyboardType="numeric"
        />
        <LabeledInput
          label="Телефон"
          value={phone}
          onChangeText={setPhone}
          placeholder="+7 ..."
          keyboardType="phone-pad"
        />
        <LabeledInput
          label="Адрес"
          value={address}
          onChangeText={setAddress}
          placeholder="Город, улица"
        />
      </View>

      <TouchableOpacity
        style={[styles.saveButton, !isValid && styles.saveButtonDisabled]}
        onPress={onSave}
        disabled={!isValid}>
        <Text style={styles.saveText}>Сохранить и передать</Text>
      </TouchableOpacity>
      <Text style={styles.hint}>* Обязательные поля: Имя, Возраст</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 16,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#EEEEEE',
    borderRadius: 8,
    marginRight: 12,
  },
  backText: {
    color: '#1E88E5',
    fontWeight: '600',
  },
  title: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212121',
  },
  methodsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  form: {
    marginTop: 16,
  },
  saveButton: {
    marginTop: 8,
    backgroundColor: '#1E88E5',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  saveButtonDisabled: {
    backgroundColor: '#90CAF9',
  },
  saveText: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  hint: {
    marginTop: 6,
    color: '#757575',
    fontSize: 12,
  },
  resultBox: {
    marginTop: 12,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    padding: 12,
  },
  resultLine: {
    fontSize: 16,
    color: '#212121',
    marginVertical: 4,
  },
});

export default App_8;


