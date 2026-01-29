import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity, ViewStyle,
} from 'react-native';
import {commonStyles} from '../styles/commonStyles.ts';
import {colors} from '../styles/colors.ts';

type TabKey = 'home' | 'search' | 'favorites' | 'settings';

const TABS: {key: TabKey; label: string; emoji: string}[] = [
  {key: 'home', label: 'Главная', emoji: '🏠'},
  {key: 'search', label: 'Поиск', emoji: '🔍'},
  {key: 'favorites', label: 'Избранное', emoji: '❤️'},
  {key: 'settings', label: 'Настройки', emoji: '⚙️'},
];

const App_7: React.FC = () => {
  const [active, setActive] = useState<TabKey>('home');

  const imageSource = useMemo(() => {
    switch (active) {
      case 'home':
        return require('../PZ_5/assets/day.png');
      case 'search':
        return require('../PZ_5/assets/evening.png');
      case 'favorites':
        return require('../PZ_5/assets/morning.png');
      case 'settings':
        return require('../PZ_5/assets/night.png');
    }
  }, [active]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Image source={imageSource} style={styles.image} resizeMode="contain" />
      </View>

      <View style={styles.bottomNav}>
        {TABS.map(tab => {
          const isActive = tab.key === active;
          return (
            <TouchableOpacity
              key={tab.key}
              accessibilityRole="button"
              accessibilityState={{selected: isActive}}
              style={styles.navItem}
              onPress={() => setActive(tab.key)}>
              <Text style={[styles.navEmoji, {color: isActive ? colors.primaryPurple : colors.greyMedium}]}>
                {tab.emoji}
              </Text>
              <Text style={[styles.navLabel, {color: isActive ?  colors.primaryPurple :  colors.greyMedium}]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...commonStyles.container,
    backgroundColor: colors.white,
  },
  content: {
    ...commonStyles.containerCentered,
  } as ViewStyle,
  image: {
    width: '90%',
    height: '80%',
    borderRadius: 12,
  },
  bottomNav: {
    ...commonStyles.row,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: colors.divider,
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: colors.backgroundLight,
  } as ViewStyle,
  navItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
  },
  navEmoji: {
    fontSize: 22,
  },
  navLabel: {
    fontSize: 12,
    marginTop: 2,
    fontWeight: '600',
  },
});

export default App_7;


