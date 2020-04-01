import {Component, Input, OnInit} from '@angular/core';
import {Navigation} from '../../models/Navigation';
import {AccountService} from '../../services/Account/account.service';
import {Router} from '@angular/router';
import {MatDialog} from '@angular/material/dialog';
import {Variables} from '../../utility/variables';
import {ManageAccountComponent} from '../dialogs/manage-account/manage-account.component';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  @Input() navigationData: Navigation;

  userEmail = 'Account';

  constructor(private accountService: AccountService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.accountService.currentEmail.subscribe(
      result => {
        this.userEmail = result;
      }
    );
  }

  logOut() {
    localStorage.removeItem('Authorization');
    this.router.navigate(['login']);
  }

  openManageAccountDialog() {
    return this.dialog.open(ManageAccountComponent, {
      width: Variables.dialogSmallWidth,
    });
  }
}
