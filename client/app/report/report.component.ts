import { Component, OnInit } from '@angular/core';
import {LoginService} from '../login.service';
import {User} from '../user';
import {Analyzer} from '../analyzer';
import {Goal} from '../goal';
import {Appointment} from '../appointment';
import {Task} from '../task';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit {

  user: User;
  overdueTasks: Task[];
  weekAppointments: Appointment[];
  workedTasks: Task[];
  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.getUserDetails();
  }
  public getWeekEfficiency(): number {
    return Math.round(Analyzer.getEfficiencyForPeriod(this.weekAppointments) * 100);
  }
  public getZatsuTime(): number {
    return Math.round(Analyzer.getAvgDailyZatsuTime(this.weekAppointments));
  }
  public getProdTime(): number {
    return Math.round(Analyzer.getAvgDailyProdTime(this.weekAppointments));
  }
  public getUnrecordedTime(): number {
    const zatsu = Analyzer.getAvgDailyZatsuTime(this.user.appointments);
    const prod = Analyzer.getAvgDailyProdTime(this.user.appointments);
    return Math.round(24 - User.SLEEP_HOURS - zatsu - prod);
  }
  public goalProductivity(goal: Goal) {
    const appointments = Goal.getAppointmentsForGoal(goal.id, this.weekAppointments);
    return Math.round(Analyzer.getEfficiencyForPeriod(appointments) * 100);
  }
  public getSleepHours(): number {
    return User.SLEEP_HOURS;
  }
  public hasOverdueTask(goalId: number): boolean {
    let result = false;
    this.overdueTasks.forEach(function (task) {
      if (task.goalId === goalId) {
        result = true;
      }
    });
    return result;
  }
  private getTasksWorkedThisWeek(): Task[] {
    const taskIds: number[] = [];
    this.weekAppointments.forEach(function(appo) {
      if (taskIds.indexOf(appo.taskId) < 0) {
        taskIds.push(appo.taskId);
      }
    });
    const allTasks = this.user.tasks;
    return Task.getTasksById(taskIds, allTasks);
  }
  private getWeekAppointments() {
    this.weekAppointments = Appointment.getWeekAppointments(this.user.appointments);
  }
  private getOverDueTasks() {
    const overdue: Task[] = [];
    const appos = this.user.appointments;
    this.user.tasks.forEach(function(task) {
      if (Task.getCompletedHours(task, appos) > task.estimatedManHours) {
        overdue.push(task);
      }
    });
    return overdue;
  }
  private getUserDetails() {
    this.loginService.getUserData().subscribe(
      response => {
        this.user = response;
        this.overdueTasks = this.getOverDueTasks();
        this.getWeekAppointments();
        this.workedTasks = this.getTasksWorkedThisWeek();
      }
    );
  }
}
