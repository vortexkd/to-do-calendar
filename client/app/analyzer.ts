import {Appointment} from './appointment';
import {DateHandler} from './date-handler';
import {Task} from './task';
import {User} from './user';

export class Analyzer {
  /*
 * variables: task completion is carried out based on due date.
 * delayed tasks are completed before moving to the next task (assumes all tasks will be completed)
 * variation idea: get a priority order, and back calculate required time to finish said item.
 * */
  public static taskDelayPredictions(tasks: Task[], appointments: Appointment[]): Task[] {
    tasks.sort(function (task1: Task, task2: Task) {
      return DateHandler.dateComparator(task1.dueDate, task2.dueDate);
    });
    const simulTime = new Date();
    const appoList = appointments;
    const delayWarning: Task[] = [];
    tasks.forEach(function(task) {
      if (!task.isComplete) {
        let reqTime = task.estimatedManHours - Task.getCompletedHours(task, Task.getAppointmentsForTask(task.id, appoList));
        if (reqTime > 0) {
          reqTime = reqTime / Analyzer.getEfficiencyForPeriod(appointments);
          simulTime.setTime(simulTime.getTime() + (reqTime * DateHandler.ONE_HOUR)); // TODO: adjust for efficiency.
          if (simulTime > task.dueDate) {
            delayWarning.push(task);
          }
        }
      }
    });
    return delayWarning;
  }
  /*
  * currently defaulting this to the previous week, with plans of being able to analyse any time period.
  */
  public static getTimeWorkedInLastWeek(appointments: Appointment[]): number {
    if (appointments == null || appointments === []) {
      return 1;
    }
    const today = new Date();
    const weekAgo = DateHandler.addDaysToDate(new Date(), -7);
    // TODO: generalise for any time span. Currently: sleep adjusted temporary constant for time interval

    let productiveTime = 0;
    appointments.forEach(function (appo) {
      if (appo.goalId != null && appo.goalId !== 0) {
        if (appo.startTime > weekAgo && appo.startTime < today) {
          // consider having an efficiency rating for each appointment (about how much of what you wanted to do, did you do?)
          productiveTime += appo.getDuration(); // computing in hours.
        }
      }
    });
    return productiveTime;
  }
  public static getEfficiencyForPeriod(appointments: Appointment[]): number {
    const timeInterval = 7 * (24 - User.SLEEP_HOURS);
    const productiveTime = Analyzer.getTimeWorkedInLastWeek(appointments);
    return productiveTime / timeInterval;
  }
  public static getAvgDailyProdTime(appointments: Appointment[]): number {
    const timeInterval = 7;
    const productiveTime = Analyzer.getTimeWorkedInLastWeek(appointments);
    return productiveTime / timeInterval;
  }
  public static getAvgDailyZatsuTime(appointments: Appointment[]): number {
    if (appointments == null || appointments === []) {
      return 1;
    }
    const today = new Date();
    const weekAgo = DateHandler.addDaysToDate(new Date(), -7);
    // TODO: generalise for any time span. Currently: fixed for 1 week. (7 days)
    const timeInterval = 7;
    let zatsuTime = 0;
    appointments.forEach(function (appo) {
      if (appo.goalId === 0) {
        if (appo.startTime > weekAgo && appo.startTime < today) {
          zatsuTime += appo.getDuration();
        }
      }
    });
    return zatsuTime / timeInterval;
  }
}
