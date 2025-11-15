import {Alert} from 'react-native';

export class ConnectFetch {
  private static readonly OPEN_WEATHER_MAP_API =
    'https://api.openweathermap.org/data/2.5/weather';
  private static readonly OPEN_WEATHER_ICON =
    'https://openweathermap.org/img/wn/%s@2x.png';

  static async getJSON(city: string, apiKey: string): Promise<any | null> {
    try {
      const urlString = `${this.OPEN_WEATHER_MAP_API}?q=${encodeURIComponent(
        city,
      )}&appid=${apiKey}&units=metric&lang=ru`;

      const response = await fetch(urlString);
      if (!response.ok) {
        console.warn('Ошибка запроса:', response.status);
        return null;
      }

      const data = await response.json();
      if (data.cod !== 200) {
        console.warn('Ошибка в ответе API:', data);
        return null;
      }

      return data;
    } catch (error) {
      console.error('ConnectFetch error:', error);
      return null;
    }
  }

  static getIconUrl(json: any): string {
    try {
      const icon = json?.weather?.[0]?.icon;
      return icon ? this.OPEN_WEATHER_ICON.replace('%s', icon) : '';
    } catch (error) {
      console.error('getIconUrl error:', error);
      return '';
    }
  }
}
