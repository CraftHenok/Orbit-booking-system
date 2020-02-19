import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {Subject} from 'rxjs';
import {addHours, addMinutes, isSameDay, isSameMonth} from 'date-fns';
import {AddEditDialogComponent} from '../dialogs/addEditDialog/addEditDialog.component';
import {LocalAppointments} from '../../models/Appointemts/LocalAppointments';
import {MatDialog} from '@angular/material/dialog';
import {AppointmentsServices} from '../../services/Appointments/appointments-services';
import {LocalAppointmentsBuilder} from '../../models/Appointemts/LocalAppointmentsBuilder';
import {AppointmentWrapper} from '../../models/Appointemts/AppointmentWrapper';
import {AppointmentStatus} from '../../models/Appointemts/AppointmentStatus';
import {AppointmentType} from '../../models/Appointemts/AppointmentType';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen = true;

  constructor(private dialog: MatDialog,
              private calenderEventService: AppointmentsServices) {
  }

  ngOnInit(): void {
    this.calenderEventService.getAllAppointments().subscribe(
      result => {
        this.events = AppointmentWrapper.toLocalAppointmentBatch(result);
      },
      error => {
        console.error(error + 'On appointment getAllEvents ngOnInit');
      }
    );

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
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed handle event');
      console.table(result);
      if (result.action === 'D') {
        // delete happens here
        this.deleteEvent(result);
      } else if (result.action === 'U') {
        // update Happens here
        this.updateEvent(result);
      }

    });

  }

  deleteEvent(eventToDelete: LocalAppointments) {
    this.calenderEventService.deleteAppointment(eventToDelete).subscribe(
      result => {
        if (result !== 0) {
          this.events = this.events.filter(event => event !== eventToDelete);
        }
      },
      error => {
        console.log(error);
      }
    );

  }

  updateEvent(eventToUpdate: LocalAppointments) {
    this.calenderEventService.updateAppointment(eventToUpdate).subscribe(
      result => {
        if (result !== 0) {
          this.events = this.events.map(iEvent => {
            if (iEvent === eventToUpdate) {
              return {
                ...eventToUpdate
              };
            }
            return iEvent;
          });
        }
      },
      error => {
        console.log(error);
      }
    );
  }

  addEvent(newEvent: LocalAppointments): void {
    console.table(newEvent);
    this.calenderEventService.addNewAppointment(newEvent).subscribe(
      result => {
        this.events = [
          ...this.events,
          AppointmentWrapper.toLocalAppointment(result)
        ];
      },
      error => {
        console.log(error);
      }
    );


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

  openAddDialog() {
    const emptyAppointment = new LocalAppointments();
    emptyAppointment.start = new Date();
    const dialogRef = this.openDialogWith(emptyAppointment);

    dialogRef.afterClosed().subscribe((result: LocalAppointments) => {
      if (result.patientId) {
        const newEvent = new LocalAppointmentsBuilder(0, result.patientId, result.appointmentTypeId,
          result.appointmentStatusId, result.start, result.end, result.isServed, result.servedBy).build();
        this.addEvent(newEvent);
      }
    });
  }
}
