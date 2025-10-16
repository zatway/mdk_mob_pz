import {UserSerializable} from './UserSerializable.ts';

export class UserParcelable {
  name: string;
  company: string;
  age: number;
  phone?: string;
  address?: string;

  constructor(data: UserSerializable) {
    this.name = data.name;
    this.company = data.company;
    this.age = data.age;
    this.phone = data.phone;
    this.address = data.address;
  }

  writeToParcel(): string {
    return JSON.stringify({
      name: this.name,
      company: this.company,
      age: this.age,
      phone: this.phone,
      address: this.address,
    });
  }

  static createFromParcel(blob: string): UserParcelable {
    const parsed = JSON.parse(blob) as UserSerializable;
    return new UserParcelable(parsed);
  }
}
