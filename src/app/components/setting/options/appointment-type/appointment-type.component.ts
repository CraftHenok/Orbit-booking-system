import {Component, OnDestroy, OnInit} from '@angular/core';
import {AppointmentsServices} from '../../../../services/Appointments/appointments-services';
import {Subscription} from 'rxjs';
import {GeneralType} from '../../../../models/GeneralType';

@Component({
  selector: 'app-appointment-type',
  templateUrl: './appointment-type.component.html',
  styleUrls: ['./appointment-type.component.css']
})
export class AppointmentTypeComponent implements OnInit, OnDestroy {


  dataSource: GeneralType[] = [];

  private subscription: Subscription = new Subscription();

  constructor(private appointmentService: AppointmentsServices) {
  }

  ngOnInit(): void {
    this.subscription.add(this.appointmentService.getAppointmentTypes().subscribe(
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
