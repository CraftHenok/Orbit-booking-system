import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {MatTableDataSource} from '@angular/material/table';
import {DoctorsService} from '../../services/Doctors/doctors.service';
import {Doctor} from '../../models/Doctor';

@Component({
  selector: 'app-doctors',
  templateUrl: './doctors.component.html',
  styleUrls: ['../patients/patients.component.css'] // common css so re-use
})
export class DoctorsComponent implements OnInit, OnDestroy {

  dataSource;
  displayedColumns: string[] = ['seq', 'name', 'username', 'password', 'displayOrder', 'manageBlock',
    'manageBooking', 'isDoctor', 'edit', 'delete'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private subscription: Subscription = new Subscription();


  constructor(private patientService: DoctorsService) {
  }

  ngOnInit(): void {

    this.subscription.add(this.patientService.getAllDoctors().subscribe(
      result => {
        this.dataSource = new MatTableDataSource<Doctor>(result);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {

      }
    ));

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
