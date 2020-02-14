export class Doctor {
  seq: number;
  name: string;
  username: string;
  password: string;
  displayOrder: number;
  manageBlock: boolean;
  manageBooking: boolean;
  isDoctor: boolean;

  constructor(seq: number, name: string, username: string, password: string, displayOrder: number,
              manageBlock: boolean, manageBooking: boolean, isDoctor: boolean) {
    this.seq = seq;
    this.name = name;
    this.username = username;
    this.password = password;
    this.displayOrder = displayOrder;
    this.manageBlock = manageBlock;
    this.manageBooking = manageBooking;
    this.isDoctor = isDoctor;
  }
}
