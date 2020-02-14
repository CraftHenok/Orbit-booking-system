import {Component, Inject, OnInit} from '@angular/core';
import {LocalAppointments} from '../../models/Appointemts/LocalAppointments';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';


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

  addForm = this.formBuilder.group({
    PatientId: [this.data.patientId, Validators.required],
    AppointmentType: [this.data.appointmentType, Validators.required],
    AppointmentStatus: [this.data.appointmentStatus, Validators.required],
    start: [this.data.start, Validators.required],
    end: [this.data.end, Validators.required],
    IsServed: [this.data.isServed],
    ServedBy: [this.data.servedBy],
  });

  matcher = new MyErrorStateMatcher();

  constructor(
    private dialogRef: MatDialogRef<AddEditDialogComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: LocalAppointments) {
  }

  ngOnInit(): void {

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
    this.data.appointmentType = this.AppointmentType.value;
    this.data.appointmentStatus = this.AppointmentStatus.value;
    this.data.start = this.start.value;
    this.data.end = this.end.value;
    this.data.isServed = this.IsServed.value;
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

  get end() {
    return this.addForm.get('end');
  }

  get IsServed() {
    return this.addForm.get('IsServed');
  }

  get ServedBy() {
    return this.addForm.get('ServedBy');
  }


}
