/**
 * Account
 * holds user data
 */
export class Account {
  id: number;
  email: string;
  password: string;

  /**
   * role of the use such as
   * Admin
   * Reception
   * Doctor
   */
  role: string;
  username: string;

  /**
   * Status of the user
   * status can be one of
   * Approved
   * Pending
   * Suspended
   */
  status: string;
  token: string;

  constructor(email: string, password: string, role: string,
              username: string, status: string) {
    this.email = email;
    this.password = password;
    this.role = role;
    this.username = username;
    this.status = status;
  }
}
