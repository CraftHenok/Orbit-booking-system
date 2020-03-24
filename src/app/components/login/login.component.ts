import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Account} from '../../models/Account';
import {AccountService} from '../../services/Account/account.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  hide = true;

  accountForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private accountService: AccountService) {
  }

  ngOnInit(): void {
  }

  private getAccount() {
    return new Account(this.accountForm.get('email').value,
      this.accountForm.get('password').value, '');
  }

  formSubmitted() {
    this.accountService.loginUser(this.getAccount()).subscribe(
      result => {
        console.log(result);
      }, error => {
        console.error(error);
      }
    );
  }
}
