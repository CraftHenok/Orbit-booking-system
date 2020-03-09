import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlManager} from '../../../utility/urlManager';
import {GeneralStatus} from '../../../models/GeneralStatus';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AppointmentStatusService {

  private readonly appointmentStatusUrl: string;

  private appointmentStatus$: Observable<GeneralStatus[]>;

  constructor(private http: HttpClient) {
    this.appointmentStatusUrl = UrlManager.getSupperUrl() + '/appointmentStatus';
  }

  get() {
    if (!this.appointmentStatus$) {
      this.appointmentStatus$ = this.http.get<GeneralStatus[]>(this.appointmentStatusUrl).pipe(
        shareReplay(1)
      );
    }
    return this.appointmentStatus$;
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
