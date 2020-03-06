import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlManager} from '../../../utility/urlManager';
import {GeneralStatus} from '../../../models/GeneralStatus';
import {GeneralTitle} from '../../../models/GeneralTitle';

@Injectable({
  providedIn: 'root'
})
export class PatientTitleService {

  private readonly patientTitleUrl: string;

  constructor(private http: HttpClient) {
    this.patientTitleUrl = UrlManager.getSupperUrl() + '/patientTitle';
  }

  get() {
    return this.http.get<GeneralTitle[]>(this.patientTitleUrl);
  }

  save(generalTitle: GeneralTitle) {
    return this.http.post<GeneralTitle>(this.patientTitleUrl, generalTitle);
  }

  edit(generalTitle: GeneralTitle) {
    return this.http.put<number>(this.patientTitleUrl + `/${generalTitle.id}`, generalTitle);
  }

  delete(generalTitle: GeneralTitle) {
    return this.http.delete(this.patientTitleUrl + `/${generalTitle.id}`);
  }
}
