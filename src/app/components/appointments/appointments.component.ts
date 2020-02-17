import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {CalendarEvent, CalendarEventTimesChangedEvent, CalendarView} from 'angular-calendar';
import {Subject} from 'rxjs';
import {isSameDay, isSameMonth} from 'date-fns';
import {AddEditDialogComponent} from '../addEditDialog/addEditDialog.component';
import {LocalAppointments} from '../../models/Appointemts/LocalAppointments';
import {MatDialog} from '@angular/material/dialog';
import {AppointmentsServices} from '../../services/Appointments/appointments-services';
import {LocalAppointmentsBuilder} from '../../models/Appointemts/LocalAppointmentsBuilder';
import {DoctorsService} from '../../services/Doctors/doctors.service';
import {MatTableDataSource} from '@angular/material/table';


@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.css']
})
export class AppointmentsComponent implements OnInit {

  @ViewChild('modalContent', {static: true}) modalContent: TemplateRef<any>;

  displayedColumns: string[] = ['name'];
  dataSource;

  view: CalendarView = CalendarView.Week;

  CalendarView = CalendarView;

  viewDate: Date = new Date();

  refresh: Subject<any> = new Subject();

  events: CalendarEvent[] = [];

  activeDayIsOpen = true;

  constructor(private dialog: MatDialog,
              private calenderEventService: AppointmentsServices,
              private doctorsService: DoctorsService) {
  }

  ngOnInit(): void {
    this.calenderEventService.getAllAppointments().subscribe(
      result => {
        this.events = result;
      },
      error => {
        console.error('On appointment getAllEvents ngOnInit');
      }
    );

    this.doctorsService.getAllDoctors().subscribe(
      result => {
        this.dataSource = new MatTableDataSource(result);
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

    this.events = this.events.map(iEvent => {
      if (iEvent === event) {
        return {
          ...event,
          start: newStart,
          end: newEnd
        };
      }
      return iEvent;
    });
    // this.handleEvent('Dropped or resized', event);
  }

  // called when items are clicked
  handleEvent(action: string, event: CalendarEvent): void {
    const dialogRef = this.openDialogWith(event);

    // re-use code
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed handle event');
      console.table(result);
      if (result.action === 'D') {
        this.deleteEvent(result);
      } else if (result.action === 'U') {

        this.events = this.events.map(iEvent => {
          if (iEvent === event) {
            return {
              ...event,
              title: result.title,
              start: result.start,
              end: result.end
            };
          }
          return iEvent;
        });
      }

    });

  }

  deleteEvent(eventToDelete: CalendarEvent) {
    this.events = this.events.filter(event => event !== eventToDelete);
  }

  openDialogWith(appointment: CalendarEvent) {
    return this.dialog.open(AddEditDialogComponent, {
      width: '400px',
      data: appointment
    });
  }

  addEvent(newEvent): void {

    this.calenderEventService.addNewAppointment(newEvent).subscribe(
      result => {
        this.events = [
          ...this.events,
          newEvent
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

  openAddDialog() {
    const emptyAppointment = new LocalAppointments();
    emptyAppointment.start = new Date();
    const dialogRef = this.openDialogWith(emptyAppointment);

    dialogRef.afterClosed().subscribe((result: LocalAppointments) => {
      console.log('The dialog was closed add dialog');
      if (result.patientId) {
        const newEvent = new LocalAppointmentsBuilder(result.patientId, result.appointmentType,
          result.appointmentStatus, result.start, result.end, result.isServed, result.servedBy).build();
        this.addEvent(newEvent);
      }
    });
  }


  applyFilter($event: KeyboardEvent) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
}
