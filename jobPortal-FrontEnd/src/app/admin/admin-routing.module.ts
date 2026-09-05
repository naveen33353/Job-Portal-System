import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { adminGuard } from '../core/guard/admin.guard';

import { AdminDashboardComponent } from './component/admin-dashboard/admin-dashboard.component';
import { AdminJobseekersComponent } from './component/admin-jobseekers/admin-jobseekers.component';
import { AdminJobseekerComponent } from './component/admin-jobseeker/admin-jobseeker.component';
import { AdminCompaniesComponent } from './component/admin-companies/admin-companies.component';
import { AdminJobsComponent } from './component/admin-jobs/admin-jobs.component';
import { AdminApplicationsComponent } from './component/admin-applications/admin-applications.component';
import { AdminProfileComponent } from './component/admin-profile/admin-profile.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    component: AdminDashboardComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'jobseekers',
    component: AdminJobseekersComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'jobseekers/:id',
    component: AdminJobseekerComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'companies',
    component: AdminCompaniesComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'jobs',
    component: AdminJobsComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'applications',
    component: AdminApplicationsComponent,
    canActivate: [adminGuard]
  },
  {
    path: 'profile',
    component: AdminProfileComponent,
    canActivate: [adminGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
