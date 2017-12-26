import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Appointment} from '../appointment';
import {AppointmentService} from '../appointment.service';

@Component({
  selector: 'app-review-box',
  templateUrl: './review-box.component.html',
  styleUrls: ['../app.component.css', './review-box.component.css']
})
export class ReviewBoxComponent implements OnInit {

  @Input() appointments: Appointment[];
  @Output() modAppointments: EventEmitter<Appointment[]> = new EventEmitter();
  @Output() done: EventEmitter<boolean> = new EventEmitter();

  constructor(private appointmentService: AppointmentService) { }

  ngOnInit() {

  }
  public deleteAppo(appointment: Appointment) {
    this.appointmentService.deleteAppointment(appointment).subscribe(
      response => {
        console.log(response);
        this.modAppointments.emit(response);
      });
  }
  public updated(event: Appointment[]) {
    this.modAppointments.emit(event);
  }
  public close() {
    this.done.emit(true);
  }
}
