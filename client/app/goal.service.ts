import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Goal} from './goal';
import {MyResponse} from './my-response';
import {DateHandler} from './date-handler';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import {User} from './user';

const STATUS_OK = 'OK';

@Injectable()
export class GoalService {

  updateUrl = 'http://localhost:9000/editGoal/';
  createUrl = 'http://localhost:9000/createGoal/';
  constructor(private http: HttpClient) { }

  public updateGoal(goal: Goal): Observable<boolean> {
    const params = {user_id: '1', goal_id: goal.id, title: goal.title, description: goal.description,
      review_date: DateHandler.getDateString(goal.reviewDate), achieved: goal.getAchieved()
    };
    return this.http.post<MyResponse>(this.updateUrl, params).map(
      response => {
        return this.handleResponse(response);
      }
    );
  }
  public deleteGoal(goal: Goal): Observable<boolean> {
    const params = {user_id: '1', goal_id: goal.id, del: 'del'};
    return this.http.post<MyResponse>(this.updateUrl, params).map(
      response => {
        return this.handleResponse(response);
      }
    );
  }
  public createGoal(goal: Goal): Observable<boolean> {
    const params = {user_id: '1', title: goal.title, description: goal.description,
      date: DateHandler.getDateString(goal.reviewDate)
    };
    console.log(params);
    return this.http.post<MyResponse>(this.createUrl, params).map(
      response => {
        return this.handleResponse(response);
      }
    );
  }
  private handleResponse(response: MyResponse): boolean {
    if (response.status !== STATUS_OK) {
      console.log(response.message);
      return false;
    }
    return true;
  }
}
