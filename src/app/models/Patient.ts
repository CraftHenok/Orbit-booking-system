import {Contact} from './Contact';
import {Address} from './Address';
import {EmergencyInfo} from './EmergencyInfo';

export class Patient {
  seq: number;
  regDate: Date;

  // primary info
  titleId: number;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
  dateOfBirth: Date;
  age: number;
  nationality: string;

  // optional fields
  contactInfo: Contact;
  address: Address;
  emergencyInfo: EmergencyInfo;

  // additional info
  active = false;

  constructor(seqNumber: number, regDate: Date, titleId: number, firstName: string, middleName: string,
              lastName: string, gender: string, dateOfBirth: Date, age: number,
              contactInfo: Contact, address: Address, emergencyInfo: EmergencyInfo, nationality?: string) {
    this.seq = seqNumber;
    this.regDate = regDate;
    this.titleId = titleId;
    this.firstName = firstName;
    this.middleName = middleName;
    this.lastName = lastName;
    this.gender = gender;
    this.dateOfBirth = dateOfBirth;
    this.age = age;
    this.nationality = nationality;
    this.contactInfo = contactInfo;
    this.address = address;
    this.emergencyInfo = emergencyInfo;
  }
}
