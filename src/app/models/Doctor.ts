import {Account} from './Account';

/**
 * Doctor
 */
export class Doctor extends Account {
  id: number;

  /**
   * displayOrder
   * the order of the doctor relative to other doctors
   * example: doctor with displayOrder 1 is in the first place
   */
  displayOrder: number;

  constructor(email: string, password: string, role: string, username: string,
              status: string, displayOrder: number) {
    super(email, password, role, username, status);
    this.displayOrder = displayOrder;
  }
}
