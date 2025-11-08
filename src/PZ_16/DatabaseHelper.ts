import SQLite, {SQLiteDatabase} from 'react-native-sqlite-storage';

// DatabaseHelper класс (аналог SQLiteOpenHelper)
export class DatabaseHelper {
  private static instance: DatabaseHelper | null = null;
  private db: SQLiteDatabase | null = null;
  private readonly DB_NAME = 'users.db';
  private readonly DB_VERSION = 1;

  static getInstance(): DatabaseHelper {
    if (!DatabaseHelper.instance) {
      DatabaseHelper.instance = new DatabaseHelper();
    }
    return DatabaseHelper.instance;
  }

  async openDatabase(): Promise<SQLiteDatabase> {
    if (this.db) {
      return this.db;
    }

    return new Promise((resolve, reject) => {
      SQLite.openDatabase(
        {
          name: this.DB_NAME,
          location: 'default',
        },
        (db: any) => {
          this.db = db;
          this.createTables();
          resolve(db);
        },
        (error: any) => {
          reject(error);
        },
      );
    });
  }

  private async createTables() {
    if (!this.db) return;

    // Таблица пользователей
    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        age INTEGER NOT NULL,
        email TEXT
      )
    `;

    // Таблица адресов (дополнительная таблица по заданию)
    const createAddressesTable = `
      CREATE TABLE IF NOT EXISTS addresses (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER NOT NULL,
        address TEXT NOT NULL,
        city TEXT,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `;

    return new Promise<void>((resolve, reject) => {
      this.db!.executeSql(
        createUsersTable,
        [],
        () => {
          this.db!.executeSql(
            createAddressesTable,
            [],
            () => resolve(),
            (error: any) => reject(error),
          );
        },
        (error) => reject(error),
      );
    });
  }

  // INSERT
  async insertUser(name: string, age: number, email: string = ''): Promise<number> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      db.executeSql(
        'INSERT INTO users (name, age, email) VALUES (?, ?, ?)',
        [name, age, email],
        (result: any) => {
          resolve(result.insertId);
        },
        (error: any) => {
          reject(error);
        },
      );
    });
  }

  // UPDATE
  async updateUser(id: number, name: string, age: number, email: string = ''): Promise<number> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      db.executeSql(
        'UPDATE users SET name = ?, age = ?, email = ? WHERE id = ?',
        [name, age, email, id],
        (result: any) => {
          resolve(result.rowsAffected);
        },
        (error: any) => {
          reject(error);
        },
      );
    });
  }

  // DELETE
  async deleteUser(id: number): Promise<number> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      db.executeSql(
        'DELETE FROM users WHERE id = ?',
        [id],
        (result: any) => {
          resolve(result.rowsAffected);
        },
        (error: any) => {
          reject(error);
        },
      );
    });
  }

  // SELECT ALL
  async getAllUsers(): Promise<any[]> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      db.executeSql(
        'SELECT * FROM users ORDER BY id DESC',
        [],
        (result: any) => {
          const users = [];
          for (let i = 0; i < result.rows.length; i++) {
            users.push(result.rows.item(i));
          }
          resolve(users);
        },
        (error: any) => {
          reject(error);
        },
      );
    });
  }

  // SELECT BY ID
  async getUserById(id: number): Promise<any | null> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      db.executeSql(
        'SELECT * FROM users WHERE id = ?',
        [id],
        (result: any) => {
          if (result.rows.length > 0) {
            resolve(result.rows.item(0));
          } else {
            resolve(null);
          }
        },
        (error: any) => {
          reject(error);
        },
      );
    });
  }

  // Работа с адресами (дополнительная таблица)
  async insertAddress(userId: number, address: string, city: string = ''): Promise<number> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      db.executeSql(
        'INSERT INTO addresses (user_id, address, city) VALUES (?, ?, ?)',
        [userId, address, city],
        (result: any) => {
          resolve(result.insertId);
        },
        (error: any) => {
          reject(error);
        },
      );
    });
  }

  async getAddressesByUserId(userId: number): Promise<any[]> {
    const db = await this.openDatabase();
    return new Promise((resolve, reject) => {
      db.executeSql(
        'SELECT * FROM addresses WHERE user_id = ?',
        [userId],
        (result: any) => {
          const addresses = [];
          for (let i = 0; i < result.rows.length; i++) {
            addresses.push(result.rows.item(i));
          }
          resolve(addresses);
        },
        (error: any) => {
          reject(error);
        },
      );
    });
  }

  closeDatabase() {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }
}
