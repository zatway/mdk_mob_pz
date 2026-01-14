export class StaticWeatherAnalyze {
  static getCityField(data: WeatherData): string {
    return `${data.name.toUpperCase()}, ${data.sys.country}`;
  }

  static getDetails(data: WeatherData): string {
    const desc = data.weather[0]?.description.toUpperCase();
    return `${desc}\nВлажность: ${data.main.humidity}%\nДавление: ${data.main.pressure} hPa`;
  }

  static formatTime(dt: number): string {
    return new Date(dt * 1000).toLocaleString('ru-RU', {
      day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit'
    });
  }
}
