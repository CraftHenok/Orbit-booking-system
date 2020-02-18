import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {PatientsService} from '../../services/Patients/patients.service';
import {MatTableDataSource} from '@angular/material/table';
import {Patient} from '../../models/Patient';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {Subscription} from 'rxjs';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {MatDialog} from '@angular/material/dialog';
import {AddEditDialogComponent} from '../dialogs/addEditDialog/addEditDialog.component';
import {PatientsdetaildialogComponent} from '../dialogs/patientsdetaildialog/patientsdetaildialog.component';

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


  constructor(private patientService: PatientsService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {

    this.subscription.add(this.patientService.getAllPatients().subscribe(
      result => {
        console.table(result);
        this.dataSource = new MatTableDataSource<Patient>(result);
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

  openPatientDetailDialog(code: string, element: Patient) {
    element.code = code;
    return this.dialog.open(PatientsdetaildialogComponent, {
      width: '400px',
      data: element
    });
  }
}
