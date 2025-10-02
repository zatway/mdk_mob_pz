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
  Dimensions,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

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

  const morningImage = require('./assets/morning.png');
  const dayImage = require('./assets/day.png');
  const eveningImage = require('./assets/evening.png');
  const nightImage = require('./assets/night.png');

  const backgrounds: Record<TimeOfDay, any> = {
    morning: morningImage,
    day: dayImage,
    evening: eveningImage,
    night: nightImage,
  };

  const showToast = (message: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.LONG);
    } else {
      Alert.alert('Инфо', message);
    }
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
              style={[
                styles.interactiveButton,
                {
                  top: screenHeight * 0.3,
                  left: screenWidth * 0.4,
                  width: 100,
                  height: 100,
                },
              ]}
              onPress={() => showToast('Милый котик! Он любит завтракать.')}
            />
            <TouchableOpacity
              style={[
                styles.interactiveButton,
                {
                  top: screenHeight * 0.6,
                  left: screenWidth * 0.3,
                  width: 80,
                  height: 80,
                },
              ]}
              onPress={() => showToast('Миска для еды. Наполни её вкусняшками!')}
            />
            <TouchableOpacity
              style={[
                styles.interactiveButton,
                {
                  top: screenHeight * 0.5,
                  left: screenWidth * 0.6,
                  width: 60,
                  height: 60,
                },
              ]}
              onPress={() => showToast('Еда для котика. Свежий корм!')}
            />
            {/* Кнопка для игрушки */}
            <TouchableOpacity
              style={[
                styles.interactiveButton,
                {
                  top: screenHeight * 0.7,
                  left: screenWidth * 0.5,
                  width: 70,
                  height: 70,
                },
              ]}
              onPress={() => showToast('Игрушка котика. После еды поиграй!')}
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
    opacity: 0.5,
  },
});

export default App_5;
