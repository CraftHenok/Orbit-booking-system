import {Injectable} from '@angular/core';
import {Patient} from '../../models/Patient';
import {Observable} from 'rxjs';
import {Contact} from '../../models/Contact';
import {Address} from '../../models/Address';
import {EmergencyInfo} from '../../models/EmergencyInfo';
import {HttpClient} from '@angular/common/http';
import {GeneralTitle} from '../../models/GeneralTitle';
import {shareReplay} from 'rxjs/operators';
import {UrlManager} from '../../utility/urlManager';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private patientTitle$: Observable<GeneralTitle[]>;
  private emergencyTitle$: Observable<GeneralTitle[]>;


  constructor(private http: HttpClient) {
  }


  getAllPatients() {
    const url = UrlManager.getSupperUrl() + '/patient/';
    return this.http.get<Patient[]>(url);
  }


  getContactInfo(contactInfoId: string) {
    const url = UrlManager.getSupperUrl() + '/patient/contactInfo/' + contactInfoId;
    return this.http.get<Contact>(url);
  }


  getAddress(addressId: string) {
    const url = UrlManager.getSupperUrl() + '/patient/address/' + addressId;
    return this.http.get<Address>(url);
  }


  getEmergencyInfo(emergencyInfoId: string) {
    const url = UrlManager.getSupperUrl() + '/patient/emergencyInfo/' + emergencyInfoId;
    return this.http.get<EmergencyInfo>(url);
  }

  savePatient(patient: Patient) {
    const url = UrlManager.getSupperUrl() + '/patient/';
    return this.http.post<Patient>(url, patient);
  }

  getPatientByIdFull(id: number) {
    const url = UrlManager.getSupperUrl() + '/patient/byIdFull/' + id;
    return this.http.get<Patient>(url);
  }

  deletePatientById(patient: Patient) {
    const url = UrlManager.getSupperUrl() + `/patient/${patient.seq}/${patient.addressId}/${patient.contactId}/${patient.emergencyInfoId}`;
    return this.http.delete<number>(url);
  }

  updatePatient(patient: Patient) {
    const url = UrlManager.getSupperUrl() + '/patient/' + patient.seq;
    return this.http.put<number>(url, patient);
  }
}
