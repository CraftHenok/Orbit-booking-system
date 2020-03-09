import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Duration} from '../../models/Duration';
import {UrlManager} from '../../utility/urlManager';
import {GeneralTitle} from '../../models/GeneralTitle';

@Injectable({
  providedIn: 'root'
})
export class DurationService {

  private readonly durationUrl: string;

  constructor(private http: HttpClient) {
    this.durationUrl = UrlManager.getSupperUrl() + '/duration';
  }

  get() {
    return this.http.get<Duration[]>(this.durationUrl);
  }

  save(duration: Duration) {
    return this.http.post<Duration>(this.durationUrl, duration);
  }

  edit(duration: Duration) {
    return this.http.put<number>(this.durationUrl + `/${duration.id}`, duration);
  }

  delete(duration: Duration) {
    return this.http.delete(this.durationUrl + `/${duration.id}`);
  }


}
