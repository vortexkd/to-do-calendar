import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Appointment} from '../appointment';
import {DateHandler} from '../date-handler';

@Component({
  selector: 'app-week-view',
  templateUrl: './week-view.component.html',
  styleUrls: ['./week-view.component.css']
})
export class WeekViewComponent implements OnInit {

  @Input() appointments: Appointment[];
  @Input() focusDate: Date;
  @Output() open: EventEmitter<any> = new EventEmitter();

  week: Date[] = [];

  constructor() { }

  ngOnInit() {
    this.setVisibleDates();
  }

  private setVisibleDates(): void {
    const temp = new Date();
    for (let i = 0; i <= 6; i++) {
      temp.setTime(this.focusDate.getTime() + ((i - this.focusDate.getDay()) * DateHandler.ONE_DAY));
      this.week[i] = new Date(temp);
    }
  }
  public clicked(day: Date) {
    this.focusDate = day;
    this.setVisibleDates();
    this.open.emit(day);
  }
  public next() {
    const moved = new Date();
    moved.setTime(this.focusDate.getTime() + (7 * DateHandler.ONE_DAY));
    this.clicked(new Date(moved));
  }
  public previous() {
    const moved = new Date();
    moved.setTime(this.focusDate.getTime() - (7 * DateHandler.ONE_DAY));
    this.clicked(new Date(moved));
  }
  public isToday(day: Date){
    return DateHandler.getDateString(day) === DateHandler.getDateString(this.focusDate);
  }

}
