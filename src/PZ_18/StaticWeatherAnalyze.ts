// StaticWeatherAnalyze - класс для анализа JSON данных о погоде
export class StaticWeatherAnalyze {
  // Получение поля города (название + страна)
  static getCityField(json: any): string {
    try {
      const city = json.name?.toUpperCase() || 'N/A';
      const country = json.sys?.country || '';
      return country ? `${city}, ${country}` : city;
    } catch (error) {
      console.error('getCityField error:', error);
      return 'NaN';
    }
  }

  // Получение времени последнего обновления
  static getLastUpdateTime(json: any): string {
    try {
      const dt = json.dt;
      if (!dt) return 'NaN';
      
      const date = new Date(dt * 1000);
      const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      };
      return date.toLocaleString('ru-RU', options);
    } catch (error) {
      console.error('getLastUpdateTime error:', error);
      return 'NaN';
    }
  }

  // Получение поля с деталями (описание, влажность, давление)
  static getDetailsField(json: any): string {
    try {
      const weather = json.weather?.[0];
      const main = json.main;
      
      if (!weather || !main) return 'NaN';
      
      const description = weather.description?.toUpperCase() || 'N/A';
      const humidity = main.humidity || 'N/A';
      const pressure = main.pressure || 'N/A';
      
      return `${description}\nВлажность: ${humidity}%\nДавление: ${pressure} hPa`;
    } catch (error) {
      console.error('getDetailsField error:', error);
      return 'NaN';
    }
  }

  // Получение поля температуры
  static getTemperatureField(json: any): string {
    try {
      const main = json.main;
      if (!main || main.temp === undefined) return 'NaN';
      
      const temp = main.temp;
      return `${temp.toFixed(2)} ℃`;
    } catch (error) {
      console.error('getTemperatureField error:', error);
      return 'NaN';
    }
  }

  // Получение описания погоды
  static getWeatherDescription(json: any): string {
    try {
      const weather = json.weather?.[0];
      return weather?.description?.toUpperCase() || 'N/A';
    } catch (error) {
      console.error('getWeatherDescription error:', error);
      return 'NaN';
    }
  }
}

