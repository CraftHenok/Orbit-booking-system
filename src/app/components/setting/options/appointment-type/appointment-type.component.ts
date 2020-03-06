import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppointmentsServices} from '../../../../services/Appointments/appointments-services';
import {Subscription} from 'rxjs';
import {GeneralType} from '../../../../models/GeneralType';
import {AppointmentTypeService} from '../../../../services/Appointments/Type/appointment-type.service';
import {AddComponent} from '../add/add.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-type',
  templateUrl: './appointment-type.component.html',
  styleUrls: ['../patient-title/patient-title.component.css']
})
export class AppointmentTypeComponent implements OnInit, OnDestroy {


  dataSource: GeneralType[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private appointmentTypeService: AppointmentTypeService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subscription.add(this.appointmentTypeService.get().subscribe(
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

  openDialog() {

    const map: Map<string, string> = new Map();
    map.set('A', 'B');

    const dialogRef = this.dialog.open(AddComponent, {
      width: '400px',
      data: map
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

}
