import {Component, OnInit} from '@angular/core';
import {CalendarEvent, CalendarView} from 'angular-calendar';
import {Subject} from 'rxjs';
import {AppointmentsServices} from '../../../services/Appointments/appointments-services';
import {AppointmentWrapper} from '../../../models/Appointemts/AppointmentWrapper';

@Component({
  selector: 'app-doctorsappointment',
  templateUrl: './doctorsappointment.component.html',
  styleUrls: ['./doctorsappointment.component.css']
})
export class DoctorsappointmentComponent implements OnInit {


  view = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  events: CalendarEvent[] = [];

  refresh: Subject<any> = new Subject();

  activeDayIsOpen = true;

  constructor(private appointmentService: AppointmentsServices) {
  }

  ngOnInit(): void {
    this.appointmentService.getDoctorsAppointment().subscribe(
      result => {
        this.events = AppointmentWrapper.toLocalAppointmentBatch(result, true);
      },
      error => {
        console.error(error);
      }
    );
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

}
