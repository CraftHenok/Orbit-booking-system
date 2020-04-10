import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgxSpinnerService} from 'ngx-spinner';
import {Country} from '../../../../models/Country';
import {GeneralTitle} from '../../../../models/GeneralTitle';
import {PatientsFormManager} from '../../../../utility/patientsFormManager';
import {SnackBarManager} from '../../../../utility/snackBarManager';
import {PatientsService} from '../../../../services/Patients/patients.service';
import {PatientTitleService} from '../../../../services/Patients/PatientTitle/patient-title.service';
import {EmergencyTitleService} from '../../../../services/Patients/EmergencyTitle/emergency-title.service';

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

  patientsFormManager: PatientsFormManager;

  private subscription: Subscription = new Subscription();

  private snackBarMan: SnackBarManager;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientsService,
              private patientTitleService: PatientTitleService,
              private emergencyTitleService: EmergencyTitleService,
              private spinner: NgxSpinnerService,
              private snackBar: MatSnackBar) {
    this.patientsFormManager = new PatientsFormManager(formBuilder);
    this.snackBarMan = new SnackBarManager(this.snackBar);

  }

  ngOnInit(): void {

    // tslint:disable-next-line:no-non-null-assertion
    this.filteredCountry = this.patientsFormManager.primaryInfoForm.get('nationality')!.valueChanges
      .pipe(
        startWith(''),
        map(country => country ? Country.filter(country) : this.countries.slice())
      );

    // tslint:disable-next-line:no-non-null-assertion
    this.filteredCountry2 = this!.patientsFormManager.addressForm.get('country')!.valueChanges
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

    const newPatient = this.patientsFormManager.bindDateToNewPatient();

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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
