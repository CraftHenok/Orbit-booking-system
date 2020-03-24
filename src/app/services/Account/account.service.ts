import {Injectable} from '@angular/core';
import {Account} from '../../models/Account';
import {HttpClient} from '@angular/common/http';
import {UrlManager} from '../../utility/urlManager';
import {JwtHelperService} from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountUrl = UrlManager.getSupperUrl() + '/account/';

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {
  }

  registerAccount(account: Account) {
    return this.http.post<Account>(this.accountUrl + 'register', account);
  }

  loginUser(account: Account) {
    return this.http.post<Account>(this.accountUrl + 'login', account);
  }

  public isAuthenticated(): boolean {
    const token = localStorage.getItem('Authorization');
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }


}
