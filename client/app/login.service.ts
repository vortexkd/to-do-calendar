import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

import {User} from './user';
import {MyResponse} from './my-response';
import {Goal} from './goal';
import {JsonExtractor} from './json-extractor';

const STATUS_OK = 'OK';

@Injectable()
export class LoginService {
  dataUrl = 'http://localhost:9000/dashboard/1'; // TODO: user id is fixed here. Any practical app will need better than this.

  constructor(private http: HttpClient) {
  }

  public getUserData(): Observable<any> {
    return this.http.get<MyResponse>(this.dataUrl).map(
      (response: MyResponse) => this.handleResponse(response)
    );
  }

  private castResponseToUser(userInfo: Array<Object>): User {
    const user = new User;
    user.id = userInfo['id'];
    user.name = userInfo['name'];
    user.reviewDate = new Date(userInfo['review_date']);
    user.goals = [];
    let i = 0;
    while (userInfo['goals'][i]) {
      user.goals.push(JsonExtractor.extractGoal(userInfo['goals'][i]));
      i++;
    }
    i = 0;
    user.tasks = [];
    while (userInfo['tasks'][i]) {
      user.tasks.push(JsonExtractor.extractTask(userInfo['tasks'][i]));
      i++;
    }
    i = 0;
    user.appointments = [];
    while (userInfo['appointments'][i]) {
      user.appointments.push(JsonExtractor.extractAppointment(userInfo['appointments'][i]));
      i++;
    }
    return user;
  }

  private handleResponse(response: MyResponse): User {
    if (response.status !== STATUS_OK) {
      return new User;
    }
    // console.log(response);
    return this.castResponseToUser(response.ret);
  }

}
