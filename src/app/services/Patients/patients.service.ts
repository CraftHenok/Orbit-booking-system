import {Injectable} from '@angular/core';
import {Patient} from '../../models/Patient';
import {of} from 'rxjs';
import {Contact} from '../../models/Contact';
import {Address} from '../../models/Address';
import {EmergencyInfo} from '../../models/EmergencyInfo';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  constructor(private http: HttpClient) {
  }


  getAllPatients() {

    // const contactInfo1 = new Contact('+251904400573');
    // const contactInfo2 = new Contact('+251904400573', 'zekaryasdinku@gmail.com');
    // const contactInfo3 = new Contact('+251904400573', 'zekaryasdinku@gmail.com', '+251945962890');
    //
    // const address1 = new Address('line 1', 'line 2', 'AA', 'Ethiopia');
    // const address2 = new Address();
    // const address3 = new Address('', '', 'AA', 'Ethiopia');
    // const address4 = new Address('line 1', '', 'AA', 'Ethiopia');
    //
    // const emergencyInfo1 = new EmergencyInfo(1, 'Abel', '+0925252082', '9012485625');
    // const emergencyInfo2 = new EmergencyInfo(1, 'Abel', '+0925252082');
    // const emergencyInfo3 = new EmergencyInfo();
    //
    //
    // const patientList: Patient[] = [];
    //
    // patientList.push(new Patient(1, new Date(), 1, 'Zekaryas 1', 'Tadele',
    //   'Dinku', 'M', new Date(), 21, contactInfo1, address1, emergencyInfo1, 'Ethiopia'));
    //
    //
    // patientList.push(new Patient(2, new Date(), 2, 'Zekaryas 2', 'Tadele',
    //   'Dinku', 'F', new Date(), 22, contactInfo2, address2, emergencyInfo2, ''));
    // patientList.push(new Patient(3, new Date(), 3, 'Zekaryas 3', 'Tadele',
    //   'Dinku', 'M', new Date(), 23, contactInfo3, address3, emergencyInfo3, 'Kenya'));
    //
    // patientList.push(new Patient(4, new Date(), 4, 'Zekaryas 4', 'Tadele',
    //   'Dinku', 'F', new Date(), 24, contactInfo1, address1, emergencyInfo1, 'HOLLAND'));
    // patientList.push(new Patient(5, new Date(), 5, 'Zekaryas 5', 'Tadele',
    //   'Dinku', 'M', new Date(), 25, contactInfo2, address4, emergencyInfo2, ''));
    // patientList.push(new Patient(6, new Date(), 6, 'Zekaryas 6', 'Tadele',
    //   'Dinku', 'F', new Date(), 26, contactInfo3, address4, emergencyInfo2, 'Ethiopia'));

    const url = 'http://localhost:5000/patient/';
    return this.http.get<Patient[]>(url);

  }
}
