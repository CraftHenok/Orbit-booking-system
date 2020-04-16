import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Account} from '../models/Account';
import {Variables} from './variables';

export class ReceptionFormManager {

  private ReceptionForm: FormGroup;


  get receptionForm(): FormGroup {
    return this.ReceptionForm;
  }

  set receptionForm(value: FormGroup) {
    this.ReceptionForm = value;
  }


  updateForm(account: Account) {
    this.receptionForm.patchValue({
      username: account.username,
      email: account.email,
      password: account.password,
      status: account.status,
    });
  }

  constructor(private formBuilder: FormBuilder) {
    this.ReceptionForm = this.getFormBuilder();
  }

  bindToNewReception() {
    return new Account(
      this.receptionForm.get('email').value,
      this.receptionForm.get('password').value,
      Variables.receptionRoleName,
      this.receptionForm.get('username').value,
      this.receptionForm.get('status').value);
  }

  private getFormBuilder() {
    return this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(Variables.minPasswordLength)]],
      status: ['', Validators.required],
    });
  }
}
