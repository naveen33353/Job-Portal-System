import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from '../shared/shared.module';

import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { AdminJobseekersComponent } from './component/admin-jobseekers/admin-jobseekers.component';
import { AdminJobseekerComponent } from './component/admin-jobseeker/admin-jobseeker.component';
import { AdminCompaniesComponent } from './component/admin-companies/admin-companies.component';
import { AdminJobsComponent } from './component/admin-jobs/admin-jobs.component';
import { AdminApplicationsComponent } from './component/admin-applications/admin-applications.component';
import { AdminProfileComponent } from './component/admin-profile/admin-profile.component';

@NgModule({
  declarations: [
    AdminDashboardComponent,
    AdminJobseekersComponent,
    AdminJobseekerComponent,
    AdminCompaniesComponent,
    AdminJobsComponent,
    AdminApplicationsComponent,
    AdminProfileComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    AdminRoutingModule,
    SharedModule
  ]
})
export class AdminModule { }
