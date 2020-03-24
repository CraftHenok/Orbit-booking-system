import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Doctor} from '../models/Doctor';

export class DoctorsFormManager {


  constructor(private formBuilder: FormBuilder) {

  }

  static bindDataToNewDoctor(id: number, primaryInfo: FormGroup, appointmentRelatedInfo: FormGroup) {
    return new Doctor(
      '',
      '',
      '',
      '',
      '',
      0,
      1);
    // return new Doctor(
    //   id,
    //   primaryInfo.get('name').value,
    //   primaryInfo.get('username').value,
    //   appointmentRelatedInfo.get('displayOrder').value,
    //   appointmentRelatedInfo.get('manageBlock').value,
    //   appointmentRelatedInfo.get('manageBooking').value,
    //   appointmentRelatedInfo.get('isDoctor').value
    // );
  }

  getFormBuilders() {
    const primaryInfo = this.formBuilder.group({
      name: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.min(6)]]
    });

    const appointmentRelatedInfo = this.formBuilder.group({
      displayOrder: ['', Validators.required],
      manageBlock: [false, Validators.required],
      manageBooking: [false, Validators.required],
      isDoctor: [false, Validators.required]
    });

    return {primaryInfo, appointmentRelatedInfo};
  }
}
