import {Component, OnInit} from '@angular/core';
import {GeneralTitle} from '../../../models/GeneralTitle';
import {FormBuilder, Validators} from '@angular/forms';
import {PatientsService} from '../../../services/Patients/patients.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {map, startWith, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Country} from '../../../models/Country';
import {Patient} from '../../../models/Patient';
import {ActivatedRoute} from '@angular/router';
import {Contact} from '../../../models/Contact';
import {Address} from '../../../models/Address';
import {EmergencyInfo} from '../../../models/EmergencyInfo';

@Component({
  selector: 'app-editpatient',
  templateUrl: './editpatient.component.html',
  styleUrls: ['./editpatient.component.css']
})
export class EditpatientComponent implements OnInit {

  countries: Country[] = Country.getAll();

  filteredCountry: Observable<Country[]>;
  filteredCountry2: Observable<Country[]>;

  patientsTitles: GeneralTitle[] = [];
  emergencyTitle: GeneralTitle[] = [];

  patient: Patient;

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
              private activatedRoute: ActivatedRoute,
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

    this.activatedRoute.paramMap.pipe(
      switchMap(params => this.patientService.getPatientByIdFull(Number(params.get('patientId'))))
    ).subscribe(result => {
      this.patient = result;
      this.bindDate(result);
    }, error => {
      console.error(error);
    });


  }

  private bindDate(patient: Patient) {

    // primary info
    this.primaryInfoForm.get('patientTitleId').setValue(patient.patientTitleId);
    this.primaryInfoForm.get('firstName').setValue(patient.firstName);
    this.primaryInfoForm.get('middleName').setValue(patient.middleName);
    this.primaryInfoForm.get('lastName').setValue(patient.lastName);
    this.primaryInfoForm.get('gender').setValue(patient.gender);
    this.primaryInfoForm.get('dateOfBirth').setValue(patient.dateOfBirth);
    this.primaryInfoForm.get('age').setValue(patient.age);
    this.primaryInfoForm.get('nationality').setValue(patient.nationality);

    // contact info
    this.contactInfoForm.get('email').setValue(patient.contact.email);
    this.contactInfoForm.get('primaryPhoneNumber').setValue(patient.contact.phoneNumber);
    this.contactInfoForm.get('alternatePhoneNumber').setValue(patient.contact.alternatePhoneNumber);

    // address
    this.addressForm.get('line1').setValue(patient.address.line1);
    this.addressForm.get('line2').setValue(patient.address.line2);
    this.addressForm.get('city').setValue(patient.address.city);
    this.addressForm.get('country').setValue(patient.address.country);

    // emergency info
    this.emergencyInfoForm.get('title').setValue(patient.emergencyInfo.emergencyTitleId);
    this.emergencyInfoForm.get('name').setValue(patient.emergencyInfo.name);
    this.emergencyInfoForm.get('primaryPhoneNumber').setValue(patient.emergencyInfo.phoneNumber);
    this.emergencyInfoForm.get('alternatePhoneNumber').setValue(patient.emergencyInfo.alternatePhoneNumber);

  }

  private filterCountry(name: string): Country[] {
    const filterValue = name.toLowerCase();
    return this.countries.filter(state => state.name.toLowerCase().indexOf(filterValue) === 0);
  }

  submit() {
    const updateContactInfo = new Contact(
      this.contactInfoForm.get('primaryPhoneNumber').value,
      this.contactInfoForm.get('email').value,
      this.contactInfoForm.get('alternatePhoneNumber').value,
    );

    const updateAddressInfo = new Address(
      this.addressForm.get('line1').value,
      this.addressForm.get('line2').value,
      this.addressForm.get('city').value,
      this.addressForm.get('country').value
    );

    const updateEmergencyInfo = new EmergencyInfo(
      this.emergencyInfoForm.get('title').value,
      this.emergencyInfoForm.get('name').value,
      this.emergencyInfoForm.get('primaryPhoneNumber').value,
      this.emergencyInfoForm.get('alternatePhoneNumber').value
    );


    const updateNewPatient = new Patient(
      this.patient.seq,
      new Date(),
      this.primaryInfoForm.get('patientTitleId').value,
      this.primaryInfoForm.get('firstName').value,
      this.primaryInfoForm.get('middleName').value,
      this.primaryInfoForm.get('lastName').value,
      this.primaryInfoForm.get('gender').value,
      this.primaryInfoForm.get('dateOfBirth').value,
      this.primaryInfoForm.get('age').value,
      updateContactInfo,
      updateAddressInfo,
      updateEmergencyInfo,
      this.primaryInfoForm.get('nationality').value,
    );


    this.patientService.updatePatient(updateNewPatient).subscribe(
      result => {
        if (result > 0) {
          this.openSnackBar('Patient updated successfully', 'Ok');
        }
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
