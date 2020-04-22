import {Account} from './Account';
import {Variables} from '../utility/variables';

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

  constructor(email: string, password: string, username: string,
              status: string, displayOrder: number) {
    super(email, password, Variables.doctorRoleName, username, status);
    this.displayOrder = displayOrder;
  }
}
