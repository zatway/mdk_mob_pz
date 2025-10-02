import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ImageBackground,
  ToastAndroid,
  Alert,
  Platform,
} from 'react-native';

type TimeOfDay = 'morning' | 'day' | 'evening' | 'night';

const App_5: React.FC = () => {
  const [currentTime, setCurrentTime] = useState<TimeOfDay>('morning');

  const changeTime = (time: TimeOfDay) => {
    setCurrentTime(time);
    let title = '';
    let message = '';
    switch (time) {
      case 'morning':
        title = 'Утро';
        message = 'Пора покормить котика завтраком!';
        break;
      case 'day':
        title = 'День';
        message = 'Время обеда для котика!';
        break;
      case 'evening':
        title = 'Вечер';
        message = 'Ужин для милого котика!';
        break;
      case 'night':
        title = 'Ночь';
        message = 'Ночной перекус или время сна для котика!';
        break;
    }

    Alert.alert(title, message, [{ text: 'OK' }]);
    if (Platform.OS === 'android') {
      ToastAndroid.show(`${title}: ${message}`, ToastAndroid.SHORT);
    }
  };

  const backgrounds: Record<TimeOfDay, {uri: string}> = {
    morning: {uri: './assets/morning.jpg'},
    day: {
      uri: './assets/day.jpg',
    },
    evening: {
      uri: './assets/evening.jpg',
    },
    night: {
      uri: './assets/night.jpg',
    },
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={() => changeTime('morning')}>
          <Text style={styles.buttonText}>Утро</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => changeTime('day')}>
          <Text style={styles.buttonText}>День</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => changeTime('evening')}>
          <Text style={styles.buttonText}>Вечер</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => changeTime('night')}>
          <Text style={styles.buttonText}>Ночь</Text>
        </TouchableOpacity>
      </View>
      <ImageBackground source={backgrounds[currentTime]} style={styles.background} resizeMode="cover">
        {currentTime === 'morning' && (
          <>
            <TouchableOpacity
              style={[styles.interactiveButton, { top: '30%', left: '40%', width: 100, height: 100 }]}
              onPress={() => ToastAndroid.show('Милый котик! Он любит завтракать.', ToastAndroid.LONG)}
            />
            <TouchableOpacity
              style={[styles.interactiveButton, { top: '60%', left: '30%', width: 80, height: 80 }]}
              onPress={() => ToastAndroid.show('Миска для еды. Наполни её вкусняшками!', ToastAndroid.LONG)}
            />
            <TouchableOpacity
              style={[styles.interactiveButton, { top: '50%', left: '60%', width: 60, height: 60 }]}
              onPress={() => ToastAndroid.show('Еда для котика. Свежий корм!', ToastAndroid.LONG)}
            />
            <TouchableOpacity
              style={[styles.interactiveButton, { top: '70%', left: '50%', width: 70, height: 70 }]}
              onPress={() => ToastAndroid.show('Игрушка котика. После еды поиграй!', ToastAndroid.LONG)}
            />
          </>
        )}
      </ImageBackground>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 10,
    backgroundColor: '#ffffff',
  },
  button: {
    padding: 10,
    backgroundColor: '#6200EE',
    borderRadius: 5,
  },
  buttonText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  interactiveButton: {
    position: 'absolute',
    backgroundColor: 'transparent',
    opacity: 0,
  },
});

export default App_5;
