declare module 'react-native-sqlite-storage' {
  export interface SQLiteDatabase {
    executeSql: (
      sql: string,
      params?: any[],
      success?: (result: any) => void,
      error?: (error: any) => void,
    ) => void;
    close: () => void;
  }

  export default {
    openDatabase: (
      options: {name: string; location?: string},
      success?: (db: SQLiteDatabase) => void,
      error?: (error: any) => void,
    ) => SQLiteDatabase,
  };
}
