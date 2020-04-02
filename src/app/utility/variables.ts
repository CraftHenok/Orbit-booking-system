export class Variables {

  static dialogSmallWidth = '400px';
  static dialogBigWidth = '500px';
  static defaultAge = 0;
  static defaultPatientTitleId = 1;
  static currentDate = new Date();
  static doctorRoleName = 'D';
  static adminRoleName = 'A';
  static receptionRoleName = 'R';
  static actions = {
    deleted: 'D',
    saved: 'S',
    updated: 'U'
  };
  static status = [
    'Approved',
    'Pending',
    'Suspended'
  ];
}
