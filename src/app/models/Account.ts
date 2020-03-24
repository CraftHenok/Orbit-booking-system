export class Account {
  email: string;
  password: string;
  role: string;
  username: string;
  status: string;

  constructor(email: string, password: string, role: string,
              username: string, status: string) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.username = username;
    this.status = status;
  }
}
