export class RemoteScheduleBlocking {
  id: number;
  startDate: Date;
  endDate: Date;
  userId: number;
  reason: string;

  constructor(id: number, startDate: Date, endDate: Date, userId: number, reason: string) {
    this.id = id;
    this.startDate = startDate;
    this.endDate = endDate;
    this.userId = userId;
    this.reason = reason;
  }
}
