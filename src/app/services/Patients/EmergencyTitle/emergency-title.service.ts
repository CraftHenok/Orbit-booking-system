import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {UrlManager} from '../../../utility/urlManager';
import {GeneralTitle} from '../../../models/GeneralTitle';

@Injectable({
  providedIn: 'root'
})
export class EmergencyTitleService {

  private readonly emergencyTitleUrl: string;

  constructor(private http: HttpClient) {
    this.emergencyTitleUrl = UrlManager.getSupperUrl() + '/emergencyTitle';
  }

  get() {
    return this.http.get<GeneralTitle[]>(this.emergencyTitleUrl);
  }

  save(generalTitle: GeneralTitle) {
    return this.http.post<GeneralTitle>(this.emergencyTitleUrl, generalTitle);
  }

  edit(generalTitle: GeneralTitle) {
    return this.http.put<number>(this.emergencyTitleUrl + `/${generalTitle.id}`, generalTitle);
  }

  delete(generalTitle: GeneralTitle) {
    return this.http.delete(this.emergencyTitleUrl + `/${generalTitle.id}`);
  }
}
