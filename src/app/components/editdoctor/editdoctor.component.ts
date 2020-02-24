import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DoctorsService} from '../../services/Doctors/doctors.service';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Doctor} from '../../models/Doctor';

@Component({
  selector: 'app-editdoctor',
  templateUrl: './editdoctor.component.html',
  styleUrls: ['./editdoctor.component.css']
})
export class EditdoctorComponent implements OnInit {

  hidePassword = true;

  primaryInfo = this.formBuilder.group({
    name: ['', Validators.required],
    username: ['', Validators.required],
    password: ['', [Validators.required, Validators.min(6)]]
  });

  appointmentRelatedInfo = this.formBuilder.group({
    displayOrder: ['', Validators.required],
    manageBlock: ['', Validators.required],
    manageBooking: ['', Validators.required],
    isDoctor: ['', Validators.required]
  });


  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private doctorService: DoctorsService) {
  }

  ngOnInit(): void {

    this.activatedRoute.paramMap.pipe(
      switchMap(params => this.doctorService.getDoctorById(Number(params.get('doctorId'))))
    ).subscribe(result => {
      this.bindDate(result);
    }, error => {
      console.error(error);
    });
  }

  private bindDate(doctor: Doctor) {
    // primary info
    this.primaryInfo.get('name').setValue(doctor.name);
    this.primaryInfo.get('username').setValue(doctor.username);
    this.primaryInfo.get('password').setValue(doctor.password);


    this.appointmentRelatedInfo.get('displayOrder').setValue(doctor.displayOrder);
    this.appointmentRelatedInfo.get('manageBlock').setValue(doctor.manageBlocks);
    this.appointmentRelatedInfo.get('manageBooking').setValue(doctor.manageBooking);
    this.appointmentRelatedInfo.get('isDoctor').setValue(doctor.isDoctor);
  }

  submit() {

  }
}
