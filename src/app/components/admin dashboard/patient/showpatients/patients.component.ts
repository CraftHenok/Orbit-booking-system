import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {Router} from '@angular/router';
import {Patient} from '../../../../models/Patient';
import {PatientsService} from '../../../../services/Patients/patients.service';
import {PatientsdetaildialogComponent} from '../../../dialogs/patientsdetaildialog/patientsdetaildialog.component';
import {Variables} from '../../../../utility/variables';
import {ConfirmActionDialogComponent} from '../../../dialogs/confirm-action-dialog/confirm-action-dialog.component';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
})
export class PatientsComponent implements OnInit, OnDestroy {

  dataSource;
  displayedColumns: string[] = ['id', 'regDate', 'active', 'name', 'gender', 'dateOfBirth', 'nationality',
    'contactInfo', 'address', 'emergencyInfo', 'action'];

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private subscription: Subscription = new Subscription();

  private patients: Patient[] = [];


  constructor(private patientService: PatientsService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.subscription.add(this.patientService.getAllPatients().subscribe(
      result => {
        this.patients.push(...result);
        this.configureDataSource(result);
      },
      error => {
        console.error(error);
      }
    ));

  }

  configureDataSource(patients: Patient[]) {
    this.dataSource = new MatTableDataSource<Patient>(patients);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openPatientDetailDialog(code: string, element: Patient) {
    element.code = code;
    return this.dialog.open(PatientsdetaildialogComponent, {
      width: Variables.dialogSmallWidth,
      data: element
    });
  }

  navigateToEditPatient(seq: number) {
    this.router.navigate(['admin', 'editPatient', seq]);
  }

  confirmAction(seq: number) {
    const dialogRef = this.openDialog();

    this.subscription.add(dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deletePatient(seq);
      }
    }));

  }

  private deletePatient(id: number) {
    const patientToDelete = this.patients.filter(it => it.id === id);
    this.subscription.add(this.patientService.deletePatientById(patientToDelete[0]).subscribe(
      result => {
        if (result > 0) {
          this.dataSource.data = this.patients.filter(it => it.id !== id);
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
