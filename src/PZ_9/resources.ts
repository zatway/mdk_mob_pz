export const usersStringArray = [
  'Гадиляев Ислам; Разработчик; Оренбург',
  'Косырев Артем; ФигмаБой; Оренбург',
  'Мария Петрова; Дизайнер; Санкт-Петербург',
  'Павел Смирнов; Тестировщик; Новосибирск',
  'Елена Кузнецова; Менеджер; Екатеринбург',
  'Дмитрий Попов; Аналитик; Казань',
  'Анна Соколова; Маркетолог; Нижний Новгород',
  'Сергей Морозов; DevOps; Челябинск',
  'Ольга Волкова; HR; Самара',
  'Николай Павлов; Архитектор; Омск',
  'Татьяна Федорова; Бизнес-аналитик; Ростов-на-Дону',
];

export type User = {
  id: string;
  name: string;
  role: string;
  city: string;
};

export function parseUsersFromStringArray(data: string[]): User[] {
  return data.map((line, index) => {
    const [name = '', role = '', city = ''] = line.split(';').map(s => s.trim());
    return {id: String(index + 1), name, role, city};
  });
}



