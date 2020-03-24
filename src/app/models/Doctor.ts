import {Account} from './Account';

export class Doctor extends Account {
  id: number;
  displayOrder: number;

  constructor(email: string, password: string, role: string, username: string,
              status: string, id: number, displayOrder: number) {
    super(email, password, role, username, status);
    this.id = id;
    this.displayOrder = displayOrder;
  }
}
