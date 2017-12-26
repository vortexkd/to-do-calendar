import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

import {Goal} from '../goal';
import {GoalService} from '../goal.service';
import {DateHandler} from '../date-handler';

@Component({
  selector: 'app-goal-editor',
  templateUrl: './goal-editor.component.html',
  styleUrls: ['./goal-editor.component.css',
    '../task-manager/task-manager.component.css'
  ]
})
export class GoalEditorComponent implements OnInit {

  @Input() goal: Goal;
  @Input() toDoTasksLength: number;
  @Input() addingGoal: boolean;
  @Output() updateRequest: EventEmitter<boolean> = new EventEmitter();
  reviewDateString: string;
  isChanged = false;
  confirm = false;

  constructor(private goalService: GoalService) { }

  ngOnInit() {
    this.reviewDateString = DateHandler.getDateString(this.goal.reviewDate);
  }
  public updateGoal() {
    if (!this.isChanged) {
      return;
    } else if (this.goal.id == null) {
      console.log('Goal data may not be complete, adding goal.');
      return;
    }
    this.goal.reviewDate = new Date(this.reviewDateString);
    this.goalService.updateGoal(this.goal).subscribe();
    this.isChanged = false;
  }
  public achieveCheck() {
    if (this.toDoTasksLength > 0) {
      this.confirm = true;
    } else {
      this.goalAchieved();
    }
  }
  public goalAchieved() {
    this.goal.isAchieved = true;
    this.isChanged = true;
    this.updateGoal();
  }
  public saveNewGoal() {
    this.goal.reviewDate = new Date(this.reviewDateString);
    this.goalService.createGoal(this.goal).subscribe(response => {
      if (response) {
        this.updateRequest.emit(true);
      }
    });
  }
  public deleteGoal() {
    this.goalService.deleteGoal(this.goal).subscribe(
      response => {
        if (response) {
          this.updateRequest.emit(true);
        }
      }
    );
  }

}
