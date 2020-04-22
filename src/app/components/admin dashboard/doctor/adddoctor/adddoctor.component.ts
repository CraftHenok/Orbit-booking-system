import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';
import {DoctorsFormManager} from '../../../../utility/doctorsFormManager';
import {SnackBarManager} from '../../../../utility/snackBarManager';
import {Variables} from '../../../../utility/variables';
import {DoctorsService} from '../../../../services/Doctors/doctors.service';

@Component({
  selector: 'app-adddoctor',
  templateUrl: './adddoctor.component.html',
  styleUrls: ['../../reception/add-reception/add-reception.component.css']
})
export class AdddoctorComponent implements OnInit, OnDestroy {

  hidePassword = true;

  doctorsFormManager: DoctorsFormManager;

  private snackBarMan: SnackBarManager;

  private subscription: Subscription = new Subscription();

  status = Variables.status;
  error: string;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private doctorService: DoctorsService) {
  }

  ngOnInit(): void {
    this.doctorsFormManager = new DoctorsFormManager(this.formBuilder);
    this.snackBarMan = new SnackBarManager(this.snackBar);
  }

  submit() {
    const newDoctor = this.doctorsFormManager.bindDataToNewDoctor();

    this.subscription.add(this.doctorService.saveDoctor(newDoctor).subscribe(
      result => {
        this.snackBarMan.show('New Doctor added', 'Ok');
        this.doctorsFormManager.doctorForm.reset();
      },
      error => {
        this.error = error.error;
        console.error(error);
      }
    ));

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
