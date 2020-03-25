import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PatientsService} from '../../../services/Patients/patients.service';
import {GeneralTitle} from '../../../models/GeneralTitle';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Country} from '../../../models/Country';
import {PatientsFormManager} from '../../../utility/patientsFormManager';
import {SnackBarManager} from '../../../utility/snackBarManager';
import {DateManager} from '../../../utility/dateManager';
import {PatientTitleService} from '../../../services/Patients/PatientTitle/patient-title.service';
import {EmergencyTitleService} from '../../../services/Patients/EmergencyTitle/emergency-title.service';
import {NgxSpinnerService} from 'ngx-spinner';

export const filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent implements OnInit, OnDestroy {

  countries: Country[] = Country.getAll();

  @ViewChild('stepper') stepper: ElementRef;

  filteredCountry: Observable<Country[]>;
  filteredCountry2: Observable<Country[]>;

  patientsTitles: GeneralTitle[] = [];
  emergencyTitle: GeneralTitle[] = [];

  private patientsFormManager: PatientsFormManager;

  primaryInfoForm: FormGroup;

  contactInfoForm: FormGroup;

  addressForm: FormGroup;

  emergencyInfoForm: FormGroup;

  private subscription: Subscription = new Subscription();

  private snackBarMan: SnackBarManager;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientsService,
              private patientTitleService: PatientTitleService,
              private emergencyTitleService: EmergencyTitleService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar) {
    this.patientsFormManager = new PatientsFormManager(formBuilder);
    this.primaryInfoForm = this.patientsFormManager.getFormBuilder().primaryInfoForm;
    this.contactInfoForm = this.patientsFormManager.getFormBuilder().contactInfoForm;
    this.addressForm = this.patientsFormManager.getFormBuilder().addressForm;
    this.emergencyInfoForm = this.patientsFormManager.getFormBuilder().emergencyInfoForm;
    this.snackBarMan = new SnackBarManager(this.snackBar);

  }

  ngOnInit(): void {

    // tslint:disable-next-line:no-non-null-assertion
    this.filteredCountry = this.primaryInfoForm.get('nationality')!.valueChanges
      .pipe(
        startWith(''),
        map(country => country ? Country.filter(country) : this.countries.slice())
      );

    // tslint:disable-next-line:no-non-null-assertion
    this.filteredCountry2 = this!.addressForm.get('country')!.valueChanges
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
    const newPatient = PatientsFormManager.bindDateToNewPatient(this.primaryInfoForm, this.contactInfoForm,
      this.addressForm, this.emergencyInfoForm);

    this.subscription.add(this.patientService.savePatient(newPatient).subscribe(
      result => {
        this.spinner.hide();
        this.snackBarMan.show('New patient added', 'Ok');
      },
      error => {
        this.spinner.hide();
        console.error(error);
      }
    ));

  }

  setBirthDate() {
    const age = this.primaryInfoForm.get('age').value;
    this.primaryInfoForm.get('dateOfBirth').setValue(DateManager.getDateFromAge(age));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
