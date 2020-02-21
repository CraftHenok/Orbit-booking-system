import {Contact} from './Contact';
import {Address} from './Address';
import {EmergencyInfo} from './EmergencyInfo';

export class Patient {
  seq: number;
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

  // optional fields
  contact: Contact;
  address: Address;
  emergencyInfo: EmergencyInfo;

  contactId: string;
  addressId: string;
  emergencyInfoId: string;

  // additional info
  active = false;

  // used when we click view on the patient table
  code: string;

  constructor(seqNumber: number, regDate: Date, patientTitleId: number, firstName: string, middleName: string,
              lastName: string, gender: string, dateOfBirth: Date, age: number,
              contactInfo: Contact, address: Address, emergencyInfo: EmergencyInfo, nationality?: string) {
    this.seq = seqNumber;
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
