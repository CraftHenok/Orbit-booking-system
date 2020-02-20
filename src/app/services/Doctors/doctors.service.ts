import {Injectable} from '@angular/core';
import {Doctor} from '../../models/Doctor';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {shareReplay} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  private doctors$: Observable<Doctor[]>;

  constructor(private http: HttpClient) {
  }

  getAllDoctors() {

    const url = 'http://localhost:5000/doctor/';
    if (!this.doctors$) {
      this.doctors$ = this.http.get<Doctor[]>(url).pipe(
        shareReplay(1)
      );
    }
    return this.doctors$;

  }
}
