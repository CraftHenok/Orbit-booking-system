import {Injectable} from '@angular/core';
import {LocalAppointments} from '../../models/Appointemts/LocalAppointments';
import {AppointmentWrapper} from '../../models/Appointemts/AppointmentWrapper';
import {HttpClient} from '@angular/common/http';
import {RemoteAppointment} from '../../models/Appointemts/RemoteAppointment';
import {UrlManager} from '../../utility/urlManager';

@Injectable({
  providedIn: 'root'
})
export class AppointmentsServices {

  private readonly appointmentUrl: string;

  constructor(private http: HttpClient) {
    this.appointmentUrl = UrlManager.getSupperUrl() + '/appointment/';
  }

  getAllAppointments() {
    return this.http.get<RemoteAppointment[]>(this.appointmentUrl);
  }

  addNewAppointment(newAppointment: LocalAppointments) {
    return this.http.post<RemoteAppointment>(this.appointmentUrl, AppointmentWrapper.toRemoteAppointment(newAppointment));
  }

  updateAppointment(appointmentToUpdate: LocalAppointments) {
    const url = this.appointmentUrl + appointmentToUpdate.id;
    return this.http.put<number>(url, AppointmentWrapper.toRemoteAppointment(appointmentToUpdate));
  }

  deleteAppointment(appointmentToDelete: LocalAppointments) {
    const url = this.appointmentUrl + appointmentToDelete.id;
    return this.http.delete<number>(url);
  }


  getAppointmentByDoctor(seq: number) {
    const url = this.appointmentUrl + 'showdoctors/' + seq;
    return this.http.get<RemoteAppointment[]>(url);
  }

}
