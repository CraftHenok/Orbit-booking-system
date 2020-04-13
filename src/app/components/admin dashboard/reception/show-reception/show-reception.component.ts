import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {MatTableDataSource} from '@angular/material/table';
import {ConfirmActionDialogComponent} from '../../../dialogs/confirm-action-dialog/confirm-action-dialog.component';
import {Variables} from '../../../../utility/variables';
import {AccountService} from '../../../../services/Account/account.service';
import {Account} from '../../../../models/Account';

@Component({
  selector: 'app-show-reception',
  templateUrl: './show-reception.component.html',
  styleUrls: ['../../patient/showpatients/patients.component.css']
})
export class ShowReceptionComponent implements OnInit {


  dataSource;
  displayedColumns: string[] = ['id', 'username', 'email', 'password', 'status', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private subscription: Subscription = new Subscription();

  private receptions: Account[] = [];

  constructor(private accountService: AccountService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {
    this.accountService.getReception().subscribe(
      result => {
        this.configureDataSource(result);
        this.receptions.push(...result);
      }, error => {
        console.error(error);
      }
    );
  }

  configureDataSource(reception: Account[]) {
    this.dataSource = new MatTableDataSource<Account>(reception);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateToEditReception(id: number) {
    this.router.navigate(['/admin', 'editReception', id]);
  }

  confirmAction(seq: number) {
    const dialogRef = this.openDialog();

    this.subscription.add(dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deleteDoctor(seq);
      }
    }));

  }

  private deleteDoctor(id: number) {
    this.accountService.deleteUser(id).subscribe(
      result => {
        if (result > 0) {
          this.dataSource.data = this.receptions.filter(it => it.id !== id);
        }
      }, error => {
        console.error(error);
      }
    );
  }

  openDialog() {
    return this.dialog.open(ConfirmActionDialogComponent, {
      width: Variables.dialogSmallWidth,
    });
  }


}
