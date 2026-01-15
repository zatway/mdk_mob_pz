import React, { useEffect, useState, useCallback } from 'react';
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
  ViewStyle,
} from 'react-native';
import { commonStyles } from '../styles/commonStyles';
import { colors } from '../styles/colors.ts';
import {ConnectFetch} from './ConnectFetch.ts';
import {StaticWeatherAnalyze} from './StaticWeatherAnalyze.ts';

const API_KEY = '6024451a53cc956ea99b639a491a7b5c';

const WeatherApp: React.FC = () => {
  const [city, setCity] = useState('Оренбург');
  const [loading, setLoading] = useState(false);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [iconUrl, setIconUrl] = useState('');

  const fetchWeather = useCallback(async (searchCity: string) => {
    const trimmedCity = searchCity.trim();
    if (!trimmedCity) {
      Alert.alert('Ошибка', 'Введите название города');
      return;
    }

    setLoading(true);
    const data = await ConnectFetch.getJSON(trimmedCity, API_KEY);

    if (data) {
      setWeatherData(data);
      setIconUrl(ConnectFetch.getIconUrl(data));
    } else {
      Alert.alert('Ошибка', `Город "${trimmedCity}" не найден`);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchWeather(city);
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {/* Секция поиска */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          value={city}
          onChangeText={setCity}
          placeholder="Введите город"
          placeholderTextColor="#9E9E9E"
        />
        <TouchableOpacity
          style={[styles.searchButton, loading && { opacity: 0.7 }]}
          onPress={() => fetchWeather(city)}
          disabled={loading}
        >
          <Text style={styles.searchButtonText}>Поиск</Text>
        </TouchableOpacity>
      </View>

      {/* Основной контент */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={colors.primaryPurple} />
          <Text style={styles.loadingText}>Загрузка...</Text>
        </View>
      ) : weatherData ? (
        <View style={styles.weatherContainer}>
          <Text style={styles.cityField}>{StaticWeatherAnalyze.getCityField(weatherData)}</Text>
          <Text style={styles.updatedField}>{StaticWeatherAnalyze.formatTime(weatherData.dt)}</Text>

          {iconUrl && <Image source={{ uri: iconUrl }} style={styles.weatherIcon} />}

          <Text style={styles.detailsField}>{StaticWeatherAnalyze.getDetails(weatherData)}</Text>
          <Text style={styles.temperatureField}>{weatherData.main.temp.toFixed(1)} ℃</Text>
        </View>
      ) : (
        <View style={styles.center}>
          <Text style={styles.emptyText}>Город не найден. Попробуйте другой запрос.</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: colors.backgroundGrey,
    alignItems: 'center',
  },
  searchInput: {
    flex: 1,
    height: 45,
    backgroundColor: colors.white,
    borderRadius: 8,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: colors.divider,
    marginRight: 8,
  },
  searchButton: {
    backgroundColor: colors.primaryPurple,
    height: 45,
    paddingHorizontal: 20,
    borderRadius: 8,
    justifyContent: 'center',
  },
  searchButtonText: { color: colors.white, fontWeight: 'bold' },
  center: { flex: 1, justifyContent: 'center', alignItems: 'center', padding: 20 },
  weatherContainer: { flex: 1, alignItems: 'center', padding: 20 },
  cityField: { fontSize: 26, fontWeight: 'bold', color: colors.textPrimary, marginTop: 20 },
  updatedField: { color: colors.textTertiary, marginBottom: 20 },
  weatherIcon: { width: 150, height: 150 },
  iconPlaceholder: { fontSize: 100, marginVertical: 20 },
  detailsField: { textAlign: 'center', fontSize: 16, lineHeight: 24, color: colors.textSecondary },
  temperatureField: { fontSize: 48, fontWeight: 'bold', marginTop: 'auto', marginBottom: 40 },
  loadingText: { marginTop: 10, color: colors.textTertiary },
  emptyText: { color: colors.greyMedium, textAlign: 'center' },
});

export default WeatherApp;
