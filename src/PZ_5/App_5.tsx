import React, {useState} from 'react';
import {
  Alert,
  ImageBackground,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';

type TimeOfDay = 'morning' | 'day' | 'evening' | 'night';

const App_5 = () => {
  const [currentTime, setCurrentTime] = useState<TimeOfDay>('morning');

  const changeTime = (time: TimeOfDay) => {
    setCurrentTime(time);
    let title = '';
    let message = '';
    switch (time) {
      case 'morning':
        title = 'Утро';
        message = 'Пора разбудить дракончика и привести в порядок его комнату!';
        break;
      case 'day':
        title = 'День';
        message = 'Покорми дракончика волшебными фруктами!';
        break;
      case 'evening':
        title = 'Вечер';
        message = 'Поиграй с дракончиком в замке!';
        break;
      case 'night':
        title = 'Ночь';
        message = 'Уложи дракончика спать и полюбуйся звездами!';
        break;
    }

    Alert.alert(title, message, [{text: 'OK'}]);
    if (Platform.OS === 'android') {
      ToastAndroid.show(`${title}: ${message}`, ToastAndroid.SHORT);
    }
  };

  const backgrounds: Record<TimeOfDay, any> = {
    morning: require('./assets/dragon_morning.png'),
    day: require('./assets/dragon_day.png'),
    evening: require('./assets/dragon_evening.png'),
    night: require('./assets/dragon_night.png'),
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeTime('morning')}>
          <Text style={styles.buttonText}>Утро</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeTime('day')}>
          <Text style={styles.buttonText}>День</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeTime('evening')}>
          <Text style={styles.buttonText}>Вечер</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.button}
          onPress={() => changeTime('night')}>
          <Text style={styles.buttonText}>Ночь</Text>
        </TouchableOpacity>
      </View>
      <ImageBackground
        source={backgrounds[currentTime]}
        style={styles.background}
        resizeMode="cover">
        {currentTime === 'morning' && (
          <>
            <TouchableOpacity
              style={[
                styles.interactiveButton,
                {top: '20%', left: '40%', width: 100, height: 100},
              ]}
              onPress={() =>
                ToastAndroid.show(
                  'Волшебный дракончик! Он любит приключения.',
                  ToastAndroid.LONG,
                )
              }
            />
            <TouchableOpacity
              style={[
                styles.interactiveButton,
                {top: '50%', left: '10%', width: 80, height: 80},
              ]}
              onPress={() =>
                ToastAndroid.show(
                  'Кровать дракончика. Нужно ее заправить!',
                  ToastAndroid.LONG,
                )
              }
            />
            <TouchableOpacity
              style={[
                styles.interactiveButton,
                {top: '30%', left: '70%', width: 60, height: 60},
              ]}
              onPress={() =>
                ToastAndroid.show(
                  'Окно в замок. Открой, чтобы впустить свет!',
                  ToastAndroid.LONG,
                )
              }
            />
            <TouchableOpacity
              style={[
                styles.interactiveButton,
                {top: '60%', left: '50%', width: 70, height: 70},
              ]}
              onPress={() =>
                ToastAndroid.show(
                  'Миска с едой. Дракончик голоден по утрам!',
                  ToastAndroid.LONG,
                )
              }
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
