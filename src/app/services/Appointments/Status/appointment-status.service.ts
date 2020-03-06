import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlManager} from '../../../utility/urlManager';
import {GeneralType} from '../../../models/GeneralType';
import {GeneralStatus} from '../../../models/GeneralStatus';

@Injectable({
  providedIn: 'root'
})
export class AppointmentStatusService {

  private readonly appointmentStatusUrl: string;

  constructor(private http: HttpClient) {
    this.appointmentStatusUrl = UrlManager.getSupperUrl() + '/appointmentStatus';
  }

  get() {
    return this.http.get<GeneralStatus[]>(this.appointmentStatusUrl);
  }

  save(generalStatus: GeneralStatus) {
    return this.http.post<GeneralStatus>(this.appointmentStatusUrl, generalStatus);
  }

  edit(generalStatus: GeneralStatus) {
    return this.http.put<number>(this.appointmentStatusUrl + `/${generalStatus.id}`, generalStatus);
  }

  delete(generalStatus: GeneralStatus) {
    return this.http.delete(this.appointmentStatusUrl + `/${generalStatus.id}`);
  }
}
