export class EmergencyInfo {
  titleId: number;
  name: string;
  phoneNumber: string;
  alternatePhoneNumber: string;


  constructor(titleId?: number, name?: string, phoneNumber?: string, alternatePhoneNumber?: string) {
    this.titleId = titleId;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.alternatePhoneNumber = alternatePhoneNumber;
  }
}
