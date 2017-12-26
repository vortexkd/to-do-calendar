import {Task} from './task';
import {Appointment} from './appointment';
import {Goal} from './goal';

export class JsonExtractor {
  public static extractTask(taskData: Array<object>): Task {
    const task = new Task();
    task.id = +taskData['id'];
    task.title = taskData['title'];
    task.isComplete = (taskData['complete'] === 'true');
    task.dueDate = new Date(taskData['due_date']);
    task.estimatedManHours = +taskData['estimated_man_hours'];
    task.completedManHours = +taskData['completed_man_hours'];
    task.description = taskData['description'];
    task.goalId = +taskData['goal_id'];
    task.parentTask = +taskData['parent_task'];
    return task;
  }
  public static extractAppointment(appointmentData: Array<object>): Appointment {
    const appointment = new Appointment();
    appointment.id = +appointmentData['id'];
    appointment.title = appointmentData['title'];
    appointment.taskId = +appointmentData['associatedTask'];
    appointment.startTime = new Date(appointmentData['date'] + ' ' + appointmentData['start']);
    appointment.endTime = new Date(appointmentData['date'] + ' ' + appointmentData['end']);
    appointment.goalId = +appointmentData['associatedGoal'];
    appointment.note = appointmentData['note'];
    return appointment;
  }
  public static extractGoal(goalData: Array<object>): Goal {
    const goal = new Goal();
    goal.id = +goalData['id'];
    goal.title = goalData['title'];
    goal.description = goalData['desc'];
    goal.reviewDate = new Date(goalData['review_date']);
    goal.createdDate = new Date(goalData['created_date']);
    goal.isAchieved = (goalData['achieved'] === 'true' ? true : false);
    return goal;
  }
}
