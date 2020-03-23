/**
 * Remote appointment
 * Model representing appointment coming from remote
 */
export class RemoteAppointment {
  id: number;
  patientId: number;
  appointmentTypeId: string;
  appointmentStatusId: string;
  startDateTime: Date;
  endDateTime: Date;
  isServed: boolean;
  servedBy: number;


  constructor(id: number, patientId: number, appointmentType: string, appointmentStatus: string, startDateTime: Date,
              endDateTime: Date, isServed: boolean, servedBy: number) {
    this.id = id;
    this.patientId = patientId;
    this.appointmentTypeId = appointmentType;
    this.appointmentStatusId = appointmentStatus;
    this.startDateTime = startDateTime;
    this.endDateTime = endDateTime;
    this.isServed = isServed;
    this.servedBy = servedBy;
  }
}
