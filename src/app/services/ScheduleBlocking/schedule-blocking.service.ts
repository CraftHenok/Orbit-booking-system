import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlManager} from '../../utility/urlManager';
import {RemoteScheduleBlocking} from '../../models/ScheduleBlocking/RemoteScheduleBlocking';
import {LocalScheduleBlocking} from '../../models/ScheduleBlocking/LocalScheduleBlocking';
import {ScheduleBlockingConverter} from '../../models/ScheduleBlocking/ScheduleBlockingConverter';

@Injectable({
  providedIn: 'root'
})
export class ScheduleBlockingService {


  private url = `${UrlManager.getSupperUrl()}/scheduleBlocking/`;

  constructor(private http: HttpClient) {
  }

  get() {
    return this.http.get<RemoteScheduleBlocking[]>(this.url);
  }

  save(scheduleBlocking: LocalScheduleBlocking) {
    return this.http.post<RemoteScheduleBlocking>(this.url, ScheduleBlockingConverter.convertToRemote(scheduleBlocking));
  }

  update(scheduleBlocking: LocalScheduleBlocking) {
    return this.http.put<number>(this.url + scheduleBlocking.id, ScheduleBlockingConverter.convertToRemote(scheduleBlocking));
  }

  delete(scheduleBlocking: LocalScheduleBlocking) {
    return this.http.delete<number>(this.url + scheduleBlocking.id);
  }

}
