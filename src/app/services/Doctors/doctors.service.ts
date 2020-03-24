import {Injectable} from '@angular/core';
import {Doctor} from '../../models/Doctor';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';
import {UrlManager} from '../../utility/urlManager';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  private doctors$: Observable<Doctor[]>;

  private readonly doctorsUrl: string;

  constructor(private http: HttpClient) {
    this.doctorsUrl = UrlManager.getSupperUrl() + '/doctor/';
  }

  getAllDoctors() {
    if (!this.doctors$) {
      this.doctors$ = this.http.get<Doctor[]>(this.doctorsUrl).pipe(
        shareReplay(1)
      );
    }
    return this.doctors$;

  }

  saveDoctor(doctor: Doctor) {
    return this.http.post<Doctor>(this.doctorsUrl, doctor);
  }

  getDoctorById(doctorId: number) {
    const url = this.doctorsUrl + 'byId/' + doctorId;
    return this.http.get<Doctor>(url);
  }

  deleteDoctorById(doctorId: number) {
    const url = this.doctorsUrl + doctorId;
    return this.http.delete<number>(url);
  }

  updateDoctor(doctor: Doctor) {
    const url = this.doctorsUrl + doctor.id;
    return this.http.put<number>(url, doctor);
  }
}
