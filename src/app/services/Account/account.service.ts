import {Injectable} from '@angular/core';
import {Account} from '../../models/Account';
import {HttpClient} from '@angular/common/http';
import {UrlManager} from '../../utility/urlManager';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private accountUrl = UrlManager.getSupperUrl() + '/account/';

  constructor(private http: HttpClient) {
  }

  registerAccount(account: Account) {
    return this.http.post<Account>(this.accountUrl + 'register', account);
  }

  loginUser(account: Account) {
    return this.http.post<Account>(this.accountUrl + 'login', account);
  }
}
