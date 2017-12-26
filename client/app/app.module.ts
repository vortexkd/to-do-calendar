import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginService } from './login.service';
import { GoalComponent } from './goal/goal.component';
import { TaskSynopsisComponent } from './task-synopsis/task-synopsis.component';
import { ObjectiveInterfaceComponent } from './objective-interface/objective-interface.component';
import { CreateAppointmentDialogueComponent } from './create-appointment-dialogue/create-appointment-dialogue.component';
import { AppointmentService } from './appointment.service';
import { TaskManagerComponent } from './task-manager/task-manager.component';
import { TaskItemComponent } from './task-item/task-item.component';
import {TaskService} from './task.service';
import {GoalService} from './goal.service';

import {CalendarModule} from 'angular-calendar';
import { NewCalendarComponent } from './new-calendar/new-calendar.component';
import { WeekViewComponent } from './week-view/week-view.component';
import { MiniDayComponent } from './mini-day/mini-day.component';
import { GoalEditorComponent } from './goal-editor/goal-editor.component';
import { AppointmentEditorComponent } from './appointment-editor/appointment-editor.component';
import { ReviewBoxComponent } from './review-box/review-box.component';
import { ReviewBoxAppoComponent } from './review-box-appo/review-box-appo.component';

// import {DemoComponent} from './demo/component';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    CalendarModule.forRoot()
  ],
  declarations: [
    AppComponent,
    DashboardComponent,
    GoalComponent,
    TaskSynopsisComponent,
    ObjectiveInterfaceComponent,
    CreateAppointmentDialogueComponent,
    TaskManagerComponent,
    TaskItemComponent,
    NewCalendarComponent,
    WeekViewComponent,
    MiniDayComponent,
    GoalEditorComponent,
    AppointmentEditorComponent,
    ReviewBoxComponent,
    ReviewBoxAppoComponent
  ],
  providers: [
    LoginService,
    AppointmentService,
    TaskService,
    GoalService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
