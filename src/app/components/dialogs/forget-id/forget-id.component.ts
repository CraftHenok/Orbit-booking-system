import {Component, OnInit} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {Patient} from '../../../models/Patient';
import {PatientsService} from '../../../services/Patients/patients.service';

@Component({
  selector: 'app-forget-id',
  templateUrl: './forget-id.component.html',
  styleUrls: ['./forget-id.component.css']
})
export class ForgetIdComponent implements OnInit {

  forgetForm = this.fb.group({
    firstName: ['', Validators.required],
    phoneNumber: ['', Validators.required],
  });

  searchResultCount: number;
  patientSearchResult: Patient[] = [];

  constructor(
    private dialogRef: MatDialogRef<ForgetIdComponent>,
    private fb: FormBuilder,
    private patientService: PatientsService
  ) {
  }

  ngOnInit(): void {

  }

  search() {
    const firstName = this.forgetForm.get('firstName').value;
    const pn = this.forgetForm.get('phoneNumber').value;

    this.patientService.getPatientForgetId(firstName, pn).subscribe(
      result => {
        this.searchResultCount = result.length;
        this.patientSearchResult = result;
      },
      error => {
        console.error(error);
      }
    );

  }

  sendAndClose(p: Patient) {
    this.dialogRef.close(p);
  }
}
