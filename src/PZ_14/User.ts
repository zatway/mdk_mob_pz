export class User {
  name: string;
  age: number;

  constructor(name: string, age: number) {
    this.name = name;
    this.age = age;
  }

  getName(): string {
    return this.name;
  }

  setName(name: string): void {
    this.name = name;
  }

  getAge(): number {
    return this.age;
  }

  setAge(age: number): void {
    this.age = age;
  }

  toJSON(): string {
    return JSON.stringify({name: this.name, age: this.age});
  }

  static fromJSON(json: string): User {
    const data = JSON.parse(json);
    return new User(data.name, data.age);
  }
}
