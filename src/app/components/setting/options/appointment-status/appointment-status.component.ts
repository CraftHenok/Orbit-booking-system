import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {GeneralStatus} from '../../../../models/GeneralStatus';
import {AppointmentStatusService} from '../../../../services/Appointments/Status/appointment-status.service';
import {AddComponent} from '../add/add.component';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-appointment-status',
  templateUrl: './appointment-status.component.html',
  styleUrls: ['../patient-title/patient-title.component.css']
})
export class AppointmentStatusComponent implements OnInit, OnDestroy {

  dataSource: GeneralStatus[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private appointmentStatusService: AppointmentStatusService,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.subscription.add(this.appointmentStatusService.get().subscribe(
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
