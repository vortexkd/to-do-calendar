import { Component, OnInit } from '@angular/core';
import { LoginService } from '../login.service';
import {User} from '../user';

import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Goal} from '../goal';
import {Task} from '../task';
import {TaskService} from '../task.service';
import {DateHandler} from '../date-handler';
import {GoalService} from '../goal.service';
import {Appointment} from '../appointment';

@Component({
  selector: 'app-task-manager',
  templateUrl: './task-manager.component.html',
  styleUrls: ['./task-manager.component.css']
})
export class TaskManagerComponent implements OnInit {

  user: User = new User();
  goal: Goal;
  reviewDateString: string;
  addingGoal = false;
  goalLimit = Goal.GOAL_LIMIT;

  addingTask = false;
  title = '';
  estimatedHours: number;
  dueDate: string;
  description: string;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private loginService: LoginService,
    private goalService: GoalService,
    private taskService: TaskService
  ) { }

  ngOnInit() {
    this.dueDate = DateHandler.getDateString(new Date());
    this.getUserDetails();
  }

  public addTask() {
    const newTask = new Task;
    newTask.title = this.title;
    newTask.description = this.description;
    newTask.dueDate = new Date(this.dueDate);
    newTask.estimatedManHours = this.estimatedHours;
    newTask.goalId = this.goal.id;
    this.taskService.addTask(newTask).subscribe(
      response => {
        if (response) {
          console.log(response);
          this.getUserDetails();
          this.clearTask();
        }
      }
    );
  }
  public log() {
    console.log(this.user);
  }
  public completedTasks(): Task[] {
    const tasks: Task[] = [];
    const goalId = this.goal.id;
    this.user.tasks.forEach(function(task) {
      if (task.goalId === goalId) {
        if (task.isComplete === true) {
          tasks.push(task);
        }
      }
    });
    return tasks;
  }
  public toDoTasks(): Task[] {
    const tasks: Task[] = [];
    const goalId = this.goal.id;
    this.user.tasks.forEach(function(task) {
      if (task.goalId === goalId) {
        if (task.isComplete === false) {
          tasks.push(task);
        }
      }
    });
    return tasks;
  }
  public appointmentsOfTask(taskId: number): Appointment[] {
    return Task.getAppointmentsForTask(taskId, this.user.appointments);
  }
  public getRequiredGoalHours(): number {
    let hours = 0;
    this.toDoTasks().forEach(function(task) {
      if (task.completedManHours <= task.estimatedManHours) {
        hours += +task.estimatedManHours;
        hours -= +task.completedManHours;
      }
    });
    return hours;
  }
  public getCompletedGoalHours(): number {
    let hours = 0;
    this.toDoTasks().forEach(function(task) {
      hours += +task.completedManHours;
    });
    this.completedTasks().forEach(function(task) {
      hours += +task.completedManHours;
    });
    return hours;
  }
  public getTimeBreakDown() {
    return Math.round(this.getCompletedGoalHours() / this.goal.getSleepAdjustedTimeSinceCreation() * 100);
  }
  public getAchievementEstimate() {
    const days = this.goal.daysSinceCreatedDate();
    const done = this.getCompletedGoalHours();
    const rate = done / days;
    const remaining = this.getRequiredGoalHours();
    const timeNeeded = remaining / rate; // (days required)
    return DateHandler.addDaysToDate(new Date, timeNeeded).toDateString();
  }
  public getUserDetails() {
    this.loginService.getUserData().subscribe(
      response => {
        this.user = response;
        this.goal = this.loadGoal();
        this.reviewDateString = DateHandler.getDateString(this.goal.reviewDate);
      }
    );
  }
  public addGoal() {
    this.goal = new Goal();
    this.user.goals.push(this.goal);
    this.addingGoal = true;
    this.reviewDateString = DateHandler.getDateString(new Date(Date.now() + (30 * 24 * 60 * 60 * 1000)));
  }
  public loadAppointments(event: Appointment[]) {
    this.user.appointments = event;
  }
  private loadGoal(): Goal {
    const id = +this.route.snapshot.paramMap.get('goalId');
    let g = new Goal();
    this.user.goals.forEach(function(goal) {
      if (goal.id === id) {
        g = goal;
      }
    });
    return g;
  }

  private clearTask() {
    this.title = '';
    this.addingTask = false;
    this.description = '';
    this.dueDate = DateHandler.getDateString(new Date());
    this.estimatedHours = 1;
  }
}
