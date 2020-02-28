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

  constructor(private http: HttpClient) {
  }

  getAllDoctors() {

    const url = UrlManager.getSupperUrl() + '/doctor/';
    if (!this.doctors$) {
      this.doctors$ = this.http.get<Doctor[]>(url).pipe(
        shareReplay(1)
      );
    }
    return this.doctors$;

  }

  saveDoctor(doctor: Doctor) {
    const url = UrlManager.getSupperUrl() + '/doctor/';
    return this.http.post<Doctor>(url, doctor);
  }

  getDoctorById(doctorId: number) {
    const url = UrlManager.getSupperUrl() + '/doctor/byId/' + doctorId;
    return this.http.get<Doctor>(url);
  }

  deleteDoctorById(doctorId: number) {
    const url = UrlManager.getSupperUrl() + '/doctor/' + doctorId;
    return this.http.delete<number>(url);
  }

  updateDoctor(doctor: Doctor) {
    const url = UrlManager.getSupperUrl() + '/doctor/' + doctor.seq;
    return this.http.put<number>(url, doctor);
  }
}
