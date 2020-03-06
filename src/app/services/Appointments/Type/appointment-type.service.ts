import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GeneralType} from '../../../models/GeneralType';
import {UrlManager} from '../../../utility/urlManager';

@Injectable({
  providedIn: 'root'
})
export class AppointmentTypeService {

  private readonly appointmentTypeUrl: string;

  constructor(private http: HttpClient) {
    this.appointmentTypeUrl = UrlManager.getSupperUrl() + '/appointmentType';
  }

  get() {
    return this.http.get<GeneralType[]>(this.appointmentTypeUrl);
  }

  save(generalType: GeneralType) {
    return this.http.post<GeneralType>(this.appointmentTypeUrl, generalType);
  }

  edit(generalType: GeneralType) {
    return this.http.put<number>(this.appointmentTypeUrl + `/${generalType.id}`, generalType);
  }

  delete(generalType: GeneralType) {
    return this.http.delete(this.appointmentTypeUrl + `/${generalType.id}`);
  }
}
