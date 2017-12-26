import {Component, Input, OnInit} from '@angular/core';
import {Task} from '../task';
import {Appointment} from '../appointment';

@Component({
  selector: 'app-task-synopsis',
  templateUrl: './task-synopsis.component.html',
  styleUrls: ['./task-synopsis.component.css', '../app.component.css']
})
export class TaskSynopsisComponent implements OnInit {

  @Input() task: Task;
  @Input() appointments: Appointment[];
  completedHours: number;

  constructor() { }

  ngOnInit() {
    this.completedHours = Task.getCompletedHours(this.task, this.appointments);
  }
  public taskCompletionPercent(): string {
    if (this.task == null) {
      console.log('here');
      return '0%';
    }
    if (this.task.estimatedManHours == null) {
      return '0%';
    } else if (this.task.estimatedManHours < this.completedHours) {
      return '90%';
    }
    return (this.completedHours * 100 / this.task.estimatedManHours) + '%';
  }
  public isOverdue(): boolean {
    console.log(this.task.isOverdue());
    return this.task.isOverdue();
  }

}
