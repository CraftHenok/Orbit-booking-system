export class DateManager {
  static getDateFromAge(age: number) {
    const currentDate = new Date(Date.now());
    if (age > 0) {
      currentDate.setFullYear(currentDate.getFullYear() - age);
    }
    return currentDate;
  }
}
