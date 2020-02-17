export class Contact {
  id: string;
  email: string;
  phoneNumber: string;
  alternatePhoneNumber: string;

  constructor(phoneNumber: string, email?: string, alternatePhoneNumber?: string) {
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.alternatePhoneNumber = alternatePhoneNumber;
  }
}
