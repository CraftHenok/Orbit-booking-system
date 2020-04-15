import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlManager} from '../../../utility/urlManager';
import {GeneralTitle} from '../../../models/GeneralTitle';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmergencyTitleService {

  private readonly emergencyTitleUrl: string;

  private emergencyTitle$: Observable<GeneralTitle[]>;

  constructor(private http: HttpClient) {
    this.emergencyTitleUrl = UrlManager.getSupperUrl() + '/emergencyTitle/';
  }

  get() {
    if (!this.emergencyTitle$) {
      this.emergencyTitle$ = this.http.get<GeneralTitle[]>(this.emergencyTitleUrl).pipe(
        shareReplay(1)
      );
    }
    return this.emergencyTitle$;
  }

  save(generalTitle: GeneralTitle) {
    return this.http.post<GeneralTitle>(this.emergencyTitleUrl, generalTitle);
  }

  edit(generalTitle: GeneralTitle) {
    return this.http.put<number>(this.emergencyTitleUrl + generalTitle.id, generalTitle);
  }

  delete(generalTitle: GeneralTitle) {
    return this.http.delete<number>(this.emergencyTitleUrl + generalTitle.id);
  }
}
