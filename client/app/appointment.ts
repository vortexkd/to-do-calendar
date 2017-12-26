import {DateHandler} from './date-handler';

export class Appointment {
  static reviewTime = '18:00';
  id: number;
  title: string;
  startTime: Date; // must be the same day or server will cry.
  endTime: Date; // must be the same day or server will cry.
  taskId: number;
  goalId: number; // must be updated in the login service too.
  note: string;

  public static getAppointmentsForReview(appointments: Appointment[]): Appointment[] {
    if (appointments == null || appointments === []) {
      return [];
    }
    const result: Appointment[] = [];
    appointments.forEach(function(appo) {
      if(appo.needsReview()) {
        result.push(appo);
      }
    });
    return result;
  }
  public needsReview() {
    const today = new Date(DateHandler.getDateString(new Date()) + ' ' + Appointment.reviewTime);
    const yesterday = new Date();
    yesterday.setTime(today.getTime() - DateHandler.ONE_DAY);
    if (this.startTime > yesterday) {
      return true;
    }
    return false;
  }
  public isOver(): boolean {
    const now = new Date();
    if (this.endTime < now) {
      return true;
    } else {
      return false;
    }
  }
  public getDuration(): number {
    return Math.round((this.endTime.getHours() - this.startTime.getHours()) +
      ((this.endTime.getMinutes() - this.startTime.getMinutes()) / 60));
  }
}
