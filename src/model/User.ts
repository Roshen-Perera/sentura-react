export class User {
  name: string;
  address: string;
  email: string;

  constructor(name: string, address: string, email: string) {
    this.name = name;
    this.address = address;
    this.email = email;
  }
}