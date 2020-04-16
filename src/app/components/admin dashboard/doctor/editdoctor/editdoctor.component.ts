import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {switchMap} from 'rxjs/operators';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Doctor} from '../../../../models/Doctor';
import {SnackBarManager} from '../../../../utility/snackBarManager';
import {Variables} from '../../../../utility/variables';
import {DoctorsService} from '../../../../services/Doctors/doctors.service';
import {DoctorsFormManager} from '../../../../utility/doctorsFormManager';
import {Location} from '@angular/common';

@Component({
  selector: 'app-editdoctor',
  templateUrl: './editdoctor.component.html',
  styleUrls: ['../../reception/add-reception/add-reception.component.css'] // reuse
})
export class EditdoctorComponent implements OnInit, OnDestroy {

  hidePassword = true;
  doctor: Doctor;

  doctorFormManager: DoctorsFormManager;

  private snackBarMan: SnackBarManager;
  private subscription: Subscription = new Subscription();

  status = Variables.status;
  error: string;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private activatedRoute: ActivatedRoute,
              private location: Location,
              private doctorService: DoctorsService) {
    this.doctorFormManager = new DoctorsFormManager(this.formBuilder);
    this.snackBarMan = new SnackBarManager(this.snackBar);
  }

  ngOnInit(): void {

    this.subscription.add(this.activatedRoute.paramMap.pipe(
      switchMap(params => this.doctorService.getDoctorById(Number(params.get('doctorId'))))
    ).subscribe(result => {
      this.doctor = result;
      this.doctorFormManager.updateForm(result);
    }, error => {
      console.error(error);
    }));
  }


  submit() {

    const updatedDoctor = this.doctorFormManager.bindDataToNewDoctor(this.doctor.id);

    this.subscription.add(this.doctorService.updateDoctor(updatedDoctor).subscribe(
      result => {
        console.log(result);
        if (result > 0) {
          this.snackBarMan.show('Doctor updated successfully', 'Ok');
        }
        this.location.back();
      }, error => {
        this.error = error.error;
        console.error(error);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
