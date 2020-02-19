import {Component, Inject, OnInit} from '@angular/core';
import {LocalAppointments} from '../../../models/Appointemts/LocalAppointments';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {addMinutes} from 'date-fns';
import {AppointmentStatus} from '../../../models/Appointemts/AppointmentStatus';
import {AppointmentType} from '../../../models/Appointemts/AppointmentType';
import {AppointmentsServices} from '../../../services/Appointments/appointments-services';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}


@Component({
  selector: 'app-dialog-overview-example-dialog',
  templateUrl: './addEditDialog.component.html',
  styleUrls: ['./addEditDialog.component.css']
})
export class AddEditDialogComponent implements OnInit {

  private addForm = this.formBuilder.group({
    PatientId: [this.data.patientId, Validators.required],
    AppointmentType: [this.data.appointmentTypeId, Validators.required],
    AppointmentStatus: [this.data.appointmentStatusId, Validators.required],
    start: [this.data.start, Validators.required],
    duration: [0, Validators.required],
    IsServed: [this.data.isServed ? this.data.isServed : false],
    ServedBy: [this.data.servedBy, Validators.required],
  });

  private matcher = new MyErrorStateMatcher();

  private appointmentStatus: AppointmentStatus[] = [];
  private appointmentType: AppointmentType[] = [];

  constructor(
    private dialogRef: MatDialogRef<AddEditDialogComponent>,
    private formBuilder: FormBuilder,
    private calenderEventService: AppointmentsServices,
    @Inject(MAT_DIALOG_DATA) public data: LocalAppointments) {
  }

  ngOnInit(): void {
    this.calenderEventService.getAppointmentStatus().subscribe(
      result => {
        this.appointmentStatus = result;
      },
      error => {
        console.log(error);
      }
    );

    this.calenderEventService.getAppointmentTypes().subscribe(
      result => {
        this.appointmentType = result;
      },
      error => {
        console.log(error);
      }
    );
  }

  deleteClicked() {
    this.bindData();
    if (this.data.patientId) {
      this.data.action = 'D';
      this.dialogRef.close(this.data);
    }
  }

  onSubmit(state: string) {
    this.bindData();
    this.data.action = state;
    this.dialogRef.close(this.data);
  }


  bindData() {
    this.data.patientId = this.PatientId.value;
    this.data.appointmentTypeId = this.AppointmentType.value;
    this.data.appointmentStatusId = this.AppointmentStatus.value;
    this.data.start = this.start.value;

    this.data.end = addMinutes(this.data.start, this.duration.value);


    this.data.isServed = this.IsServed.value !== false;
    this.data.servedBy = this.ServedBy.value;
  }

  get PatientId() {
    return this.addForm.get('PatientId');
  }

  get AppointmentType() {
    return this.addForm.get('AppointmentType');
  }

  get AppointmentStatus() {
    return this.addForm.get('AppointmentStatus');
  }

  get start() {
    return this.addForm.get('start');
  }

  get duration() {
    return this.addForm.get('duration');
  }

  get IsServed() {
    return this.addForm.get('IsServed');
  }

  get ServedBy() {
    return this.addForm.get('ServedBy');
  }


}
