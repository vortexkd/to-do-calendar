import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from './dashboard/dashboard.component';
import {TaskManagerComponent} from './task-manager/task-manager.component';
import {ReportComponent} from './report/report.component';
// import {DemoComponent} from './demo/component';

const routes: Routes = [
  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'taskManager/:goalId', component: TaskManagerComponent},
  {path: 'report', component: ReportComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule { }
