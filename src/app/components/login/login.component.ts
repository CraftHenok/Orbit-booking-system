import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Account} from '../../models/Account';
import {AccountService} from '../../services/Account/account.service';
import {Router} from '@angular/router';
import {Variables} from '../../utility/variables';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private accountService: AccountService) {
  }

  hide = true;

  accountForm = this.formBuilder.group({
    email: ['admin@gmail.com', [Validators.required, Validators.email]],
    password: ['12345678', [Validators.required, Validators.minLength(Variables.minPasswordLength)]]
  });

  error: string;

  static saveToken(token: string) {
    localStorage.setItem('Authorization', token);
  }

  ngOnInit(): void {
  }

  private getAccount() {
    return new Account(this.accountForm.get('email').value,
      this.accountForm.get('password').value, '', '', '');
  }

  formSubmitted() {
    this.accountService.loginUser(this.getAccount()).subscribe(
      result => {
        if (result.status.toUpperCase() === Variables.status[0].toUpperCase()) {
          this.accountService.saveEmail(result.email);
          this.forwardUserToDashBoard(result);
        } else {
          this.userCantLogin(result);
        }
      }, error => {
        this.error = error.error;
        console.error(error);
      }
    );
  }

  private forwardUserToDashBoard(result: Account) {
    let destination = '';
    switch (result.role) {
      case 'A':
        destination = 'admin';
        break;
      case 'D':
        destination = 'doctor';
        break;
      case 'R':
        destination = 'reception';
        break;
    }
    LoginComponent.saveToken(result.token);
    this.router.navigate([destination]);
  }

  private userCantLogin(result: Account) {
    if (result.status.toUpperCase() === Variables.status[1].toUpperCase()) {
      this.error = 'Your account hasn\'t been approved contact your admin';
    } else if (result.status.toUpperCase() === Variables.status[2].toUpperCase()) {
      this.error = 'Your account has been suspended contact your admin';
    }
  }
}
