import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Goal} from '../goal';
import {Appointment} from '../appointment';
import {Task} from '../task';
// import {CreateAppointmentDialogueComponent} from '../create-appointmentSetAlert-dialogue/create-appointmentSetAlert-dialogue.component';

// const colours = ['rgb(213, 0, 0)', 'rgb(230, 124, 115)', 'rgb(3, 155, 229)', 'rgb(190, 100, 120)', 'rgb(121, 134, 203)'];

@Component({
  selector: 'app-objective-interface',
  templateUrl: './objective-interface.component.html',
  styleUrls: ['./objective-interface.component.css']
})
export class ObjectiveInterfaceComponent implements OnInit {

  @Input() goals: Goal[];
  @Input() tasks: Task[];
  @Input() appointments: Appointment[];
  @Output() setAppointments: EventEmitter<Appointment[]> = new EventEmitter();
  selectedGoal: Goal;

  constructor() { }

  ngOnInit() {
  }

  public getColour(goalId: number): string {
    return Goal.getGoalSeconadryColour(goalId);
  }

  public workOnGoal(goalId: number) {
    this.selectedGoal = this.getGoalById(goalId);
    if (this.selectedGoal === null) {
      return;
    }
    // process other things?
  }

  public closeDialogue() {
    this.selectedGoal = null;
  }
  public getTasksForGoal(id: number): Task[] {
    return Goal.getTasksForGoal(id, this.tasks);
  }
  public getAppointmentsForGoal(id: number): Appointment[] {
    return Goal.getAppointmentsForGoal(id, this.appointments);
  }
  public bubbleAppointment(alert: Appointment[]) {
    this.setAppointments.emit(alert);
    this.closeDialogue();
  }
  private getGoalById(id: number): Goal {
    let result: Goal = null;
    this.goals.forEach(function(goal) {
      if (goal.id === id) {
        result = goal;
      }
    });
    return result;
  }
}
