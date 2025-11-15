import SQLite, { SQLiteDatabase } from 'react-native-sqlite-storage';

export class DatabaseHelper {
  private static instance: DatabaseHelper | null = null;
  private db: SQLiteDatabase | null = null;
  private readonly DB_NAME = 'users.db';

  static getInstance(): DatabaseHelper {
    if (!DatabaseHelper.instance) {
      DatabaseHelper.instance = new DatabaseHelper();
    }
    return DatabaseHelper.instance;
  }

  async openDatabase(): Promise<SQLiteDatabase> {
    if (this.db) return this.db;

    return new Promise((resolve, reject) => {
      SQLite.openDatabase(
        {
          name: this.DB_NAME,
          location: 'default',
        },
        async (db: SQLiteDatabase) => {
          this.db = db;
          try {
            await this.createTables(); // ждем создания таблиц
            resolve(db);
          } catch (error) {
            reject(error);
          }
        },
        (error) => reject(error)
      );
    });
  }

  private async createTables(): Promise<void> {
    if (!this.db) return;

    const createUsersTable = `
      CREATE TABLE IF NOT EXISTS users (
                                         id INTEGER PRIMARY KEY AUTOINCREMENT,
                                         name TEXT NOT NULL,
                                         age INTEGER NOT NULL,
                                         email TEXT
      );`;

    const createAddressesTable = `
      CREATE TABLE IF NOT EXISTS addresses (
                                             id INTEGER PRIMARY KEY AUTOINCREMENT,
                                             user_id INTEGER NOT NULL,
                                             address TEXT NOT NULL,
                                             city TEXT,
                                             FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        );`;

    await this.executeSqlAsync(createUsersTable);
    await this.executeSqlAsync(createAddressesTable);
  }

  private async executeSqlAsync(sql: string, params: any[] = []): Promise<any> {
    if (!this.db) throw new Error('Database not opened');

    return new Promise((resolve, reject) => {
      this.db!.executeSql(
        sql,
        params,
        (result) => resolve(result), // тут только result
        (error) => reject(error)     // и тут только error
      );
    });
  }

  // INSERT USER
  async insertUser(name: string, age: number, email: string = ''): Promise<number> {
    const result = await this.executeSqlAsync(
      'INSERT INTO users (name, age, email) VALUES (?, ?, ?)',
      [name, age, email]
    );
    return result.insertId!;
  }

  // UPDATE USER
  async updateUser(id: number, name: string, age: number, email: string = ''): Promise<number> {
    const result = await this.executeSqlAsync(
      'UPDATE users SET name = ?, age = ?, email = ? WHERE id = ?',
      [name, age, email, id]
    );
    return result.rowsAffected!;
  }

  // DELETE USER
  async deleteUser(id: number): Promise<number> {
    const result = await this.executeSqlAsync('DELETE FROM users WHERE id = ?', [id]);
    return result.rowsAffected!;
  }

  // GET ALL USERS
  async getAllUsers(): Promise<any[]> {
    const result = await this.executeSqlAsync('SELECT * FROM users ORDER BY id DESC');
    const users: any[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      users.push(result.rows.item(i));
    }
    return users;
  }

  // GET USER BY ID
  async getUserById(id: number): Promise<any | null> {
    const result = await this.executeSqlAsync('SELECT * FROM users WHERE id = ?', [id]);
    return result.rows.length > 0 ? result.rows.item(0) : null;
  }

  // INSERT ADDRESS
  async insertAddress(userId: number, address: string, city: string = ''): Promise<number> {
    const result = await this.executeSqlAsync(
      'INSERT INTO addresses (user_id, address, city) VALUES (?, ?, ?)',
      [userId, address, city]
    );
    return result.insertId!;
  }

  // GET ADDRESSES BY USER ID
  async getAddressesByUserId(userId: number): Promise<any[]> {
    const result = await this.executeSqlAsync('SELECT * FROM addresses WHERE user_id = ?', [userId]);
    const addresses: any[] = [];
    for (let i = 0; i < result.rows.length; i++) {
      addresses.push(result.rows.item(i));
    }
    return addresses;
  }

  // CLOSE DATABASE
  async closeDatabase(): Promise<void> {
    if (this.db) {
      await this.db.close();
      this.db = null;
    }
  }
}
