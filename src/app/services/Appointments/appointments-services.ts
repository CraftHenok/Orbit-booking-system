import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {LocalAppointments} from '../../models/Appointemts/LocalAppointments';
import {AppointmentWrapper} from '../../models/Appointemts/AppointmentWrapper';
import {HttpClient} from '@angular/common/http';
import {RemoteAppointment} from '../../models/Appointemts/RemoteAppointment';
import {GeneralType} from '../../models/GeneralType';
import {GeneralStatus} from '../../models/GeneralStatus';
import {shareReplay} from 'rxjs/operators';
import {UrlManager} from '../../utility/urlManager';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsServices {

  private appointmentTypes$: Observable<GeneralType[]>;
  private appointmentStatus$: Observable<GeneralStatus[]>;

  constructor(private http: HttpClient) {
  }

  getAllAppointments() {
    const url = UrlManager.getSupperUrl() + '/appointment/';
    return this.http.get<RemoteAppointment[]>(url);
  }

  addNewAppointment(newAppointment: LocalAppointments) {
    const url = UrlManager.getSupperUrl() + '/appointment/';
    return this.http.post<RemoteAppointment>(url, AppointmentWrapper.toRemoteAppointment(newAppointment));
  }

  updateAppointment(appointmentToUpdate: LocalAppointments) {
    const url = UrlManager.getSupperUrl() + '/appointment/' + appointmentToUpdate.id;
    return this.http.put<number>(url, AppointmentWrapper.toRemoteAppointment(appointmentToUpdate));
  }

  deleteAppointment(appointmentToDelete: LocalAppointments) {
    const url = UrlManager.getSupperUrl() + '/appointment/' + appointmentToDelete.id;
    return this.http.delete<number>(url);
  }

  getAppointmentTypes() {
    const url = UrlManager.getSupperUrl() + '/appointment/appointmentType';
    if (!this.appointmentTypes$) {
      this.appointmentTypes$ = this.http.get<GeneralType[]>(url).pipe(
        shareReplay(1)
      );
    }
    return this.appointmentTypes$;
  }

  getAppointmentStatus() {
    const url = UrlManager.getSupperUrl() + '/appointment/appointmentStatus';
    if (!this.appointmentStatus$) {
      this.appointmentStatus$ = this.http.get<GeneralStatus[]>(url).pipe(
        shareReplay(1)
      );
    }
    return this.appointmentStatus$;
  }


  getAppointmentByDoctor(seq: number) {
    const url = UrlManager.getSupperUrl() + '/appointment/doctors/' + seq;
    return this.http.get<RemoteAppointment[]>(url);
  }

}
