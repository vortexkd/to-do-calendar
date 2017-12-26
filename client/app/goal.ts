import { Task } from './task';
import {Appointment} from './appointment';

export class Goal {
  public static GOAL_LIMIT = 4;
  public static PRIMARY_COLOURS = ['#AAAAAA', '#E67C73', '#026A9D', '#781B2F', '#394898'];
  public static SECONDARY_COLOURS = ['#CCCCCC', '#FFADA7', '#40ADE2', '#BE6478', '#A5AFE3'];
  id: number;
  title: string;
  description: string;
  isAchieved: boolean;
  reviewDate: Date;
  createdDate: Date;
  tasks: Task[];
  // satisfaction: number;
  public static getGoalPrimaryColour(id: number): string {
    return Goal.PRIMARY_COLOURS[id % 5];
  }
  public static getGoalSeconadryColour(id: number): string {
    return Goal.SECONDARY_COLOURS[id % 5];
  }
  public static misc(): Goal {
    const misc = new Goal();
    misc.id = 0;
    misc.title = 'ざつ';
    return misc;
  }
  public static getTasksForGoal(goalId: number, taskList: Task[]): Task[] {
    if (taskList == []) {
      return [];
    }
    const result: Task[] = [];
    taskList.forEach(function(task) {
      if (goalId === task.goalId) {
        result.push(task);
      }
    });
    return result;
  }
  public static getAppointmentsForGoal(goalId: number, appointmentList: Appointment[]): Appointment[] {
    if (appointmentList === []) {
      return [];
    }
    const result: Appointment[] = [];
    appointmentList.forEach(function(appo) {
      if (goalId === appo.goalId) {
        result.push(appo);
      }
    });
    return result;
  }
  public getAchieved(): number {
    return this.isAchieved ? 1 : 0;
  }
}
