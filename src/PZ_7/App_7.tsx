import React, {useMemo, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';

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

      {/* Bottom navigation */}
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
              <Text style={[styles.navEmoji, {color: isActive ? ACTIVE_COLOR : INACTIVE_COLOR}]}>
                {tab.emoji}
              </Text>
              <Text style={[styles.navLabel, {color: isActive ? ACTIVE_COLOR : INACTIVE_COLOR}]}>
                {tab.label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </SafeAreaView>
  );
};

const ACTIVE_COLOR = '#6200EE';
const INACTIVE_COLOR = '#9E9E9E';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    width: '90%',
    height: '80%',
    borderRadius: 12,
  },
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#E0E0E0',
    paddingVertical: 8,
    paddingHorizontal: 12,
    backgroundColor: '#FAFAFA',
  },
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


