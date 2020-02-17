import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Patient} from '../../../models/Patient';
import {Contact} from '../../../models/Contact';
import {Address} from '../../../models/Address';
import {EmergencyInfo} from '../../../models/EmergencyInfo';
import {PatientsService} from '../../../services/Patients/patients.service';

@Component({
  selector: 'app-patientsdetaildialog',
  templateUrl: './patientsdetaildialog.component.html',
  styleUrls: ['./patientsdetaildialog.component.css']
})
export class PatientsdetaildialogComponent implements OnInit {

  contactInfo: Contact = new Contact('');
  address: Address = new Address();
  emergencyInfo: EmergencyInfo = new EmergencyInfo();

  constructor(private dialogRef: MatDialogRef<PatientsdetaildialogComponent>,
              private patientService: PatientsService,
              @Inject(MAT_DIALOG_DATA) public data: Patient) {
  }

  ngOnInit(): void {
    if (this.data.code === 'C') {
      this.patientService.getContactInfo(this.data.contactId).subscribe(
        result => {
          this.contactInfo = result;
        }
      );
    } else if (this.data.code === 'A') {
      this.patientService.getAddress(this.data.addressId).subscribe(
        result => {
          this.address = result;
        }
      );
    } else if (this.data.code === 'E') {
      this.patientService.getEmergencyInfo(this.data.emergencyInfoId).subscribe(
        result => {
          this.emergencyInfo = result;
        }
      );
    }
  }

}
