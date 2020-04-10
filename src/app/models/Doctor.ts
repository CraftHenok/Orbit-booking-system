import {Account} from './Account';

export class Doctor extends Account {
  id: number;
  displayOrder: number;

  constructor(email: string, password: string, role: string, username: string,
              status: string, displayOrder: number) {
    super(email, password, role, username, status);
    this.displayOrder = displayOrder;
  }
}
