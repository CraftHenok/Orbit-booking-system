import {Injectable} from '@angular/core';
import {addDays, addHours, endOfMonth, startOfDay, subDays} from 'date-fns';
import {Color} from '../../models/Color';
import {Observable, of} from 'rxjs';
import {LocalAppointments} from '../../models/Appointemts/LocalAppointments';
import {LocalAppointmentsBuilder} from '../../models/Appointemts/LocalAppointmentsBuilder';
import {AppointmentWrapper} from '../../models/Appointemts/AppointmentWrapper';
import {HttpClient} from '@angular/common/http';
import {RemoteAppointment} from '../../models/Appointemts/RemoteAppointment';
import {GeneralType} from '../../models/GeneralType';
import {GeneralStatus} from '../../models/GeneralStatus';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsServices {

  private appointmentTypes$: Observable<GeneralType[]>;
  private appointmentStatus$: Observable<GeneralStatus[]>;

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
      this.appointmentTypes$ = this.http.get<GeneralType[]>(url).pipe(
        shareReplay(1)
      );
    }
    return this.appointmentTypes$;
  }

  getAppointmentStatus() {
    const url = 'http://localhost:5000/appointment/appointmentStatus';
    if (!this.appointmentStatus$) {
      this.appointmentStatus$ = this.http.get<GeneralStatus[]>(url).pipe(
        shareReplay(1)
      );
    }
    return this.appointmentStatus$;
  }

}
