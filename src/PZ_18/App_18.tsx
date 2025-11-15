import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import {ConnectFetch} from './ConnectFetch';
import {StaticWeatherAnalyze} from './StaticWeatherAnalyze';

// API ключ OpenWeatherMap (замените на свой!)
const API_KEY = '6024451a53cc956ea99b639a491a7b5c';

const App_18: React.FC = () => {
  const [city, setCity] = useState('Orenburg');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<any | null>(null);
  const [iconUrl, setIconUrl] = useState<string>('');

  useEffect(() => {
    updateWeatherData(city);
  }, []);

  const updateWeatherData = async (cityName: string) => {
    if (API_KEY === undefined) {
      Alert.alert(
        'Ошибка',
        'Необходимо указать API ключ OpenWeatherMap!',
      );
      return;
    }

    if(cityName.trim() === null || cityName.trim() === undefined) {
      Alert.alert(
        'Ошибка',
        'Не введено название города',
      );
      return;
    }

    setLoading(true);
    try {
      const transliterate = (text: string) =>
        text
          .replace(/а/g, 'a')
          .replace(/б/g, 'b')
          .replace(/в/g, 'v')
          .replace(/г/g, 'g')
          .replace(/д/g, 'd')
          .replace(/е/g, 'e')
          .replace(/ё/g, 'yo')
          .replace(/ж/g, 'zh')
          .replace(/з/g, 'z')
          .replace(/и/g, 'i')
          .replace(/й/g, 'y')
          .replace(/к/g, 'k')
          .replace(/л/g, 'l')
          .replace(/м/g, 'm')
          .replace(/н/g, 'n')
          .replace(/о/g, 'o')
          .replace(/п/g, 'p')
          .replace(/р/g, 'r')
          .replace(/с/g, 's')
          .replace(/т/g, 't')
          .replace(/у/g, 'u')
          .replace(/ф/g, 'f')
          .replace(/х/g, 'kh')
          .replace(/ц/g, 'ts')
          .replace(/ч/g, 'ch')
          .replace(/ш/g, 'sh')
          .replace(/щ/g, 'sch')
          .replace(/ы/g, 'y')
          .replace(/э/g, 'e')
          .replace(/ю/g, 'yu')
          .replace(/я/g, 'ya');

      const cityForQuery = transliterate(city.trim());
      const json = await ConnectFetch.getJSON(cityForQuery, API_KEY);

      if (!json) {
        Alert.alert('Ошибка', `${cityName} - информация не найдена`);
        setWeatherData(null);
        setIconUrl('');
      } else {
        setWeatherData(json);
        const icon = ConnectFetch.getIconUrl(json);
        setIconUrl(icon);
      }
    } catch (error) {
      Alert.alert('Ошибка', 'Не удалось получить данные о погоде');
      setWeatherData(null);
      setIconUrl('');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (city.trim()) {
      updateWeatherData(city.trim());
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={city}
          onChangeText={setCity}
          placeholder="Введите город"
          placeholderTextColor="#9E9E9E"
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch} disabled={loading}>
          <Text style={styles.searchButtonText}>Поиск</Text>
        </TouchableOpacity>
      </View>

      {loading ? (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#6200EE" />
          <Text style={styles.loadingText}>Загрузка данных...</Text>
        </View>
      ) : weatherData ? (
        <View style={styles.weatherContainer}>
          {/* Город (сверху, по центру) */}
          <Text style={styles.cityField}>
            {StaticWeatherAnalyze.getCityField(weatherData)}
          </Text>

          {/* Время последнего обновления (под городом) */}
          <Text style={styles.updatedField}>
            {StaticWeatherAnalyze.getLastUpdateTime(weatherData)}
          </Text>

          {/* Иконка погоды (по центру) */}
          {iconUrl ? (
            <Image
              source={{uri: iconUrl}}
              style={styles.weatherIcon}
              resizeMode="contain"
            />
          ) : (
            <View style={styles.weatherIconPlaceholder}>
              <Text style={styles.weatherIconPlaceholderText}>🌤️</Text>
            </View>
          )}

          {/* Детали (описание, влажность, давление) - под иконкой */}
          <Text style={styles.detailsField}>
            {StaticWeatherAnalyze.getDetailsField(weatherData)}
          </Text>

          {/* Температура (внизу, по центру) */}
          <Text style={styles.temperatureField}>
            {StaticWeatherAnalyze.getTemperatureField(weatherData)}
          </Text>
        </View>
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Введите название города и нажмите "Поиск"</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#F5F5F5',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  searchInput: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 8,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  searchButton: {
    backgroundColor: '#6200EE',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '700',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#616161',
  },
  weatherContainer: {
    flex: 1,
    padding: 16,
  },
  cityField: {
    fontSize: 24,
    fontWeight: '700',
    color: '#212121',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
  },
  updatedField: {
    fontSize: 13,
    color: '#616161',
    textAlign: 'center',
    marginBottom: 20,
  },
  weatherIcon: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    marginVertical: 20,
  },
  weatherIconPlaceholder: {
    width: 200,
    height: 200,
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  weatherIconPlaceholderText: {
    fontSize: 120,
  },
  detailsField: {
    fontSize: 16,
    color: '#424242',
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 24,
  },
  temperatureField: {
    fontSize: 40,
    fontWeight: '700',
    color: '#212121',
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 40,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#9E9E9E',
    textAlign: 'center',
  },
});

export default App_18;

