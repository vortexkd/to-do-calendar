import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Appointment} from '../appointment';
import {DateHandler} from '../date-handler';
import {AppointmentService} from '../appointment.service';

@Component({
  selector: 'app-appointment-editor',
  templateUrl: './appointment-editor.component.html',
  styleUrls: ['../task-manager/task-manager.component.css', '../app.component.css', './appointment-editor.component.css']
})
export class AppointmentEditorComponent implements OnInit {

  @Input() appointment: Appointment;
  @Output() deleted: EventEmitter<Appointment[]> = new EventEmitter();
  formDate: string;
  formStartHours: number;
  formStartMin: number;
  formEndHours: number;
  formEndMin: number;
  expand = false;
  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
    this.formDate = DateHandler.getDateString(this.appointment.startTime);
    this.formStartHours = this.appointment.startTime.getHours();
    this.formEndHours = this.appointment.endTime.getHours();
    this.formStartMin = this.appointment.startTime.getMinutes();
    this.formEndMin = this.appointment.endTime.getMinutes();
  }

  public getAppoDate(date: Date): string {
    return DateHandler.getDateString(date);
  }

  public saveAppointment() {
    this.appointment.startTime = new Date(Date.parse(this.formDate + ' ' + this.formStartHours + ':' + this.formStartMin));
    this.appointment.endTime = new Date(Date.parse(this.formDate + ' ' + this.formEndHours + ':' + this.formEndMin));
    this.appointmentService.updateAppointment(this.appointment).subscribe(
      response => {
        console.log(response);
        this.expand = false;
      }
    );
  }
  public deleteAppointment() {
    this.appointmentService.deleteAppointment(this.appointment).subscribe(
      response => {
        console.log(response);
        this.expand = false;
        this.deleted.emit(response);
      }
    )
  }
}
