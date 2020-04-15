import {RemoteScheduleBlocking} from './RemoteScheduleBlocking';
import {LocalScheduleBlocking} from './LocalScheduleBlocking';

/**
 * ScheduleBlockingConverter
 * there are two representation of schedule blocking
 * remote for what comes from backend
 * local for custom local schedule blocking
 * this class handles conversion between local to remote and vise versa
 */
export class ScheduleBlockingConverter {

  /**
   * convert a single remote schedule blocking to a local one
   * @param remoteSch - remote schedule blocking to convert to local
   */
  static convertToLocal(remoteSch: RemoteScheduleBlocking) {
    return new LocalScheduleBlocking(remoteSch.id, new Date(remoteSch.startDate),
      new Date(remoteSch.endDate), remoteSch.userId, remoteSch.reason);
  }

  /**
   * convert a single local schedule blocking to remote one
   * @param localSch - local schedule blocking to convert to remote
   */
  static convertToRemote(localSch: LocalScheduleBlocking) {
    return new RemoteScheduleBlocking(localSch.id, localSch.start, localSch.end, localSch.userId, localSch.reason);
  }

  /**
   * convert list of remote to list of local schedule blocking model
   * @param remoteSch - list of remote schedule blocking to convert to local
   */
  static convertToLocalBatch(remoteSch: RemoteScheduleBlocking[]) {
    const result = [];
    for (const r of remoteSch) {
      result.push(this.convertToLocal(r));
    }
    return result;
  }

}
