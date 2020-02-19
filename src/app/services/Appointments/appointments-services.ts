import {Injectable} from '@angular/core';
import {addDays, addHours, endOfMonth, startOfDay, subDays} from 'date-fns';
import {Color} from '../../models/Color';
import {Observable, of} from 'rxjs';
import {LocalAppointments} from '../../models/Appointemts/LocalAppointments';
import {LocalAppointmentsBuilder} from '../../models/Appointemts/LocalAppointmentsBuilder';
import {AppointmentWrapper} from '../../models/Appointemts/AppointmentWrapper';
import {HttpClient} from '@angular/common/http';
import {RemoteAppointment} from '../../models/Appointemts/RemoteAppointment';
import {AppointmentType} from '../../models/Appointemts/AppointmentType';
import {AppointmentStatus} from '../../models/Appointemts/AppointmentStatus';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsServices {

  // appointment1: LocalAppointments = new LocalAppointmentsBuilder(1, 'Type 1', 'Pending',
  //   subDays(startOfDay(new Date()), 1),
  //   addDays(new Date(), 1), false, 1).setColor('red').makeAllDay().build();
  //
  // appointment2: LocalAppointments = new LocalAppointmentsBuilder(2, 'A long event that spans 2 months', 'Pending',
  //   subDays(endOfMonth(new Date()), 3),
  //   addDays(endOfMonth(new Date()), 3), false, 2).setColor('blue').build();
  //
  // appointment3: LocalAppointments = new LocalAppointmentsBuilder(3, 'A draggable and resizable event', 'Pending',
  //   addHours(startOfDay(new Date()), 2),
  //   addHours(new Date(), 2), false, 3).setColor('yellow').build();
  //
  //
  // private appointmentsEvents: LocalAppointments[] = [
  //   this.appointment1,
  //   this.appointment2,
  //   this.appointment3
  // ];

  private appointmentTypes$: Observable<AppointmentType[]>;
  private appointmentStatus$: Observable<AppointmentStatus[]>;

  constructor(private http: HttpClient) {
  }

  getAllAppointments() {
    const url = 'http://localhost:5000/appointment/';
    return this.http.get<RemoteAppointment[]>(url);
  }

  addNewAppointment(newAppointment: LocalAppointments) {
    const url = 'http://localhost:5000/appointment/';
    return this.http.post<RemoteAppointment>(url, AppointmentWrapper.toRemoteAppointment(newAppointment));
  }

  updateAppointment(appointmentToUpdate: LocalAppointments) {
    const url = 'http://localhost:5000/appointment/' + appointmentToUpdate.id;
    return this.http.put<number>(url, AppointmentWrapper.toRemoteAppointment(appointmentToUpdate));
  }

  deleteAppointment(appointmentToDelete: LocalAppointments) {
    const url = 'http://localhost:5000/appointment/' + appointmentToDelete.id;
    return this.http.delete<number>(url);
  }

  getAppointmentTypes() {
    const url = 'http://localhost:5000/appointment/appointmentType';
    if (!this.appointmentTypes$) {
      this.appointmentTypes$ = this.http.get<AppointmentType[]>(url).pipe(
        shareReplay(1)
      );
    }
    return this.appointmentTypes$;
  }

  getAppointmentStatus() {
    const url = 'http://localhost:5000/appointment/appointmentStatus';
    if (!this.appointmentStatus$) {
      this.appointmentStatus$ = this.http.get<AppointmentStatus[]>(url).pipe(
        shareReplay(1)
      );
    }
    return this.appointmentStatus$;
  }

}
