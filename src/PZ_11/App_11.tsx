import React, {useState} from 'react';
import {SafeAreaView, View, Text, TextInput, StyleSheet, FlatList, TouchableOpacity, Alert} from 'react-native';

type Product = {
  id: string;
  title: string;
  quantity: number;
  unit: string;
};

const initialProducts: Product[] = [
  {id: '1', title: 'Яблоки', quantity: 2, unit: 'кг'},
  {id: '2', title: 'Молоко', quantity: 1, unit: 'л'},
  {id: '3', title: 'Хлеб', quantity: 1, unit: 'шт'},
];

const App_11: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [title, setTitle] = useState('');
  const [quantity, setQuantity] = useState('');
  const [unit, setUnit] = useState('шт');

  const addNew = () => {
    if (!title.trim()) return Alert.alert('Ошибка', 'Введите название товара');
    const q = Number(quantity || '0');
    if (!Number.isFinite(q) || q <= 0) return Alert.alert('Ошибка', 'Количество должно быть больше 0');
    if (!unit.trim()) return Alert.alert('Ошибка', 'Введите единицу измерения');
    const p: Product = {id: String(Date.now()), title: title.trim(), quantity: q, unit: unit.trim()};
    setProducts(prev => [p, ...prev]);
    setTitle('');
    setQuantity('');
    setUnit('шт');
  };

  const changeQty = (id: string, delta: number) => {
    setProducts(prev =>
      prev.map(p => (p.id === id ? {...p, quantity: Math.max(0, p.quantity + delta)} : p)),
    );
  };

  const removeIfZero = (id: string) => {
    setProducts(prev => prev.filter(p => !(p.id === id && p.quantity === 0)));
  };

  const renderItem = ({item}: {item: Product}) => {
    return (
      <View style={styles.itemRow}>
        <View style={{flex: 1}}>
          <Text style={styles.itemTitle}>{item.title}</Text>
          <Text style={styles.itemMeta}>
            {item.quantity} {item.unit}
          </Text>
        </View>
        <View style={styles.itemButtons}>
          <TouchableOpacity style={styles.smallBtn} onPress={() => changeQty(item.id, -1)}>
            <Text style={styles.smallBtnText}>-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.smallBtn} onPress={() => changeQty(item.id, +1)}>
            <Text style={styles.smallBtnText}>+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.smallBtn, {backgroundColor: '#E53935'}]} onPress={() => removeIfZero(item.id)}>
            <Text style={styles.smallBtnText}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Сложный список товаров</Text>

      <View style={styles.newRow}>
        <TextInput style={[styles.input, {flex: 1}]} placeholder="Название" value={title} onChangeText={setTitle} />
      </View>
      <View style={styles.newRow}>
        <TextInput style={[styles.input, {flex: 1}]} placeholder="Количество" value={quantity} onChangeText={setQuantity} keyboardType="numeric" />
        <TextInput style={[styles.input, {flex: 1, marginLeft: 8}]} placeholder="Ед. изм." value={unit} onChangeText={setUnit} />
      </View>
      <TouchableOpacity style={styles.addBtn} onPress={addNew}>
        <Text style={styles.addBtnText}>Добавить товар</Text>
      </TouchableOpacity>

      <FlatList
        style={{marginTop: 12}}
        data={products}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={{height: 8}} />}
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
  },
  newRow: {
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
  addBtn: {
    marginTop: 10,
    backgroundColor: '#1E88E5',
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: 'center',
  },
  addBtnText: {
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
  itemTitle: {
    color: '#212121',
    fontWeight: '700',
  },
  itemMeta: {
    color: '#616161',
    marginTop: 2,
  },
  itemButtons: {
    flexDirection: 'row',
    marginLeft: 8,
  },
  smallBtn: {
    backgroundColor: '#43A047',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
    marginLeft: 6,
  },
  smallBtnText: {
    color: '#ffffff',
    fontWeight: '800',
    fontSize: 16,
  },
});

export default App_11;




