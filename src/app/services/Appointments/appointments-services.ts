import {Injectable} from '@angular/core';
import {addDays, addHours, endOfMonth, startOfDay, subDays} from 'date-fns';
import {Color} from '../../models/Color';
import {Observable, of} from 'rxjs';
import {LocalAppointments} from '../../models/Appointemts/LocalAppointments';
import {LocalAppointmentsBuilder} from '../../models/Appointemts/LocalAppointmentsBuilder';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsServices {

  appointment1: LocalAppointments = new LocalAppointmentsBuilder(1, 'Type 1', 'Pending',
    subDays(startOfDay(new Date()), 1),
    addDays(new Date(), 1), false, 1).setColor('red').makeAllDay().build();

  appointment2: LocalAppointments = new LocalAppointmentsBuilder(2, 'A long event that spans 2 months', 'Pending',
    subDays(endOfMonth(new Date()), 3),
    addDays(endOfMonth(new Date()), 3), false, 2).setColor('blue').build();

  appointment3: LocalAppointments = new LocalAppointmentsBuilder(3, 'A draggable and resizable event', 'Pending',
    addHours(startOfDay(new Date()), 2),
    addHours(new Date(), 2), false, 3).setColor('yellow').build();


  private appointmentsEvents: LocalAppointments[] = [
    this.appointment1,
    this.appointment2,
    this.appointment3
  ];


  constructor() {
  }

  getAllAppointments(): Observable<LocalAppointments[]> {
    return of(this.appointmentsEvents);
  }

  addNewAppointment(newAppointment: LocalAppointments) {
    this.appointmentsEvents.push(newAppointment);
    return of(true);
  }

}
