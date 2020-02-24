import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Doctor} from '../../../models/Doctor';
import {DoctorsService} from '../../../services/Doctors/doctors.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-adddoctor',
  templateUrl: './adddoctor.component.html',
  styleUrls: ['../addpatient/addpatient.component.css'] // reuse
})
export class AdddoctorComponent implements OnInit {

  hidePassword = true;
  @ViewChild('stepper') stepper: ElementRef;

  primaryInfo = this.formBuilder.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.min(6)]]
  });

  appointmentRelatedInfo = this.formBuilder.group({
    displayOrder: ['', Validators.required],
    manageBlock: [false, Validators.required],
    manageBooking: [false, Validators.required],
    isDoctor: [false, Validators.required]
  });

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private doctorService: DoctorsService) {
  }

  ngOnInit(): void {
  }

  submit() {
    const newDoctor = new Doctor(
      0,
      this.primaryInfo.get('name').value,
      this.primaryInfo.get('username').value,
      this.primaryInfo.get('password').value,
      this.appointmentRelatedInfo.get('displayOrder').value,
      this.appointmentRelatedInfo.get('manageBlock').value,
      this.appointmentRelatedInfo.get('manageBooking').value,
      this.appointmentRelatedInfo.get('isDoctor').value
    );

    console.log(newDoctor);

    this.doctorService.saveDoctor(newDoctor).subscribe(
      result => {
        this.openSnackBar('😊 New Doctor added', 'Ok');
        console.log(result);
        // this.stepper.reset();
      },
      error => {
        console.error(error);
      }
    );

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }
}
