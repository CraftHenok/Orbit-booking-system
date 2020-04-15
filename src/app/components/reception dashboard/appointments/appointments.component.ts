import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {Subject, Subscription} from 'rxjs';
import {isSameDay, isSameMonth} from 'date-fns';
import {AddEditDialogComponent} from '../../dialogs/addEditDialog/addEditDialog.component';
import {LocalAppointments} from '../../../models/Appointemts/LocalAppointments';
import {MatDialog} from '@angular/material/dialog';
import {AppointmentsServices} from '../../../services/Appointments/appointments-services';
import {AppointmentConverter} from '../../../models/Appointemts/AppointmentConverter';
import {Variables} from '../../../utility/variables';
import {ScheduleBlockingConverter} from '../../../models/ScheduleBlocking/ScheduleBlockingConverter';
import {ScheduleBlockingService} from '../../../services/ScheduleBlocking/schedule-blocking.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {SnackBarManager} from '../../../utility/snackBarManager';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css'],
})
export class AppointmentsComponent implements OnInit, OnDestroy {

  @ViewChild('shoeDate') showDate: ElementRef;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen = true;

  doctorName: string;
  isFabHidden = false;

  private snackBarMan: SnackBarManager;

  private currentSelectedDoctorSeq = 0;
  private subscription: Subscription = new Subscription();

  constructor(private dialog: MatDialog,
              private snackBar: MatSnackBar,
              private scheduleBlockingService: ScheduleBlockingService,
              private calenderEventService: AppointmentsServices) {
  }

  ngOnInit(): void {
    this.snackBarMan = new SnackBarManager(this.snackBar);

    this.subscription.add(this.calenderEventService.getAllAppointments().subscribe(
      result => {
        this.events = AppointmentConverter.toLocalAppointmentBatch(result);
      },
      error => {
        console.error(error + 'On appointment getAllEvents ngOnInit');
      }
    ));
  }

  dayClicked({date, events}: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      this.activeDayIsOpen = !((isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0);
      this.viewDate = date;
    }
  }

  // called when items are Dropped or resized (do update)
  eventTimesChanged({event, newStart, newEnd}: CalendarEventTimesChangedEvent): void {
    event.start = newStart;
    event.end = newEnd;

    // make remote update then update ui
    this.calenderEventService.updateAppointment(event as LocalAppointments).subscribe(
      result => {
        if (result > 0) {
          this.updateEvent(event as LocalAppointments);
        }
      },
      error => {
        this.snackBarMan.show(error.error, 'Ok');
      }
    );
  }

  // called when items are clicked
  handleEvent(action: string, event): void {
    if (!event.patientId) {
      return;
    }
    const dialogRef = this.openDialogWith(event);

    this.subscription.add(dialogRef.afterClosed().subscribe(result => {
      if (result !== 0) {
        this.handleDialogResult(result);
      }
    }));

  }

  handleDialogResult(result) {
    if (result.action === Variables.actions.deleted) {
      this.deleteEvent(result);
    } else if (result.action === Variables.actions.updated) {
      this.updateEvent(result);
    }
  }

  deleteEvent(eventToDelete: LocalAppointments) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  updateEvent(eventToUpdate: LocalAppointments) {
    this.events = this.events.map(iEvent => {
      if (iEvent === eventToUpdate) {
        return {
          ...eventToUpdate
        };
      }
      return iEvent;
    });
  }

  addEvent(newEvent: LocalAppointments): void {
    this.events = [
      ...this.events,
      newEvent
    ];
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  openDialogWith(appointment: CalendarEvent) {
    return this.dialog.open(AddEditDialogComponent, {
      width: Variables.dialogBigWidth,
      data: appointment
    });
  }

  openAddDialog(date?: Date) {
    const emptyAppointment = new LocalAppointments();
    emptyAppointment.start = date || (new Date());
    emptyAppointment.servedBy = this.currentSelectedDoctorSeq === 0 ? null : this.currentSelectedDoctorSeq;

    const dialogRef = this.openDialogWith(emptyAppointment);

    dialogRef.afterClosed().subscribe((result: LocalAppointments) => {
      if (result !== undefined && result.patientId) {
        this.addEvent(result);
      }
    });
  }

  showDoctorsScheduleBlocking(seq: number) {
    this.scheduleBlockingService.getByDoctorId(seq).subscribe(
      result => {
        console.log(result);
        this.events = [...this.events, ...ScheduleBlockingConverter.convertToLocalBatch(result)];
      }, error => {
        console.error(error);
      }
    );
  }

  updateWithDoctor(seq: number) {
    if (this.currentSelectedDoctorSeq === seq) {
      return;
    }
    this.currentSelectedDoctorSeq = seq;
    this.showDoctorsAppointment(seq);
    this.showDoctorsScheduleBlocking(seq);
  }

  private showDoctorsAppointment(seq: number) {
    this.subscription.add(this.calenderEventService.getAppointmentByDoctor(seq).subscribe(
      result => {
        this.events = AppointmentConverter.toLocalAppointmentBatch(result);
      }, error => {
        console.error(error);
      }
    ));
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  resizeShowDate() {
    this.showDate.nativeElement.style = 'height:0';
    this.isFabHidden = true;
  }
}
