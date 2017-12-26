import {Component, Input, OnInit} from '@angular/core';
import {DateHandler} from '../date-handler';

@Component({
  selector: 'app-mini-day',
  templateUrl: './mini-day.component.html',
  styleUrls: ['./mini-day.component.css']
})
export class MiniDayComponent implements OnInit {

  @Input() date: Date;

  constructor() { }

  ngOnInit() {
  }
  public getDayName(): string {
    return DateHandler.getDayString(this.date);
  }
  public getMonthName(): string {
    return DateHandler.getMonthString(this.date);
  }

}
