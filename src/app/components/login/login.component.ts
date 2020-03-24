import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Account} from '../../models/Account';
import {AccountService} from '../../services/Account/account.service';
import {Router} from '@angular/router';

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
    email: ['zd@gmail.com', [Validators.required, Validators.email]],
    password: ['12345678', Validators.required]
  });

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
        this.forwardUserToDashBoard(result);
      }, error => {
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
}
