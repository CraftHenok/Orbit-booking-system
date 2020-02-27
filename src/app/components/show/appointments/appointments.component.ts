import {Component, OnDestroy, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {Subject, Subscription} from 'rxjs';
import {isSameDay, isSameMonth} from 'date-fns';
import {AddEditDialogComponent} from '../../dialogs/addEditDialog/addEditDialog.component';
import {LocalAppointments} from '../../../models/Appointemts/LocalAppointments';
import {MatDialog} from '@angular/material/dialog';
import {AppointmentsServices} from '../../../services/Appointments/appointments-services';
import {LocalAppointmentsBuilder} from '../../../models/Appointemts/LocalAppointmentsBuilder';
import {AppointmentWrapper} from '../../../models/Appointemts/AppointmentWrapper';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit, OnDestroy {

  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen = true;
  doctorName: string;

  private currentSelectedDoctorSeq = 0;
  private subscription: Subscription = new Subscription();

  constructor(private dialog: MatDialog,
              private calenderEventService: AppointmentsServices) {
  }

  ngOnInit(): void {
    this.subscription.add(this.calenderEventService.getAllAppointments().subscribe(
      result => {
        this.events = AppointmentWrapper.toLocalAppointmentBatch(result);
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
    this.updateEvent(event as LocalAppointments);
  }

  // called when items are clicked
  handleEvent(action: string, event: CalendarEvent): void {
    const dialogRef = this.openDialogWith(event);

    // re-use code
    this.subscription.add(dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed handle event');
      console.table(result);
      if (result.action === 'D') {
        // delete happens here
        this.deleteEvent(result);
      } else if (result.action === 'U') {
        // update Happens here
        this.updateEvent(result);
      }

    }));

  }

  deleteEvent(eventToDelete: LocalAppointments) {
    this.subscription.add(this.calenderEventService.deleteAppointment(eventToDelete).subscribe(
      result => {
        if (result !== 0) {
          this.events = this.events.filter(event => event !== eventToDelete);
        }
      },
      error => {
        console.error(error);
      }
    ));

  }

  updateEvent(eventToUpdate: LocalAppointments) {
    this.subscription.add(this.calenderEventService.updateAppointment(eventToUpdate).subscribe(
      result => {
        if (result === 0) {
          return;
        }
        this.events = this.events.map(iEvent => {
          if (iEvent === eventToUpdate) {
            return {
              ...eventToUpdate
            };
          }
          return iEvent;
        });
      },
      error => {
        console.error(error);
      }
    ));
  }

  addEvent(newEvent: LocalAppointments): void {
    console.table(newEvent);
    this.subscription.add(this.calenderEventService.addNewAppointment(newEvent).subscribe(
      result => {
        this.events = [
          ...this.events,
          AppointmentWrapper.toLocalAppointment(result)
        ];
      },
      error => {
        console.log(error);
      }
    ));
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  closeOpenMonthViewDay() {
    this.activeDayIsOpen = false;
  }

  openDialogWith(appointment: CalendarEvent) {
    return this.dialog.open(AddEditDialogComponent, {
      width: '400px',
      data: appointment
    });
  }

  openAddDialog(date?: Date) {
    const emptyAppointment = new LocalAppointments();
    emptyAppointment.start = date ? date : (new Date());
    emptyAppointment.servedBy = this.currentSelectedDoctorSeq === 0 ? null : this.currentSelectedDoctorSeq;
    const dialogRef = this.openDialogWith(emptyAppointment);

    this.subscription.add(dialogRef.afterClosed().subscribe((result: LocalAppointments) => {
      if (result.patientId) {
        const newEvent = new LocalAppointmentsBuilder(0, result.patientId, result.appointmentTypeId,
          result.appointmentStatusId, result.start, result.end, result.isServed, result.servedBy).build();
        this.addEvent(newEvent);
      }
    }));
  }

  updateWithDoctor(seq: number) {
    if (this.currentSelectedDoctorSeq === seq) {
      return;
    }
    this.currentSelectedDoctorSeq = seq;
    if (seq === 0) {
      this.subscription.add(this.calenderEventService.getAllAppointments().subscribe(
        result => {
          this.events = AppointmentWrapper.toLocalAppointmentBatch(result);
        }, error => {
          console.error(error);
        }
      ));
    } else if (seq > 0) {
      this.subscription.add(this.calenderEventService.getAppointmentByDoctor(seq).subscribe(
        result => {
          this.events = AppointmentWrapper.toLocalAppointmentBatch(result);
        }, error => {
          console.error(error);
        }
      ));
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
