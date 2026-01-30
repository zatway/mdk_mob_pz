export interface WeatherData {
  name: string;
  dt: number;
  sys: { country: string };
  main: {
    temp: number;
    humidity: number;
    pressure: number;
  };
  weather: Array<{
    description: string;
    icon: string;
  }>;
}
