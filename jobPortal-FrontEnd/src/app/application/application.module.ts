import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ApplicationRoutingModule } from './application-routing.module';
import { MyApplicationsComponent } from './component/my-applications/my-applications.component';
import { ViewApplicationComponent } from './component/view-application/view-application.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    MyApplicationsComponent,
    ViewApplicationComponent
  ],
  imports: [
    CommonModule,
    ApplicationRoutingModule,
    SharedModule
  ]
})
export class ApplicationModule { }
