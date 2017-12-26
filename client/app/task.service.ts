import { Injectable } from '@angular/core';
import {Task} from './task';
import {MyResponse} from './my-response';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import {DateHandler} from './date-handler';

const STATUS_OK = 'OK';

@Injectable()
export class TaskService {
  updateUrl = 'http://localhost:9000/updateTask/';
  addUrl = 'http://localhost:9000/createTask/';

  constructor(private http: HttpClient) { }

  public addTask(task: Task): Observable<boolean> {
    const params = {user: '1', goal_id: task.goalId, title: task.title, description: task.description,
      est_hours: task.estimatedManHours, due_date: DateHandler.getDateString(task.dueDate)};
    return this.http.post<MyResponse>(this.addUrl, params).map(
      response => {
        return this.handleResponse(response);
      }
    );
  }
  public updateTask(task: Task): Observable<boolean> {
    const params = {user: '1', task_id: task.id, goal_id: task.goalId, title: task.title,
      description: task.description, complete: task.getComplete(), est_hours: task.estimatedManHours, comp_hours: task.completedManHours,
      due_date: DateHandler.getDateString(task.dueDate)};
    return this.http.post<MyResponse>(this.updateUrl, params).map(
      response => {
        return this.handleResponse(response);
      }
    );
  }
  public deleteTask(task: Task): Observable<boolean> {
    const params = {user: '1', task_id: task.id, del: 'del'};
    return this.http.post<MyResponse>(this.updateUrl, params).map(
      response => {
        return this.handleResponse(response);
      }
    );
  }

  private handleResponse(response: MyResponse): boolean {
    if(response.status === STATUS_OK) {
      return true;
    } else {
      console.log(response.message);
      return false;
    }
  }
}
