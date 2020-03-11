import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {PatientsService} from '../../../services/Patients/patients.service';
import {Patient} from '../../../models/Patient';
import {Address} from '../../../models/Address';
import {EmergencyInfo} from '../../../models/EmergencyInfo';
import {Contact} from '../../../models/Contact';

@Component({
  selector: 'app-quick-add',
  templateUrl: './quick-add.component.html',
  styleUrls: ['./quick-add.component.css']
})
export class QuickAddComponent implements OnInit {

  forgetForm = this.fb.group({
    firstName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
  });

  constructor(private dialogRef: MatDialogRef<QuickAddComponent>,
              private fb: FormBuilder,
              private patientService: PatientsService) {
  }

  ngOnInit(): void {
  }

  quickAdd() {
    const address = new Address();
    const emergencyInfo = new EmergencyInfo();
    const contactInfo = new Contact(this.forgetForm.get('phoneNumber').value);

    const newPatient = new Patient(
      0,
      new Date(),
      '38428dc2-0edd-45df-af5e-2576b411813a',
      this.forgetForm.get('firstName').value,
      '',
      '',
      '',
      null,
      0,
      contactInfo,
      address,
      emergencyInfo);

    this.patientService.savePatient(newPatient).subscribe(
      result => {
        this.dialogRef.close(result);
      }, error => {
        console.log(error);
      }
    );

  }


}
