import {Component, OnInit} from '@angular/core';
import {GeneralTitle} from '../../../models/GeneralTitle';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PatientsService} from '../../../services/Patients/patients.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {map, startWith, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {Country} from '../../../models/Country';
import {Patient} from '../../../models/Patient';
import {ActivatedRoute} from '@angular/router';
import {PatientsFormManager} from '../../../utility/patientsFormManager';
import {SnackBarManager} from '../../../utility/snackBarManager';

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

  private patientsFormManager: PatientsFormManager;

  primaryInfoForm: FormGroup;

  contactInfoForm: FormGroup;

  addressForm: FormGroup;

  emergencyInfoForm: FormGroup;

  private snackBarMan: SnackBarManager;

  constructor(private formBuilder: FormBuilder,
              private patientService: PatientsService,
              private activatedRoute: ActivatedRoute,
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

    this.filteredCountry2 = this.addressForm.get('country')!.valueChanges
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

    this.activatedRoute.paramMap.pipe(
      switchMap(params => this.patientService.getPatientByIdFull(Number(params.get('patientId'))))
    ).subscribe(result => {
      this.patient = result;
      this.updateData(result);
    }, error => {
      console.error(error);
    });


  }

  private updateData(patient: Patient) {

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

  submit() {

    this.patient = PatientsFormManager.bindDateToOldPatient(this.primaryInfoForm, this.contactInfoForm,
      this.addressForm, this.emergencyInfoForm, this.patient);

    this.patientService.updatePatient(this.patient).subscribe(
      result => {
        if (result > 0) {
          this.snackBarMan.show('Patient updated successfully', 'Ok');
        }
      },
      error => {
        console.error(error);
      }
    );
  }
}
