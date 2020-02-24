import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PatientsService} from '../../services/Patients/patients.service';
import {GeneralTitle} from '../../models/GeneralTitle';
import {Patient} from '../../models/Patient';
import {Contact} from '../../models/Contact';
import {Address} from '../../models/Address';
import {EmergencyInfo} from '../../models/EmergencyInfo';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Country} from '../../models/Country';

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

  public primaryInfoForm = this.formBuilder.group({
    patientTitleId: ['', Validators.required],
    firstName: ['', Validators.required],
    middleName: ['', Validators.required],
    lastName: ['', Validators.required],
    gender: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    age: ['', Validators.required],
    nationality: [''],
  });

  contactInfoForm = this.formBuilder.group({
    email: ['', Validators.email],
    primaryPhoneNumber: ['', Validators.required],
    alternatePhoneNumber: ['']
  });

  addressForm = this.formBuilder.group({
    line1: [''],
    line2: [''],
    city: [''],
    country: [''],
  });

  emergencyInfoForm = this.formBuilder.group({
    title: [''],
    name: [''],
    primaryPhoneNumber: [''],
    alternatePhoneNumber: [''],
  });

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientsService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    this.filteredCountry = this.primaryInfoForm.get('nationality')!.valueChanges
      .pipe(
        startWith(''),
        map(country => country ? this.filterCountry(country) : this.countries.slice())
      );

    this.filteredCountry2 = this.addressForm.get('country')!.valueChanges
      .pipe(
        startWith(''),
        map(country => country ? this.filterCountry(country) : this.countries.slice())
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

  private filterCountry(name: string): Country[] {
    const filterValue = name.toLowerCase();
    return this.countries.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }


  submit() {
    const contactInfo = new Contact(
      this.contactInfoForm.get('primaryPhoneNumber').value,
      this.contactInfoForm.get('email').value,
      this.contactInfoForm.get('alternatePhoneNumber').value,
    );

    const addressInfo = new Address(
      this.addressForm.get('line1').value,
      this.addressForm.get('line2').value,
      this.addressForm.get('city').value,
      this.addressForm.get('country').value
    );

    const emergencyInfo = new EmergencyInfo(
      this.emergencyInfoForm.get('title').value,
      this.emergencyInfoForm.get('name').value,
      this.emergencyInfoForm.get('primaryPhoneNumber').value,
      this.emergencyInfoForm.get('alternatePhoneNumber').value
    );


    const newPatient = new Patient(
      0,
      new Date(),
      this.primaryInfoForm.get('patientTitleId').value,
      this.primaryInfoForm.get('firstName').value,
      this.primaryInfoForm.get('middleName').value,
      this.primaryInfoForm.get('lastName').value,
      this.primaryInfoForm.get('gender').value,
      this.primaryInfoForm.get('dateOfBirth').value,
      this.primaryInfoForm.get('age').value,
      contactInfo,
      addressInfo,
      emergencyInfo,
      this.primaryInfoForm.get('nationality').value,
    );

    this.patientService.savePatient(newPatient).subscribe(
      result => {
        this.openSnackBar('😊 New patient added', 'Ok');
        console.log(result);
        // this.stepper.reset();
      },
      error => {
        console.error(error);
      }
    );

  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 4000,
    });
  }

}
