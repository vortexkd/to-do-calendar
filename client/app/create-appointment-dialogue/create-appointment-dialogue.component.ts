import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Goal} from '../goal';
import {Task} from '../task';
import {Appointment} from '../appointment';

import {AppointmentService} from '../appointment.service';
import {DateHandler} from '../date-handler';

@Component({
  selector: 'app-create-appointment-dialogue',
  templateUrl: './create-appointment-dialogue.component.html',
  styleUrls: ['./create-appointment-dialogue.component.css', '../app.component.css']
})
export class CreateAppointmentDialogueComponent implements OnInit {

  @Output() close: EventEmitter<string> = new EventEmitter();
  @Output() appointmentSetAlert: EventEmitter<Appointment[]> = new EventEmitter();
  @Input() goal: Goal;
  @Input() tasks: Task[];
  @Input() startTime: Date;
  newAppointment = new Appointment();
  title = '';
  formDate: string;
  formStartHours: string;
  formStartMinutes: string;
  formEndHours: string;
  formEndMinutes: string;
  taskId = '0';

  constructor(private addAppointmentService: AppointmentService) { }

  ngOnInit() {
    if (this.goal == null) {
      this.goal = Goal.misc();
    }
    if (this.tasks == null) {
      this.tasks = [];
    }
    if (this.startTime == null) {
      this.setDefaultTime();
    } else {
      this.formDate = DateHandler.getDateString(this.startTime);
      this.formStartHours = DateHandler.getHours(this.startTime);
      this.formStartMinutes = DateHandler.getMinutes(this.startTime);
      this.formEndHours = DateHandler.getLater(this.startTime, true);
      this.formEndMinutes = DateHandler.getLater(this.startTime, false);
    }

  }

  public setAppointment() {
    this.newAppointment.title = this.title;
    console.log(this.formDate);
    this.newAppointment.startTime = new Date(Date.parse(this.formDate + ' ' + this.formStartHours + ':' + this.formStartMinutes));
    this.newAppointment.endTime = new Date(Date.parse(this.formDate + ' ' + this.formEndHours + ':' + this.formEndMinutes));
    this.newAppointment.taskId = +this.taskId;
    this.newAppointment.goalId = this.goal.id;
    if (this.validAppointment()) {
      this.addAppointmentService.setAppointment(this.newAppointment).subscribe(
        response => {
          if (response !== []) {
            this.emitEvent(response);
          } else {
            console.log('couldnt set appointmentSetAlert');
          }
        }
      );
    } else {
      alert('Please check that your times make sense.');
    }
  }
  public toDoTasks(): Task[] {
    return Task.toDoTasks(Goal.getTasksForGoal(this.goal.id, this.tasks));
  }
  public closeFunction() {
    this.close.emit('closed');
  }
  public updateTask(id: string) {
    this.taskId = id;
    console.log(this.taskId);
  }
  private validAppointment(): boolean {
    if (this.newAppointment.startTime < this.newAppointment.endTime) {
      return true;
    }
    return false;
  }
  public updateFormDate(date: string) {
    this.formDate = date;
  }
  // date string handling
  public getDate(): string {
    return this.formDate;
  }
  private emitEvent(appos: Appointment[]) {
    this.appointmentSetAlert.emit(appos);
  }
  private setDefaultTime() {
    const date = new Date();
    this.formDate = DateHandler.getDateString(date);
    this.formStartHours = DateHandler.getHours(date);
    this.formStartMinutes = DateHandler.getMinutes(date)
    this.formEndHours = DateHandler.getLater(date, true);
    this.formEndMinutes = DateHandler.getLater(date, false);
  }
}
