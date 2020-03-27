import {Injectable} from '@angular/core';
import {Account} from '../../models/Account';
import {HttpClient} from '@angular/common/http';
import {UrlManager} from '../../utility/urlManager';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Observable, Subject} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService {


  private emailSubject = new Subject<string>();

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

  saveEmail(email: string) {
    this.emailSubject.next(email);
  }

  getEmail(): Observable<string> {
    return this.emailSubject.asObservable().pipe(
      shareReplay(1)
    );
  }


}
