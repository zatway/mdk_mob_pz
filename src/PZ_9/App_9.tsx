import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {parseUsersFromStringArray, usersStringArray, User} from './resources.ts';
import {commonStyles} from '../styles/commonStyles.ts';
import {colors} from '../styles/colors.ts';

const App_9: React.FC = () => {
  const allUsers = useMemo(() => parseUsersFromStringArray(usersStringArray), []);
  const [query, setQuery] = useState('');

  const data = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return allUsers;
    return allUsers.filter((u: User) =>
      [u.name, u.role, u.city].some(v => v.toLowerCase().includes(q)),
    );
  }, [allUsers, query]);

  const renderItem = ({item}: {item: User}) => {
    return (
      <View style={styles.itemRow}>
        <Image source={require('../PZ_2/image/avatar.png')} style={styles.avatar} />
        <View style={styles.itemTextBox}>
          <Text style={styles.itemName}>{item.name}</Text>
          <Text style={styles.itemMeta}>{item.role} • {item.city}</Text>
        </View>
        <TouchableOpacity style={styles.moreBtn} onPress={() => {}}>
          <Text style={styles.moreText}>⋯</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <TextInput
        style={styles.search}
        value={query}
        onChangeText={setQuery}
        placeholder="Поиск по имени, роли или городу"
      />
      <FlatList
        data={data}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        contentContainerStyle={{paddingBottom: 16}}
      />
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
    color: colors.textPrimary,
    fontWeight: '700',
    marginBottom: 12,
  },
  search: {
    ...commonStyles.input,
    marginBottom: 12,
  },
  separator: {
    height: 8,
  },
  itemRow: {
    ...commonStyles.row,
    backgroundColor: colors.backgroundListItem,
    borderRadius: 12,
    padding: 12,
  } as ViewStyle,
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  itemTextBox: {
    flex: 1,
  },
  itemName: {
    fontWeight: '700',
    color: colors.textPrimary,
  },
  itemMeta: {
    marginTop: 2,
    color: colors.textTertiary,
  },
  moreBtn: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  moreText: {
    fontSize: 20,
    color: colors.greyMedium,
  },
});

export default App_9;


