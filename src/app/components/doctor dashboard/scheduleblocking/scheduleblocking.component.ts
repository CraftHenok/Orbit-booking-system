import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {FormBuilder, Validators} from '@angular/forms';
import {ScheduleBlockingService} from '../../../services/ScheduleBlocking/schedule-blocking.service';
import {LocalScheduleBlocking} from '../../../models/ScheduleBlocking/LocalScheduleBlocking';
import {ScheduleBlockingConverter} from '../../../models/ScheduleBlocking/ScheduleBlockingConverter';

@Component({
  selector: 'app-scheduleblocking',
  templateUrl: './scheduleblocking.component.html',
  styleUrls: ['./scheduleblocking.component.css']
})
export class ScheduleblockingComponent implements OnInit {

  scheduleBlockingForm = this.fb.group({
    startDate: [this.data.start, Validators.required],
    endDate: [this.data.end, Validators.required],
    reason: [this.data.reason]
  });

  constructor(private dialogRef: MatDialogRef<ScheduleblockingComponent>,
              @Inject(MAT_DIALOG_DATA) public data: LocalScheduleBlocking,
              private scheduleBlockingService: ScheduleBlockingService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
  }

  getLocalScheduleBlocking() {
    return new LocalScheduleBlocking(
      this.data.id,
      this.scheduleBlockingForm.get('startDate').value,
      this.scheduleBlockingForm.get('endDate').value,
      this.data.userId,
      this.scheduleBlockingForm.get('reason').value
    );
  }

  submit() {

    this.scheduleBlockingService.save(this.getLocalScheduleBlocking()).subscribe(
      result => {
        const local = ScheduleBlockingConverter.convertToLocal(result);
        local.action = 'A';
        this.dialogRef.close(local);
      }, error => {
        console.error(error);
      });
  }

  deleteClicked() {

    this.scheduleBlockingService.delete(this.getLocalScheduleBlocking()).subscribe(
      result => {
        const local = this.getLocalScheduleBlocking();
        local.action = 'D';
        this.dialogRef.close(local);
      }, error => {
        console.error(error);
      }
    );
  }

  updateClicked() {
    this.scheduleBlockingService.update(this.getLocalScheduleBlocking()).subscribe(
      result => {
        if (result > 0) {
          const local = this.getLocalScheduleBlocking();
          local.action = 'U';
          this.dialogRef.close(local);
        }
      }, error => {
        console.log(error);
      }
    );
  }
}
