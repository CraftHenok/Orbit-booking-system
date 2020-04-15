import {Contact} from './Contact';
import {Address} from './Address';
import {EmergencyInfo} from './EmergencyInfo';

export class Patient {
  id: number;
  regDate: Date;

  // primary info
  patientTitleId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  age: number;
  nationality: string;
  active = false;

  contactId: string;
  addressId: string;
  emergencyInfoId: string;


  // optional fields
  contact: Contact;
  address: Address;
  emergencyInfo: EmergencyInfo;


  // ui related addition information
  code: string;

  constructor(regDate: Date, patientTitleId: number, firstName: string, middleName: string,
              lastName: string, gender: string, dateOfBirth: Date, age: number,
              contactInfo: Contact, address: Address, emergencyInfo: EmergencyInfo, nationality?: string) {
    this.regDate = regDate;
    this.patientTitleId = patientTitleId;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.age = age;
    this.nationality = nationality;
    this.contact = contactInfo;
    this.address = address;
    this.emergencyInfo = emergencyInfo;
  }
}
