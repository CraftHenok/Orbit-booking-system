import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {LocalAppointments} from '../../../models/Appointemts/LocalAppointments';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import {addMinutes} from 'date-fns';
import {GeneralStatus} from '../../../models/GeneralStatus';
import {GeneralType} from '../../../models/GeneralType';
import {AppointmentsServices} from '../../../services/Appointments/appointments-services';
import {Subscription} from 'rxjs';
import {DateManager} from '../../../utility/dateManager';
import {AppointmentStatusService} from '../../../services/Appointments/Status/appointment-status.service';
import {AppointmentTypeService} from '../../../services/Appointments/Type/appointment-type.service';
import {DurationService} from '../../../services/Duration/duration.service';
import {Duration} from '../../../models/Duration';


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
export class AddEditDialogComponent implements OnInit, OnDestroy {

  public addForm = this.formBuilder.group({
    PatientId: [this.data.patientId, Validators.required],
    AppointmentType: [this.data.appointmentTypeId, Validators.required],
    AppointmentStatus: [this.data.appointmentStatusId, Validators.required],
    start: [this.data.start, Validators.required],
    duration: [DateManager.findDuration(this.data.start, this.data.end), Validators.required],
    IsServed: [this.data.isServed ? this.data.isServed : false],
    ServedBy: [this.data.servedBy, Validators.required],
  });

  public matcher = new MyErrorStateMatcher();

  public appointmentStatus: GeneralStatus[] = [];
  public appointmentType: GeneralType[] = [];
  public durationList: Duration[] = [];

  private subscription: Subscription = new Subscription();

  constructor(
    private dialogRef: MatDialogRef<AddEditDialogComponent>,
    private formBuilder: FormBuilder,
    private calenderEventService: AppointmentsServices,
    private appointmentStatusService: AppointmentStatusService,
    private appointmentTypeService: AppointmentTypeService,
    private durationService: DurationService,
    @Inject(MAT_DIALOG_DATA) public data: LocalAppointments) {
  }

  ngOnInit(): void {
    this.subscription.add(this.appointmentStatusService.get().subscribe(
      result => {
        this.appointmentStatus.push(...result);
      },
      error => {
        console.error(error);
      }
    ));

    this.subscription.add(this.appointmentTypeService.get().subscribe(
      result => {
        this.appointmentType.push(...result);
      },
      error => {
        console.error(error);
      }
    ));

    this.subscription.add(this.durationService.get().subscribe(
      result => {
        this.durationList.push(...result);
      }, error => {
        console.error(error);
      }
    ));

    console.log(this.ServedBy.value);
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

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
