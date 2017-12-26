import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Task} from '../task';
import {DateHandler} from '../date-handler';

import { TaskService } from '../task.service';
import {Appointment} from '../appointment';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-task-item',
  templateUrl: './task-item.component.html',
  styleUrls: ['./task-item.component.css', '../task-manager/task-manager.component.css']
})
export class TaskItemComponent implements OnInit {

  @Input() task: Task;
  @Input() appointmentList: Appointment[];
  @Output() requireReload: EventEmitter<boolean> = new EventEmitter();
  @Output() changedAppointmentList: EventEmitter<Appointment[]> = new EventEmitter();
  focus = false;
  dateString = DateHandler.getDateString(new Date());
  showAppointments = false;
  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.dateString = DateHandler.getDateString(this.task.dueDate);
    this.task.completedManHours = Task.getCompletedHours(this.task, this.appointmentList);
  }

  public updateTask() {
    this.task.dueDate = new Date(this.dateString);
    this.taskService.updateTask(this.task).subscribe(
      response => {
        if (response) {
          this.focus = false;
        }
      }
    );
  }
  public deleteTask() {
    this.taskService.deleteTask(this.task).subscribe(
      response => {
        if (response) {
          this.requireReload.emit(true);
        }
      }
    );
  }
  public bubbleEvent(event: Appointment[]) {
    this.changedAppointmentList.emit(event);
  }
}
