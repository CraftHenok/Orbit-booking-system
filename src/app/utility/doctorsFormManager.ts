import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Doctor} from '../models/Doctor';
import {Variables} from './variables';

export class DoctorsFormManager {

  private DoctorForm: FormGroup;


  get doctorForm(): FormGroup {
    return this.DoctorForm;
  }

  set doctorForm(value: FormGroup) {
    this.DoctorForm = value;
  }

  updateForm(doctor: Doctor) {
    this.doctorForm.patchValue({
      password: doctor.password,
      status: doctor.status,
      displayOrder: doctor.displayOrder,
      username: doctor.username,
      email: doctor.email
    });
  }

  constructor(private formBuilder: FormBuilder) {
    this.doctorForm = this.getFormBuilders();
  }

  bindDataToNewDoctor(id?: number): Doctor {
    const result = new Doctor(
      this.DoctorForm.get('email').value,
      this.DoctorForm.get('password').value,
      Variables.doctorRoleName,
      this.DoctorForm.get('username').value,
      this.DoctorForm.get('status').value,
      this.DoctorForm.get('displayOrder').value);

    result.id = id;
    return result;
  }

  private getFormBuilders() {
    return this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required, Validators.email],
      password: ['', [Validators.required, Validators.min(6)]],
      status: ['', Validators.required],
      displayOrder: ['', Validators.required],
    });
  }
}
