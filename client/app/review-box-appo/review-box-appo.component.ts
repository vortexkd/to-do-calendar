import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Appointment} from '../appointment';
import {AppointmentService} from '../appointment.service';

@Component({
  selector: 'app-review-box-appo',
  templateUrl: './review-box-appo.component.html',
  styleUrls: ['./review-box-appo.component.css']
})
export class ReviewBoxAppoComponent implements OnInit {

  @Input() appointment: Appointment;
  @Output() del: EventEmitter<boolean> = new EventEmitter();
  @Output() update: EventEmitter<Appointment[]> = new EventEmitter();
  note: string;
  changed = false;

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {
  }
  public deleteEvent() {
    this.del.emit(true);
  }

  public updateNote() {
    if (!this.changed) {
      return;
    }
    this.appointment.note = this.note;
    this.appointmentService.updateAppointment(this.appointment).subscribe(
      response => {
        console.log(response);
        this.update.emit(response);
      });
    this.changed = false;
  }
}
