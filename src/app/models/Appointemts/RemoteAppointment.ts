export class RemoteAppointment {
  patientId: number;
  appointmentTypeId: string;
  appointmentStatusId: string;
  startDateTime: Date;
  endDateTime: Date;
  isServed: boolean;
  servedBy: number;
  id: number;


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
