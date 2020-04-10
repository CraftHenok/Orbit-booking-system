import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {map, startWith, switchMap} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {NgxSpinnerService} from 'ngx-spinner';
import {Country} from '../../../../models/Country';
import {GeneralTitle} from '../../../../models/GeneralTitle';
import {Patient} from '../../../../models/Patient';
import {PatientsFormManager} from '../../../../utility/patientsFormManager';
import {SnackBarManager} from '../../../../utility/snackBarManager';
import {PatientsService} from '../../../../services/Patients/patients.service';
import {PatientTitleService} from '../../../../services/Patients/PatientTitle/patient-title.service';
import {EmergencyTitleService} from '../../../../services/Patients/EmergencyTitle/emergency-title.service';

@Component({
  selector: 'app-editpatient',
  templateUrl: './editpatient.component.html',
  styleUrls: ['./editpatient.component.css']
})
export class EditpatientComponent implements OnInit, OnDestroy {

  countries: Country[] = Country.getAll();

  filteredCountry: Observable<Country[]>;
  filteredCountry2: Observable<Country[]>;

  patientsTitles: GeneralTitle[] = [];
  emergencyTitle: GeneralTitle[] = [];

  patient: Patient;

  patientsFormManager: PatientsFormManager;

  private snackBarMan: SnackBarManager;

  private subscription: Subscription = new Subscription();

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientsService,
              private activatedRoute: ActivatedRoute,
              private patientTitleService: PatientTitleService,
              private spinner: NgxSpinnerService,
              private emergencyTitleService: EmergencyTitleService,
              private snackBar: MatSnackBar) {
    this.patientsFormManager = new PatientsFormManager(formBuilder);
    this.snackBarMan = new SnackBarManager(this.snackBar);
  }

  ngOnInit(): void {

    this.subscription.add(this.activatedRoute.paramMap.pipe(
      switchMap(params => this.patientService.getPatientByIdFull(Number(params.get('patientId'))))
    ).subscribe(result => {
      this.patient = result;
      this.patientsFormManager.updateForm(result);
    }, error => {
      console.error(error);
    }));

    // tslint:disable-next-line:no-non-null-assertion
    this.filteredCountry = this.patientsFormManager.primaryInfoForm.get('nationality')!.valueChanges
      .pipe(
        startWith(''),
        map(country => country ? Country.filter(country) : this.countries.slice())
      );

    // tslint:disable-next-line:no-non-null-assertion
    this.filteredCountry2 = this.patientsFormManager.addressForm.get('country')!.valueChanges
      .pipe(
        startWith(''),
        map(country => country ? Country.filter(country) : this.countries.slice())
      );

    this.subscription.add(this.patientTitleService.get().subscribe(
      result => {
        this.patientsTitles.push(...result);
      },
      error => {
        console.error(error);
      }
    ));

    this.subscription.add(this.emergencyTitleService.get().subscribe(
      result => {
        this.emergencyTitle.push(...result);
      },
      error => {
        console.error(error);
      }
    ));


  }

  submit() {

    this.spinner.show();

    this.patientsFormManager.bindDateToOldPatient(this.patient);

    this.subscription.add(this.patientService.updatePatient(this.patient).subscribe(
      result => {
        if (result > 0) {
          this.snackBarMan.show('Patient updated successfully', 'Ok');
        }
      },
      error => {
        console.error(error);
      },
      () => {
        this.spinner.hide();
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  isAllFormInValid() {
    return this.patientsFormManager.primaryInfoForm.invalid ||
      this.patientsFormManager.contactInfoForm.invalid ||
      this.patientsFormManager.addressForm.invalid ||
      this.patientsFormManager.emergencyInfoForm.invalid;
  }
}
