import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {DoctorsService} from '../../../services/Doctors/doctors.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Subscription} from 'rxjs';
import {DoctorsFormManager} from '../../../utility/doctorsFormManager';
import {SnackBarManager} from '../../../utility/snackBarManager';
import {NgxSpinnerService} from 'ngx-spinner';
import {Variables} from '../../../utility/variables';

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
  private snackBarMan: SnackBarManager;

  private subscription: Subscription = new Subscription();

  status = Variables.status;

  constructor(private formBuilder: FormBuilder,
              private snackBar: MatSnackBar,
              private spinner: NgxSpinnerService,
              private doctorService: DoctorsService) {
  }

  ngOnInit(): void {
    this.commonFormBuilder = new DoctorsFormManager(this.formBuilder);
    this.primaryInfo = this.commonFormBuilder.getFormBuilders();
    this.snackBarMan = new SnackBarManager(this.snackBar);
  }

  submit() {
    this.spinner.show();
    const newDoctor = DoctorsFormManager.bindDataToNewDoctor(0, this.primaryInfo);

    this.subscription.add(this.doctorService.saveDoctor(newDoctor).subscribe(
      result => {
        this.spinner.hide();
        this.snackBarMan.show('New Doctor added', 'Ok');
      },
      error => {
        this.spinner.hide();
        console.error(error);
      }
    ));

  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }


}
