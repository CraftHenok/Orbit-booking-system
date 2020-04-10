import {Component, OnInit} from '@angular/core';
import {Variables} from '../../../../utility/variables';
import {FormBuilder} from '@angular/forms';
import {AccountService} from '../../../../services/Account/account.service';
import {Account} from '../../../../models/Account';

@Component({
  selector: 'app-add-reception',
  templateUrl: './add-reception.component.html',
  styleUrls: ['./add-reception.component.css']
})
export class AddReceptionComponent implements OnInit {
  hidePassword = true;
  status = Variables.status;

  addReceptionForm = this.fb.group({
    username: [''],
    email: [''],
    password: [''],
    status: [''],
  });

  constructor(private fb: FormBuilder, private accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  getAccountFromForm() {
    return new Account(
      this.addReceptionForm.get('email').value,
      this.addReceptionForm.get('password').value,
      Variables.receptionRoleName,
      this.addReceptionForm.get('username').value,
      this.addReceptionForm.get('status').value);
  }

  submit() {
    this.accountService.registerAccount(this.getAccountFromForm()).subscribe(
      result => {
        this.addReceptionForm.reset();
      }, error => {
        console.error(error);
      }
    );
  }
}
