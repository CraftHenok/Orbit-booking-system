import {Injectable} from '@angular/core';
import {Doctor} from '../../models/Doctor';
import {of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {

  constructor() {
  }

  getAllDoctors() {

    const doctorsList: Doctor[] = [];

    doctorsList.push(new Doctor(1, 'Zekaryas tadele 1', 'Zekaryas 1', '1234', 1,
      false, true, true));
    doctorsList.push(new Doctor(2, 'Zekaryas tadele 2', 'Zekaryas 2', '1234', 2,
      false, false, false));
    doctorsList.push(new Doctor(3, 'Zekaryas tadele 3', 'Zekaryas 3', '1234', 3,
      false, true, true));
    doctorsList.push(new Doctor(4, 'Zekaryas tadele 4', 'Zekaryas 4', '1234', 4,
      false, false, false));
    doctorsList.push(new Doctor(5, 'Zekaryas tadele 5', 'Zekaryas 5', '1234', 5,
      false, true, true));
    doctorsList.push(new Doctor(6, 'Zekaryas tadele 6', 'Zekaryas 6', '1234', 6,
      false, false, false));

    return of(doctorsList);
  }
}
