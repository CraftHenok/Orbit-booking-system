import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlManager} from '../../../utility/urlManager';
import {GeneralStatus} from '../../../models/GeneralStatus';
import {GeneralTitle} from '../../../models/GeneralTitle';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PatientTitleService {

  private readonly patientTitleUrl: string;

  private patientTitles$: Observable<GeneralTitle[]>;

  constructor(private http: HttpClient) {
    this.patientTitleUrl = UrlManager.getSupperUrl() + '/patientTitle/';
  }

  get() {
    if (!this.patientTitles$) {
      this.patientTitles$ = this.http.get<GeneralTitle[]>(this.patientTitleUrl).pipe(
        shareReplay(1)
      );
    }
    return this.patientTitles$;
  }

  save(generalTitle: GeneralTitle) {
    return this.http.post<GeneralTitle>(this.patientTitleUrl, generalTitle);
  }

  edit(generalTitle: GeneralTitle) {
    return this.http.put<number>(this.patientTitleUrl + generalTitle.id, generalTitle);
  }

  delete(generalTitle: GeneralTitle) {
    return this.http.delete(this.patientTitleUrl + generalTitle.id);
  }
}
