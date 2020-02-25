import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {DoctorsService} from '../../../services/Doctors/doctors.service';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Doctor} from '../../../models/Doctor';
import {DoctorsFormManager} from '../../../utility/doctorsFormManager';
import {SnackBarManager} from '../../../utility/snackBarManager';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-editdoctor',
  templateUrl: './editdoctor.component.html',
  styleUrls: ['./editdoctor.component.css']
})
export class EditdoctorComponent implements OnInit, OnDestroy {

  hidePassword = true;
  doctor: Doctor;

  private commonFormBuilder: DoctorsFormManager;
  primaryInfo: FormGroup;
  appointmentRelatedInfo: FormGroup;
  private snackBarMan: SnackBarManager;

  private subscription: Subscription = new Subscription();


  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private doctorService: DoctorsService) {
    this.commonFormBuilder = new DoctorsFormManager(this.formBuilder);
    this.primaryInfo = this.commonFormBuilder.getFormBuilders().primaryInfo;
    this.appointmentRelatedInfo = this.commonFormBuilder.getFormBuilders().appointmentRelatedInfo;
    this.snackBarMan = new SnackBarManager(this.snackBar);
  }

  ngOnInit(): void {

    this.subscription.add(this.activatedRoute.paramMap.pipe(
      switchMap(params => this.doctorService.getDoctorById(Number(params.get('doctorId'))))
    ).subscribe(result => {
      this.doctor = result;
      this.updateForm(result);
    }, error => {
      console.error(error);
    }));
  }

  private updateForm(doctor: Doctor) {
    this.primaryInfo.get('name').setValue(doctor.name);
    this.primaryInfo.get('username').setValue(doctor.username);
    this.primaryInfo.get('password').setValue(doctor.password);


    this.appointmentRelatedInfo.get('displayOrder').setValue(doctor.displayOrder);
    this.appointmentRelatedInfo.get('manageBlock').setValue(doctor.manageBlocks);
    this.appointmentRelatedInfo.get('manageBooking').setValue(doctor.manageBooking);
    this.appointmentRelatedInfo.get('isDoctor').setValue(doctor.isDoctor);
  }

  submit() {
    const updatedDoctor = DoctorsFormManager.bindDataToNewDoctor(this.doctor.seq, this.primaryInfo, this.appointmentRelatedInfo);

    this.subscription.add(this.doctorService.updateDoctor(updatedDoctor).subscribe(
      result => {
        if (result > 0) {
          this.snackBarMan.show('Doctor updated successfully', 'Ok');
        }
      }, error => {
        console.error(error);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
