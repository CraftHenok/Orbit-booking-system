import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Doctor} from '../../../models/Doctor';
import {DoctorsService} from '../../../services/Doctors/doctors.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable, Subscription} from 'rxjs';
import {DoctorsFormManager} from '../../../utility/doctorsFormManager';
import {SnackBarManager} from '../../../utility/snackBarManager';

@Component({
  selector: 'app-adddoctor',
  templateUrl: './adddoctor.component.html',
  styleUrls: ['../addpatient/addpatient.component.css'] // reuse
})
export class AdddoctorComponent implements OnInit, OnDestroy {

  hidePassword = true;
  @ViewChild('stepper') stepper: ElementRef;

  private commonFormBuilder: DoctorsFormManager;
  primaryInfo: FormGroup;
  appointmentRelatedInfo: FormGroup;
  private snackBarMan: SnackBarManager;

  private subscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private doctorService: DoctorsService) {
  }

  ngOnInit(): void {
    this.commonFormBuilder = new DoctorsFormManager(this.formBuilder);
    this.primaryInfo = this.commonFormBuilder.getFormBuilders().primaryInfo;
    this.appointmentRelatedInfo = this.commonFormBuilder.getFormBuilders().appointmentRelatedInfo;
    this.snackBarMan = new SnackBarManager(this.snackBar);
  }

  submit() {
    const newDoctor = DoctorsFormManager.bindDataToNewDoctor(0, this.primaryInfo, this.appointmentRelatedInfo);

    this.subscription.add(this.doctorService.saveDoctor(newDoctor).subscribe(
      result => {
        this.snackBarMan.show('New Doctor added', 'Ok');
      },
      error => {
        console.error(error);
      }
    ));

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
