import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../models/Patient';
import {Contact} from '../models/Contact';
import {Address} from '../models/Address';
import {EmergencyInfo} from '../models/EmergencyInfo';
import {Variables} from './variables';
import {DateManager} from './dateManager';

export class PatientsFormManager {
  private PrimaryInfoForm: FormGroup;
  private ContactInfoForm: FormGroup;
  private AddressForm: FormGroup;
  private EmergencyInfoForm: FormGroup;


  get primaryInfoForm() {
    return this.PrimaryInfoForm;
  }

  set primaryInfoForm(value) {
    this.PrimaryInfoForm = value;
  }

  get contactInfoForm() {
    return this.ContactInfoForm;
  }

  set contactInfoForm(value) {
    this.ContactInfoForm = value;
  }

  get addressForm() {
    return this.AddressForm;
  }

  set addressForm(value) {
    this.AddressForm = value;
  }

  get emergencyInfoForm() {
    return this.EmergencyInfoForm;
  }

  set emergencyInfoForm(value) {
    this.EmergencyInfoForm = value;
  }

  constructor(private formBuilder: FormBuilder) {
    const result = this.getFormBuilder();
    this.primaryInfoForm = result.primaryInfoForm;
    this.contactInfoForm = result.contactInfoForm;
    this.addressForm = result.addressForm;
    this.emergencyInfoForm = result.emergencyInfoForm;
  }


  updateForm(patient: Patient) {
    // primary info
    this.primaryInfoForm.setValue({
      patientTitleId: patient.patientTitleId,
      firstName: patient.firstName,
      middleName: patient.middleName,
      lastName: patient.lastName,
      gender: patient.gender,
      dateOfBirth: patient.dateOfBirth,
      age: patient.age,
      nationality: patient.nationality,
    });

    this.contactInfoForm.setValue({
      email: patient.contact.email,
      primaryPhoneNumber: patient.contact.phoneNumber,
      alternatePhoneNumber: patient.contact.alternatePhoneNumber,
    });

    this.addressForm.setValue({
      line1: patient.address.line1,
      line2: patient.address.line2,
      city: patient.address.city,
      country: patient.address.country,
    });

    this.emergencyInfoForm.setValue({
      title: patient.emergencyInfo.emergencyTitleId,
      name: patient.emergencyInfo.name,
      primaryPhoneNumber: patient.emergencyInfo.phoneNumber,
      alternatePhoneNumber: patient.emergencyInfo.alternatePhoneNumber,
    });
  }

  bindDateToNewPatient() {
    const contactInfo = new Contact(
      this.contactInfoForm.get('primaryPhoneNumber').value,
      this.contactInfoForm.get('email').value,
      this.contactInfoForm.get('alternatePhoneNumber').value,
    );

    const addressInfo = new Address(
      this.addressForm.get('line1').value,
      this.addressForm.get('line2').value,
      this.addressForm.get('city').value,
      this.addressForm.get('country').value
    );

    const emergencyInfo = new EmergencyInfo(
      this.emergencyInfoForm.get('title').value,
      this.emergencyInfoForm.get('name').value,
      this.emergencyInfoForm.get('primaryPhoneNumber').value,
      this.emergencyInfoForm.get('alternatePhoneNumber').value
    );

    return new Patient(
      Variables.currentDate,
      this.primaryInfoForm.get('patientTitleId').value || Variables.defaultPatientTitleId,
      this.primaryInfoForm.get('firstName').value,
      this.primaryInfoForm.get('middleName').value,
      this.primaryInfoForm.get('lastName').value,
      this.primaryInfoForm.get('gender').value,
      this.primaryInfoForm.get('dateOfBirth').value,
      this.primaryInfoForm.get('age').value,
      contactInfo,
      addressInfo,
      emergencyInfo,
      this.primaryInfoForm.get('nationality').value,
    );

  }

  bindDateToOldPatient(patient: Patient) {
    // update patient it self
    patient.patientTitleId = this.primaryInfoForm.get('patientTitleId').value;
    patient.firstName = this.primaryInfoForm.get('firstName').value;
    patient.middleName = this.primaryInfoForm.get('middleName').value;
    patient.lastName = this.primaryInfoForm.get('lastName').value;
    patient.gender = this.primaryInfoForm.get('gender').value;
    patient.dateOfBirth = this.primaryInfoForm.get('dateOfBirth').value;
    patient.age = this.primaryInfoForm.get('age').value;
    patient.nationality = this.primaryInfoForm.get('nationality').value;

    // update patient's contact
    patient.contact.phoneNumber = this.contactInfoForm.get('primaryPhoneNumber').value;
    patient.contact.alternatePhoneNumber = this.contactInfoForm.get('alternatePhoneNumber').value;
    patient.contact.email = this.contactInfoForm.get('email').value;

    // update patient's address
    patient.address.line1 = this.addressForm.get('line1').value;
    patient.address.line2 = this.addressForm.get('line2').value;
    patient.address.city = this.addressForm.get('city').value;
    patient.address.country = this.addressForm.get('country').value;


    // update patient's emergency info
    patient.emergencyInfo.name = this.emergencyInfoForm.get('name').value;
    patient.emergencyInfo.emergencyTitleId = this.emergencyInfoForm.get('title').value;
    patient.emergencyInfo.phoneNumber = this.emergencyInfoForm.get('primaryPhoneNumber').value;
    patient.emergencyInfo.alternatePhoneNumber = this.emergencyInfoForm.get('alternatePhoneNumber').value;

    return patient;
  }

  private getFormBuilder() {
    const primaryInfoForm = this.formBuilder.group({
      patientTitleId: [''],
      firstName: ['', Validators.required],
      middleName: [''],
      lastName: [''],
      gender: [''],
      dateOfBirth: [''],
      age: [''],
      nationality: [''],
    });

    const contactInfoForm = this.formBuilder.group({
      email: ['', Validators.email],
      primaryPhoneNumber: ['', Validators.required],
      alternatePhoneNumber: ['']
    });

    const addressForm = this.formBuilder.group({
      line1: [''],
      line2: [''],
      city: [''],
      country: [''],
    });

    const emergencyInfoForm = this.formBuilder.group({
      title: [''],
      name: [''],
      primaryPhoneNumber: [''],
      alternatePhoneNumber: [''],
    });
    return {primaryInfoForm, contactInfoForm, addressForm, emergencyInfoForm};
  }

  birthDateFromAge() {
    const age = this.primaryInfoForm.get('age').value;
    this.primaryInfoForm.get('dateOfBirth').setValue(DateManager.getDateFromAge(age));
  }


}
