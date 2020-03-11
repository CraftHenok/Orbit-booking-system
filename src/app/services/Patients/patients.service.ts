import {Injectable} from '@angular/core';
import {Patient} from '../../models/Patient';
import {Contact} from '../../models/Contact';
import {Address} from '../../models/Address';
import {EmergencyInfo} from '../../models/EmergencyInfo';
import {HttpClient} from '@angular/common/http';
import {UrlManager} from '../../utility/urlManager';

@Injectable({
  providedIn: 'root'
})
export class PatientsService {

  private readonly patientsUrl: string;

  constructor(private http: HttpClient) {
    this.patientsUrl = UrlManager.getSupperUrl() + '/patient/';
  }


  getAllPatients() {
    return this.http.get<Patient[]>(this.patientsUrl);
  }

  getPatientForgetId(firstName: string, phoneNumber: string) {
    return this.http.get<Patient[]>(this.patientsUrl + `forgetId/${firstName}/${phoneNumber}`);
  }


  getContactInfo(contactInfoId: string) {
    const url = this.patientsUrl + 'contactInfo/' + contactInfoId;
    return this.http.get<Contact>(url);
  }


  getAddress(addressId: string) {
    const url = this.patientsUrl + 'address/' + addressId;
    return this.http.get<Address>(url);
  }


  getEmergencyInfo(emergencyInfoId: string) {
    const url = this.patientsUrl + 'emergencyInfo/' + emergencyInfoId;
    return this.http.get<EmergencyInfo>(url);
  }

  savePatient(patient: Patient) {
    return this.http.post<Patient>(this.patientsUrl, patient);
  }

  getPatientByIdFull(id: number) {
    const url = this.patientsUrl + 'byIdFull/' + id;
    return this.http.get<Patient>(url);
  }

  deletePatientById(patient: Patient) {
    const url = this.patientsUrl + patient.seq + patient.addressId + patient.contactId + patient.emergencyInfoId;
    return this.http.delete<number>(url);
  }

  updatePatient(patient: Patient) {
    const url = this.patientsUrl + patient.seq;
    return this.http.put<number>(url, patient);
  }
}
