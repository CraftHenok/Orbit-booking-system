import {Injectable} from '@angular/core';
import {Account} from '../../models/Account';
import {HttpClient} from '@angular/common/http';
import {UrlManager} from '../../utility/urlManager';
import {JwtHelperService} from '@auth0/angular-jwt';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  private emailSubject = new BehaviorSubject<string>('Account');
  currentEmail = this.emailSubject.asObservable();

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
    return !this.jwtHelper.isTokenExpired(token);
  }

  saveEmail(email: string) {
    this.emailSubject.next(email);
  }

  getAccountInfo() {
    const url = UrlManager.getSupperUrl() + '/accountManager';
    return this.http.get<Account>(url);
  }

  updateAccountInfo(account: Account) {
    const url = UrlManager.getSupperUrl() + '/accountManager';
    return this.http.put<null>(url, account);
  }


}
