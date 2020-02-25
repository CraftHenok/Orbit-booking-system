import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PatientsService} from '../../../services/Patients/patients.service';
import {GeneralTitle} from '../../../models/GeneralTitle';
import {Patient} from '../../../models/Patient';
import {Contact} from '../../../models/Contact';
import {Address} from '../../../models/Address';
import {EmergencyInfo} from '../../../models/EmergencyInfo';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Country} from '../../../models/Country';
import {PatientsFormManager} from '../../../utility/patientsFormManager';
import {SnackBarManager} from '../../../utility/snackBarManager';

export const filter = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();
  return opt.filter(item => item.toLowerCase().indexOf(filterValue) === 0);
};

@Component({
  selector: 'app-addpatient',
  templateUrl: './addpatient.component.html',
  styleUrls: ['./addpatient.component.css']
})
export class AddpatientComponent implements OnInit {

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

  private snackBarMan: SnackBarManager;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientsService,
              private snackBar: MatSnackBar) {
    this.patientsFormManager = new PatientsFormManager(formBuilder);
    this.primaryInfoForm = this.patientsFormManager.getFormBuilder().primaryInfoForm;
    this.contactInfoForm = this.patientsFormManager.getFormBuilder().contactInfoForm;
    this.addressForm = this.patientsFormManager.getFormBuilder().addressForm;
    this.emergencyInfoForm = this.patientsFormManager.getFormBuilder().emergencyInfoForm;
    this.snackBarMan = new SnackBarManager(this.snackBar);

  }

  ngOnInit(): void {

    this.filteredCountry = this.primaryInfoForm.get('nationality')!.valueChanges
      .pipe(
        startWith(''),
        map(country => country ? Country.filter(country) : this.countries.slice())
      );

    this.filteredCountry2 = this!.addressForm.get('country')!.valueChanges
      .pipe(
        startWith(''),
        map(country => country ? Country.filter(country) : this.countries.slice())
      );

    this.patientService.getPatientTitle().subscribe(
      result => {
        this.patientsTitles = result;
      },
      error => {
        console.error(error);
      }
    );

    this.patientService.getEmergencyTitle().subscribe(
      result => {
        this.emergencyTitle = result;
      },
      error => {
        console.error(error);
      }
    );

  }


  submit() {

    const newPatient = PatientsFormManager.bindDateToNewPatient(this.primaryInfoForm, this.contactInfoForm,
      this.addressForm, this.emergencyInfoForm);

    this.patientService.savePatient(newPatient).subscribe(
      result => {
        this.snackBarMan.show('New patient added', 'Ok');
      },
      error => {
        console.error(error);
      }
    );

  }

}
