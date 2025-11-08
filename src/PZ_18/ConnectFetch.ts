// ConnectFetch - класс для получения данных о погоде через API OpenWeatherMap
export class ConnectFetch {
  private static readonly OPEN_WEATHER_MAP_API =
    'https://api.openweathermap.org/data/2.5/weather?q=%s&appid=%s&units=metric';
  private static readonly OPEN_WEATHER_ICON = 'https://openweathermap.org/img/wn/%s@2x.png';

  // Получение JSON данных о погоде
  static async getJSON(city: string, apiKey: string): Promise<any | null> {
    try {
      // Заменяем первый %s на город, второй %s на API ключ
      const urlString = this.OPEN_WEATHER_MAP_API
        .replace('%s', encodeURIComponent(city))
        .replace('%s', apiKey);
      const response = await fetch(urlString);

      if (!response.ok) {
        return null;
      }

      const data = await response.json();

      // Проверяем код ответа (200 = успех)
      if (data.cod !== 200) {
        return null;
      }

      return data;
    } catch (error) {
      console.error('ConnectFetch error:', error);
      return null;
    }
  }

  // Получение URL иконки погоды
  static getIconUrl(json: any): string {
    try {
      if (json.weather && json.weather[0] && json.weather[0].icon) {
        const icon = json.weather[0].icon;
        return this.OPEN_WEATHER_ICON.replace('%s', icon);
      }
    } catch (error) {
      console.error('getIconUrl error:', error);
    }
    return '';
  }
}

