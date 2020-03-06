import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GeneralTitle} from '../../../../models/GeneralTitle';
import {PatientTitleService} from '../../../../services/Patients/PatientTitle/patient-title.service';
import {MatDialog} from '@angular/material/dialog';
import {AddComponent} from '../add/add.component';

@Component({
  selector: 'app-patient-title',
  templateUrl: './patient-title.component.html',
  styleUrls: ['./patient-title.component.css']
})
export class PatientTitleComponent implements OnInit, OnDestroy {

  dataSource: GeneralTitle[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private patientTitleService: PatientTitleService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subscription.add(this.patientTitleService.get().subscribe(
      result => {
        this.dataSource = result;
      },
      error => {
        console.error(error);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  addClicked() {

    const map: Map<string, string> = new Map();
    map.set('id', '0');
    map.set('dataName', 'Patient title');
    map.set('value', '');

    this.openDialogWith(map);
  }

  itemClicked(title: GeneralTitle) {
    const map: Map<string, string> = new Map();
    map.set('id', title.id.toString());
    map.set('dataName', 'Patient title');
    map.set('value', title.title);
    this.openDialogWith(map);
  }

  openDialogWith(title: Map<string, string>) {
    const dialogRef = this.dialog.open(AddComponent, {
      width: '400px',
      data: title
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
