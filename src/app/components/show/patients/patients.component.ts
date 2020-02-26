import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PatientsService} from '../../../services/Patients/patients.service';
import {MatTableDataSource} from '@angular/material/table';
import {Patient} from '../../../models/Patient';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {AddEditDialogComponent} from '../../dialogs/addEditDialog/addEditDialog.component';
import {PatientsdetaildialogComponent} from '../../dialogs/patientsdetaildialog/patientsdetaildialog.component';
import {Router} from '@angular/router';
import {ConfirmActionDialogComponent} from '../../dialogs/confirm-action-dialog/confirm-action-dialog.component';
import {LocalAppointments} from '../../../models/Appointemts/LocalAppointments';
import {LocalAppointmentsBuilder} from '../../../models/Appointemts/LocalAppointmentsBuilder';

@Component({
  selector: 'app-patients',
  templateUrl: './patients.component.html',
  styleUrls: ['./patients.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)'))
    ]),
  ],
})
export class PatientsComponent implements OnInit, OnDestroy {

  dataSource;
  displayedColumns: string[] = ['seq', 'regDate', 'active', 'name', 'gender', 'dateOfBirth', 'nationality',
    'contactInfo', 'address', 'emergencyInfo', 'action'];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  private subscription: Subscription = new Subscription();
  expandedElement: Patient | null;

  private patients: Patient[] = [];


  constructor(private patientService: PatientsService,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.subscription.add(this.patientService.getAllPatients().subscribe(
      result => {
        this.patients = result;
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
      width: '400px',
      data: element
    });
  }

  navigateToEditPatient(seq: number) {
    this.router.navigate(['/editPatient', seq]);
  }

  confirmAction(seq: number) {
    const dialogRef = this.openDialog();

    this.subscription.add(dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.deletePatient(seq);
      }
    }));

  }

  private deletePatient(seq: number) {
    const patientToDelete = this.patients.filter(it => it.seq === seq);
    this.subscription.add(this.patientService.deletePatientById(patientToDelete[0]).subscribe(
      result => {
        if (result > 0) {
          const filteredPatients = this.patients.filter(it => it.seq !== seq);
          this.configureDataSource(filteredPatients);
        }
      }, error => {
        console.error(error);
      }
    ));
  }

  openDialog() {
    return this.dialog.open(ConfirmActionDialogComponent, {
      width: '400px',
    });
  }


  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
