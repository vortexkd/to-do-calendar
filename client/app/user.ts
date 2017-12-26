import {Goal} from './goal';
import {Appointment} from './appointment';
import {Task} from './task';

export class User {
  public static SLEEP_HOURS = 8;
  id: number;
  name: string;
  reviewDate: Date;
  teamId = 0; // TODO: functionality to be added.
  goals: Goal[];
  tasks: Task[];
  appointments: Appointment[];
}
