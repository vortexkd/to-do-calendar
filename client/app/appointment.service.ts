import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {MyResponse} from './my-response';
import {Observable} from 'rxjs/Observable';
import {Appointment} from './appointment';
import {JsonExtractor} from './json-extractor';
import {DateHandler} from './date-handler';

const STATUS_OK = 'OK';

@Injectable()
export class AppointmentService {

  constructor(private http: HttpClient) { }

  dataUrl = 'http://localhost:9000/setAppointment/';
  updateUrl = 'http://localhost:9000/updateAppointment/';
  public setAppointment(appointment: Appointment): Observable<Appointment[]> {
    const  params = {user_id: '1', appointment_title: appointment.title, date: DateHandler.getDateString((appointment.startTime)),
      start_time: DateHandler.getTimeString(appointment.startTime), end_time: DateHandler.getTimeString(appointment.endTime),
      task_id: appointment.taskId, goal_id: appointment.goalId};
    return this.post(this.dataUrl, params);
  }

  public updateAppointment(appointment: Appointment): Observable<Appointment[]> {
    const params = {user: '1', id: appointment.id, title: appointment.title,
      date: DateHandler.getDateString((appointment.startTime)), start_time: DateHandler.getTimeString(appointment.startTime),
      end_time: DateHandler.getTimeString(appointment.endTime), note: appointment.note};
    return this.post(this.updateUrl, params);
  }
  public deleteAppointment(appointment: Appointment): Observable<Appointment[]> {
    const params = {user: '1', id: appointment.id, del: 'del'};
    return this.post(this.updateUrl, params);
  }
  private post(url: string, params: Object): any {
    return this.http.post<MyResponse>(url, params).map(
      (response: MyResponse) => {
        return this.handleResponse(response);
      }
    );
  }

  private handleResponse(response: MyResponse): Appointment[] {
    if (response.status !== STATUS_OK) {
      console.log(response.message);
      return [];
    }
    let i = 0;
    const appointments: Appointment[] = [];
    while (response.ret['appointments'][i]) {
      appointments.push(JsonExtractor.extractAppointment(response.ret['appointments'][i]));
      i++;
    }
    return appointments;
  }
}




