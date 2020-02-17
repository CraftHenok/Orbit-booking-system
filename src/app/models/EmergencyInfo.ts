export class EmergencyInfo {
  id: string;
  emergencyTitleId: number;
  name: string;
  phoneNumber: string;
  alternatePhoneNumber: string;


  constructor(titleId?: number, name?: string, phoneNumber?: string, alternatePhoneNumber?: string) {
    this.emergencyTitleId = titleId;
    this.name = name;
    this.phoneNumber = phoneNumber;
    this.alternatePhoneNumber = alternatePhoneNumber;
  }
}
