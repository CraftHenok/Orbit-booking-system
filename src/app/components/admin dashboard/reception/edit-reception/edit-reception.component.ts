import {Component, OnInit} from '@angular/core';
import {Variables} from '../../../../utility/variables';
import {FormBuilder} from '@angular/forms';
import {AccountService} from '../../../../services/Account/account.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap} from 'rxjs/operators';
import {Account} from '../../../../models/Account';

@Component({
  selector: 'app-edit-reception',
  templateUrl: './edit-reception.component.html',
  styleUrls: ['../add-reception/add-reception.component.css']
})
export class EditReceptionComponent implements OnInit {

  hidePassword = true;
  status = Variables.status;

  editReceptionForm = this.fb.group({
    username: [''],
    email: [''],
    password: [''],
    status: [''],
  });

  constructor(private fb: FormBuilder, private accountService: AccountService, private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.pipe(switchMap(params => {
      return this.accountService.getAccountById(Number(params.get('id')));
    })).subscribe(result => {
      this.updateFormValue(result);
    }, error => {
      console.error(error);
    });

  }

  private updateFormValue(result: Account) {
    this.editReceptionForm.patchValue({
      username: result.username,
      email: result.email,
      password: result.password,
      status: result.status,
    });
  }

  getEditReceptionFormData() {
    return new Account(
      this.editReceptionForm.get('email').value,
      this.editReceptionForm.get('password').value,
      Variables.receptionRoleName,
      this.editReceptionForm.get('username').value,
      this.editReceptionForm.get('status').value);
  }

  submit() {
    const accountToUpdate = this.getEditReceptionFormData();
    accountToUpdate.id = Number(this.activatedRoute.snapshot.params.id);
    this.accountService.updateAccountInfoById(accountToUpdate).subscribe(
      result => {
        alert(result);
        this.editReceptionForm.reset();
      },
      error => {
        console.error(error);
      });

  }
}
