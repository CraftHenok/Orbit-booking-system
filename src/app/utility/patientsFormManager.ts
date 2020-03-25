import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Patient} from '../models/Patient';
import {Contact} from '../models/Contact';
import {Address} from '../models/Address';
import {EmergencyInfo} from '../models/EmergencyInfo';
import {Variables} from './variables';

export class PatientsFormManager {
  constructor(private formBuilder: FormBuilder) {

  }

  static bindDateToNewPatient(primaryInfoForm: FormGroup, contactInfoForm: FormGroup, addressForm: FormGroup,
                              emergencyInfoForm: FormGroup) {
    const contactInfo = new Contact(
      contactInfoForm.get('primaryPhoneNumber').value,
      contactInfoForm.get('email').value,
      contactInfoForm.get('alternatePhoneNumber').value,
    );

    const addressInfo = new Address(
      addressForm.get('line1').value,
      addressForm.get('line2').value,
      addressForm.get('city').value,
      addressForm.get('country').value
    );

    const emergencyInfo = new EmergencyInfo(
      emergencyInfoForm.get('title').value,
      emergencyInfoForm.get('name').value,
      emergencyInfoForm.get('primaryPhoneNumber').value,
      emergencyInfoForm.get('alternatePhoneNumber').value
    );

    return new Patient(
      0,
      Variables.currentDate,
      primaryInfoForm.get('patientTitleId').value || Variables.defaultPatientTitleId,
      primaryInfoForm.get('firstName').value,
      primaryInfoForm.get('middleName').value,
      primaryInfoForm.get('lastName').value,
      primaryInfoForm.get('gender').value,
      primaryInfoForm.get('dateOfBirth').value,
      primaryInfoForm.get('age').value,
      contactInfo,
      addressInfo,
      emergencyInfo,
      primaryInfoForm.get('nationality').value,
    );

  }

  static bindDateToOldPatient(primaryInfoForm: FormGroup, contactInfoForm: FormGroup, addressForm: FormGroup,
                              emergencyInfoForm: FormGroup, patient: Patient) {
    // update patient it self
    patient.patientTitleId = primaryInfoForm.get('patientTitleId').value;
    patient.firstName = primaryInfoForm.get('firstName').value;
    patient.middleName = primaryInfoForm.get('middleName').value;
    patient.lastName = primaryInfoForm.get('lastName').value;
    patient.gender = primaryInfoForm.get('gender').value;
    patient.dateOfBirth = primaryInfoForm.get('dateOfBirth').value;
    patient.age = primaryInfoForm.get('age').value;
    patient.nationality = primaryInfoForm.get('nationality').value;

    // update patient's contact
    patient.contact.phoneNumber = contactInfoForm.get('primaryPhoneNumber').value;
    patient.contact.alternatePhoneNumber = contactInfoForm.get('alternatePhoneNumber').value;
    patient.contact.email = contactInfoForm.get('email').value;

    // update patient's address
    patient.address.line1 = addressForm.get('line1').value;
    patient.address.line2 = addressForm.get('line2').value;
    patient.address.city = addressForm.get('city').value;
    patient.address.country = addressForm.get('country').value;


    // update patient's emergency info
    patient.emergencyInfo.name = emergencyInfoForm.get('name').value;
    patient.emergencyInfo.emergencyTitleId = emergencyInfoForm.get('title').value;
    patient.emergencyInfo.phoneNumber = emergencyInfoForm.get('primaryPhoneNumber').value;
    patient.emergencyInfo.alternatePhoneNumber = emergencyInfoForm.get('alternatePhoneNumber').value;

    return patient;
  }

  getFormBuilder() {
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


}
