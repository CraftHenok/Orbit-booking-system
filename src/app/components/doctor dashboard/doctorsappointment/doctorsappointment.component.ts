import {Component, OnInit} from '@angular/core';
import {CalendarView} from 'angular-calendar';
import {Subject} from 'rxjs';
import {AppointmentsServices} from '../../../services/Appointments/appointments-services';
import {AppointmentConverter} from '../../../models/Appointemts/AppointmentConverter';
import {MatDialog} from '@angular/material/dialog';
import {Variables} from '../../../utility/variables';
import {ScheduleBlockingService} from '../../../services/ScheduleBlocking/schedule-blocking.service';
import {ScheduleBlockingConverter} from '../../../models/ScheduleBlocking/ScheduleBlockingConverter';
import {LocalScheduleBlocking} from '../../../models/ScheduleBlocking/LocalScheduleBlocking';
import {ScheduleblockingComponent} from '../../dialogs/scheduleblocking/scheduleblocking.component';

@Component({
  selector: 'app-doctorsappointment',
  templateUrl: './doctorsappointment.component.html',
  styleUrls: ['./doctorsappointment.component.css']
})
export class DoctorsappointmentComponent implements OnInit {


  view = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  events = [];

  refresh: Subject<any> = new Subject();

  activeDayIsOpen = true;

  constructor(private appointmentService: AppointmentsServices,
              private scheduleBlockingService: ScheduleBlockingService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.appointmentService.getDoctorsAppointment().subscribe(
      result => {
        this.events = AppointmentConverter.toLocalAppointmentBatch(result, true);
      },
      error => {
        console.error(error);
      }
    );

    this.scheduleBlockingService.get().subscribe(
      result => {
        this.events = [...this.events, ...ScheduleBlockingConverter.convertToLocalBatch(result)];
      }, error => {
        console.error(error);
      }
    );
  }

  calenderClicked(date) {
    const event = new LocalScheduleBlocking(0, new Date(date), null, 0, '');
    this.openDialogWith(event);
  }

  openDialogWith(event: LocalScheduleBlocking) {
    if (event == null) {
      event = new LocalScheduleBlocking(0, new Date(), null, 0, '');
    }

    const dialogRef = this.dialog.open(ScheduleblockingComponent, {
      width: Variables.dialogSmallWidth,
      data: event
    });

    dialogRef.afterClosed().subscribe(result => {
      this.handleDialogResult(result);
    });

  }

  handleDialogResult(result: any) {
    if (result.action === Variables.actions.deleted) {
      this.deleteScheduleBlocking(result);
    } else if (result.action === Variables.actions.updated) {
      this.updateScheduleBlocking(result);
    } else if (result.action === Variables.actions.saved) {
      this.saveScheduleBlocking(result);
    }
  }

  saveScheduleBlocking(result) {
    console.log('The result is ' + result);
    this.events.push(result);
  }

  updateScheduleBlocking(result) {
    this.events = this.events.map(iEvent => {
      if (iEvent.id === result.id) {
        return {
          ...result
        };
      }
      return iEvent;
    });

  }

  deleteScheduleBlocking(result) {
    this.events = this.events.filter(it => it.id !== result.id);
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  handleEvent(event) {
    if (event.patientId || event.id === undefined) {
      return;
    }
    this.openDialogWith(event);
  }
}
