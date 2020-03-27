import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Navigation} from '../../models/Navigation';
import {AccountService} from '../../services/Account/account.service';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, OnDestroy {

  @Input() navigationData: Navigation;

  subscription: Subscription;

  userEmail = 'Account';

  constructor(private accountService: AccountService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.subscription = this.accountService.getEmail().subscribe(
      result => {
        this.userEmail = result;
      }
    );
  }

  logOut() {
    localStorage.removeItem('Authorization');
    this.router.navigate(['login']);
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
