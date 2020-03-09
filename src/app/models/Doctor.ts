export class Doctor {
  seq: number;
  name: string;
  username: string;
  password: string;
  displayOrder: number;
  manageBlocks: boolean;
  manageBooking: boolean;
  isDoctor: boolean;

  static getAllDoctorsTemplate() {
    return new Doctor(0, 'All doctors', 'All doctors', '',
      0, false, false, true);
  }

  constructor(seq: number, name: string, username: string, password: string, displayOrder: number,
              manageBlock: boolean, manageBooking: boolean, isDoctor: boolean) {
    this.seq = seq;
    this.name = name;
    this.username = username;
    this.password = password;
    this.displayOrder = displayOrder;
    this.manageBlocks = manageBlock;
    this.manageBooking = manageBooking;
    this.isDoctor = isDoctor;
  }
}
