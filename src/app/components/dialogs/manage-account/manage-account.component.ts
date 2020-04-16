import {Component, OnInit} from '@angular/core';
import {Variables} from '../../../utility/variables';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material/dialog';
import {AccountService} from '../../../services/Account/account.service';
import {Account} from '../../../models/Account';

@Component({
  selector: 'app-manage-account',
  templateUrl: './manage-account.component.html',
  styleUrls: ['./manage-account.component.css']
})
export class ManageAccountComponent implements OnInit {

  hidePassword = true;

  status = Variables.status;

  editAccountForm = this.formBuilder.group({
    username: ['', Validators.required],
    email: ['', Validators.required, Validators.email],
    password: ['', [Validators.required, Validators.minLength(Variables.minPasswordLength)]],
  });
  error: string;

  constructor(private formBuilder: FormBuilder,
              private dialogRef: MatDialogRef<ManageAccountComponent>,
              private accountService: AccountService) {
  }

  updatePrimaryInfo(account: Account) {
    this.editAccountForm.patchValue({
      password: account.password,
      username: account.username,
      email: account.email
    });
  }

  ngOnInit(): void {
    this.accountService.getAccountInfo().subscribe(
      result => {
        this.updatePrimaryInfo(result);
      }, error => {
        console.error(error);
      }
    );
  }

  submit() {
    const newAccount = new Account(
      this.editAccountForm.get('email').value,
      this.editAccountForm.get('password').value,
      '',
      this.editAccountForm.get('username').value,
      '');

    this.accountService.updateAccountInfo(newAccount).subscribe(
      result => {
        this.dialogRef.close();
      }, error => {
        this.error = error.error;
        console.error(error);
      }
    );

  }
}
