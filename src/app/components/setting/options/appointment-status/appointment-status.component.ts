import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {AppointmentsServices} from '../../../../services/Appointments/appointments-services';
import {GeneralStatus} from '../../../../models/GeneralStatus';

@Component({
  selector: 'app-appointment-status',
  templateUrl: './appointment-status.component.html',
  styleUrls: ['./appointment-status.component.css']
})
export class AppointmentStatusComponent implements OnInit, OnDestroy {

  dataSource: GeneralStatus[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private appointmentService: AppointmentsServices) {
  }

  ngOnInit(): void {
    this.subscription.add(this.appointmentService.getAppointmentStatus().subscribe(
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
}
