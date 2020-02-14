export class Contact {
  email: string;
  phoneNumber: string;
  alternatePhoneNumber: string;

  constructor(phoneNumber: string, email?: string, alternatePhoneNumber?: string) {
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.alternatePhoneNumber = alternatePhoneNumber;
  }

  toString() {
    let result = '';
    if (this.email !== undefined) {
      result = result + 'Email <br>' + this.email + '<br>';
    }
    if (this.phoneNumber !== undefined) {
      result = result + ' PhoneNumber <br>' + this.phoneNumber + '<br>';
    }
    if (this.alternatePhoneNumber !== undefined) {
      result = result + ' AlternatePhoneNumber <br>' + this.alternatePhoneNumber;
    }

    return result;
  }
}
