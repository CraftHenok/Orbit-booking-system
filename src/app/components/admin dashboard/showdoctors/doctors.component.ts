import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {DoctorsService} from '../../../services/Doctors/doctors.service';
import {Doctor} from '../../../models/Doctor';
import {Router} from '@angular/router';
import {ConfirmActionDialogComponent} from '../../dialogs/confirm-action-dialog/confirm-action-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {Variables} from '../../../utility/variables';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['../showpatients/patients.component.css']
})
export class DoctorsComponent implements OnInit, OnDestroy {

  dataSource;
  displayedColumns: string[] = ['id', 'username', 'email', 'password', 'status', 'displayOrder', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private subscription: Subscription = new Subscription();

  private doctors: Doctor[] = [];

  constructor(private doctorsService: DoctorsService,
              private dialog: MatDialog,
              private router: Router) {
  }

  ngOnInit(): void {

    this.subscription.add(this.doctorsService.getAllDoctors().subscribe(
      result => {
        this.doctors.push(...result);
        this.configureDataSource(result);
      },
      error => {
        console.error(error);
      }
    ));

  }

  configureDataSource(doctors: Doctor[]) {
    this.dataSource = new MatTableDataSource<Doctor>(doctors);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  navigateToEditDoctor(seq: number) {
    this.router.navigate(['/admin', 'editDoctor', seq]);
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
    this.subscription.add(this.doctorsService.deleteDoctorById(id).subscribe(
      result => {
        if (result > 0) {
          const filteredDoctors = this.doctors.filter(it => it.id !== id);
          this.configureDataSource(filteredDoctors);
        }
      }, error => {
        console.error(error);
      }
    ));
  }

  openDialog() {
    return this.dialog.open(ConfirmActionDialogComponent, {
      width: Variables.dialogSmallWidth,
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
