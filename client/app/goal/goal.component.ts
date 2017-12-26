import {Component, Input, OnInit} from '@angular/core';

import {Goal} from '../goal';
import {Task} from '../task';
import {Appointment} from '../appointment';

@Component({
  selector: 'app-goal',
  templateUrl: './goal.component.html',
  styleUrls: ['./goal.component.css']
})
export class GoalComponent implements OnInit {

  // saveImagePath = '../../assets/save-button.jpg';
  @Input() tasks: Task[];
  @Input() goal: Goal;
  @Input() appointments: Appointment[];

  constructor() { }

  ngOnInit() {
  }
  public getAppointmentsForTask(id: number): Appointment[] {
    return Task.getAppointmentsForTask(id, this.appointments);
  }

  public viewTasks(goalId: number) {
    this.tasks.forEach(function (task) {
      // console.log(goalId);
      if (task.goalId === goalId) {
        console.log(task);
      }
    });
  }
}
