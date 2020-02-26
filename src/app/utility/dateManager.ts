export class DateManager {
  static getDateFromAge(age: number) {
    const currentDate = new Date(Date.now());
    if (age > 0) {
      currentDate.setFullYear(currentDate.getFullYear() - age);
    }
    return currentDate;
  }

  static findDuration(startDate: Date, endDate: Date) {
    let duration = 30;
    try {
      duration = (endDate.valueOf() - startDate.valueOf());
      duration = Math.round((duration / 1000) / 60);
    } catch (e) {
      //
    }
    return duration;
  }
}
