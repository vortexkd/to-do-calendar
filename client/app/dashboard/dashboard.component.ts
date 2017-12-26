import {Component, Input, OnInit, ViewEncapsulation} from '@angular/core';

import { LoginService } from '../login.service';
import {User} from '../user';
import {Appointment} from '../appointment';
import {Goal} from '../goal';
import {Task} from '../task';
import {DateHandler} from '../date-handler';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [
    '../../../node_modules/angular-calendar/css/angular-calendar.css',
    './dashboard.component.css'
  ],
  encapsulation: ViewEncapsulation.None
})
export class DashboardComponent implements OnInit {

  user: User;
  viewDate = new Date();

  addAppointment = false;
  dateForAppo: Date;

  reviewHour = 13;
  askReview = true;

  constructor(private loginService: LoginService) { }

  ngOnInit() {
    this.getUserDetails();
  }

  public getAppointments(): Appointment[] {
    if (this.user == null) {
      return [];
    }
    return this.user.appointments;
  }
  public getGoals(): Goal[] {
    if (this.user == null) {
      return [];
    }
    return this.user.goals;
  }
  public getTasks(): Task[] {
    if (this.user == null) {
      return [];
    }
    return this.user.tasks;
  }
  public getReviewAppointments() {
    if (this.user == null) {
      return [];
    }
    return Appointment.getAppointmentsForReview(this.user.appointments);
  }
  public changeFocusDay(d: Date) {
    this.viewDate = d;
  }
  public refresh(alert: Appointment[]) {
    this.user.appointments = alert;
    this.addAppointment = false;
  }
  public displayAppointmentBox(event: Date) {
    this.dateForAppo = event;
    this.addAppointment = true;
  }
  private checkReview() {
    const today = new Date();
    // && today.getHours() > this.reviewHour
    if ((DateHandler.getDateString(today) !== DateHandler.getDateString(this.user.reviewDate)))  {
      console.log(this.user.reviewDate);
      console.log(today);
      this.askReview = true;
    }
  }
  private getUserDetails() {
    this.loginService.getUserData().subscribe(
      response => {
        this.user = response;
        this.checkReview();
      }
    );
  }
}
