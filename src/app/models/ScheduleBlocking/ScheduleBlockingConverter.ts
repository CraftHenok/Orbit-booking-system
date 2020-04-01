import {RemoteScheduleBlocking} from './RemoteScheduleBlocking';
import {LocalScheduleBlocking} from './LocalScheduleBlocking';

export class ScheduleBlockingConverter {

  static convertToLocal(remoteSch: RemoteScheduleBlocking) {
    return new LocalScheduleBlocking(remoteSch.id, new Date(remoteSch.startDate),
      new Date(remoteSch.endDate), remoteSch.userId, remoteSch.reason);
  }

  static convertToRemote(localSch: LocalScheduleBlocking) {
    return new RemoteScheduleBlocking(localSch.id, localSch.start, localSch.end, localSch.userId, localSch.reason);
  }

  static convertToLocalBatch(remoteSch: RemoteScheduleBlocking[]) {
    const result = [];
    for (const r of remoteSch) {
      result.push(this.convertToLocal(r));
    }
    return result;
  }

  static convertToRemoteBatch(localSch: LocalScheduleBlocking[]) {
    const result = [];
    for (const r of localSch) {
      result.push(this.convertToRemote(r));
    }
    return result;
  }

}
