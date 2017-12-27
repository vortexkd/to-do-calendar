import {Appointment} from './appointment';
import {DateHandler} from './date-handler';

export class Task {
  id: number;
  isComplete: boolean;
  title: string;
  dueDate: Date;
  estimatedManHours: number;
  completedManHours: number;
  description: string;
  goalId: number;
  parentTask: number;
  appointments: Appointment[];

  public static getTasksById(taskIds: number[], tasks: Task[]): Task[] {
    const result: Task[] = [];
    let i = 0;
    while (taskIds[i] != null) {
      tasks.forEach(function (task) {
        if (task.id === taskIds[i]) {
          result.push(task);
        }
      });
      i++;
    }
    return result;
  }
  public static getCompletedHours(task: Task, appointmentList: Appointment[]): number {
    let completedHours = 0;
    if (appointmentList == null) {
      return 0;
    }
    appointmentList.forEach(function (appointment) {
      if (appointment.taskId === task.id && appointment.isOver()) {
        completedHours += appointment.getDuration();
      }
    });
    return completedHours;
  }
  public static getAppointmentsForTask(taskId: number, appointmentList: Appointment[]): Appointment[] {
    if (appointmentList === []) {
      return [];
    }
    const result: Appointment[] = [];
    appointmentList.forEach(function(appo) {
      if (taskId === appo.taskId) {
        result.push(appo);
      }
    });
    return result;
  }
  public static toDoTasks(taskList: Task[]): Task[] {
    const tasks: Task[] = [];
    taskList.forEach(function(task) {
      if (task.isComplete === false) {
        tasks.push(task);
      }
    });
    return tasks;
  }
  public getComplete(): number {
    return (this.isComplete ? 1 : 0);
  }
  public isOverdue(): boolean {
    if (this.isComplete) {
      return false;
    } else {
      return this.dueDate < new Date();
    }
  }
}
