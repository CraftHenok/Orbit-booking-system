import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {PatientsService} from '../../../services/Patients/patients.service';
import {Patient} from '../../../models/Patient';
import {Address} from '../../../models/Address';
import {EmergencyInfo} from '../../../models/EmergencyInfo';
import {Contact} from '../../../models/Contact';
import {NgxSpinnerService} from 'ngx-spinner';
import {Variables} from '../../../utility/variables';

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
              private spinner: NgxSpinnerService,
              private patientService: PatientsService) {
  }

  ngOnInit(): void {

  }

  quickAdd() {
    const address = new Address();
    const emergencyInfo = new EmergencyInfo();
    const contactInfo = new Contact(this.forgetForm.get('phoneNumber').value);

    const newPatient = new Patient(
      Variables.currentDate,
      Variables.defaultPatientTitleId,
      this.forgetForm.get('firstName').value,
      '',
      '',
      '',
      null,
      Variables.defaultAge,
      contactInfo,
      address,
      emergencyInfo);

    this.spinner.show();
    this.patientService.savePatient(newPatient).subscribe(
      result => {
        this.spinner.hide();
        this.dialogRef.close(result);
      }, error => {
        this.spinner.hide();
        console.log(error);
      }
    );

  }


}
