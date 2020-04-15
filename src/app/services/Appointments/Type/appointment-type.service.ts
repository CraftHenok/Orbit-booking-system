import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {GeneralType} from '../../../models/GeneralType';
import {UrlManager} from '../../../utility/urlManager';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentTypeService {

  private readonly appointmentTypeUrl: string;

  private appointmentType$: Observable<GeneralType[]>;

  constructor(private http: HttpClient) {
    this.appointmentTypeUrl = UrlManager.getSupperUrl() + '/appointmentType/';
  }

  get() {
    if (!this.appointmentType$) {
      this.appointmentType$ = this.http.get<GeneralType[]>(this.appointmentTypeUrl).pipe(
        shareReplay(1)
      );
    }
    return this.appointmentType$;
  }

  save(generalType: GeneralType) {
    return this.http.post<GeneralType>(this.appointmentTypeUrl, generalType);
  }

  edit(generalType: GeneralType) {
    return this.http.put<number>(this.appointmentTypeUrl + generalType.id, generalType);
  }

  delete(generalType: GeneralType) {
    return this.http.delete<number>(this.appointmentTypeUrl + generalType.id);
  }
}
