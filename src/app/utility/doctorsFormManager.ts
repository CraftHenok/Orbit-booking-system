import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Doctor} from '../models/Doctor';
import {Variables} from './variables';

export class DoctorsFormManager {


  constructor(private formBuilder: FormBuilder) {

  }

  static bindDataToNewDoctor(id: number, primaryInfo: FormGroup) {
    return new Doctor(
      primaryInfo.get('email').value,
      primaryInfo.get('password').value,
      Variables.doctorRoleName,
      primaryInfo.get('username').value,
      primaryInfo.get('status').value,
      id,
      primaryInfo.get('displayOrder').value);
  }

  getFormBuilders() {
    return this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.min(6)]],
      status: ['', Validators.required],
      displayOrder: ['', Validators.required],
    });
  }
}
