import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Appointment} from '../appointment';
import { CalendarEvent } from 'angular-calendar';
import {DateHandler} from '../date-handler';
import {Goal} from '../goal';

// import { colors } from '../demo-utils/colors';

@Component({
  selector: 'app-new-calendar',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './new-calendar.component.html',
  styleUrls: ['./new-calendar.component.css']
})
export class NewCalendarComponent implements OnInit {

  @Input() date: Date;
  @Input() appointments: Appointment[];
  @Output() hourClicked: EventEmitter<Date> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  private eventify(): CalendarEvent[] {
    const events: CalendarEvent[] = [];
    this.appointments.forEach(function(appo) {
      events.push(
        {
          title: appo.title + '<br />' + DateHandler.getTimeString(appo.startTime) + ' - ' + DateHandler.getTimeString(appo.endTime) +
          (appo.note !== '' ? '<br />' + appo.note : ''),
          start: appo.startTime,
          end: appo.endTime,
          color: {primary: Goal.getGoalPrimaryColour(appo.goalId), secondary: Goal.getGoalSeconadryColour(appo.goalId)},
          draggable: true
          // TODO:ここはなぜかうまくいきません。
          // actions: [{label: 'log', onClick: function(event: {event: CalendarEvent}) {
          //     console.log('iiiiii');
          //   }
          //   }]
        }
      );
    });
    return events;
  }
  public getEvents(): CalendarEvent[] {
    return this.eventify();
  }
  eventClicked(event: Date): void {
    this.hourClicked.emit(event['date']);
  }
}
