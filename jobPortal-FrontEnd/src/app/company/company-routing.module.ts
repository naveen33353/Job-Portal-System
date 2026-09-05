import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AllCompaniesComponent } from './component/all-companies/all-companies.component';
import { CompanyProfileComponent } from './component/company-profile/company-profile.component';
import { PostJobComponent } from './component/post-job/post-job.component';
import { ManageJobComponent } from './component/manage-job/manage-job.component';
import { ApplicantsComponent } from './component/applicants/applicants.component';
import { CompanyComponent } from './component/company/company.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { ApplicantComponent } from './component/applicant/applicant.component';
import { ApplicantsListComponent } from './component/applicants-list/applicants-list.component';
import { ReviewComponent } from './component/review/review.component';
import { InterviewsComponent } from './component/interviews/interviews.component';
import { authGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  {
    path : 'all-companies',
    component : AllCompaniesComponent
  },
  {
    path : 'company',
    component : CompanyComponent
  },
  {
    path : 'company/:id',
    component : CompanyComponent
  },
  {
    path : 'company-dashboard',
    component : DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path : 'profile-company',
    component : CompanyProfileComponent,
    canActivate: [authGuard]
  },
  {
    path : 'company-post-job',
    component : PostJobComponent,
    canActivate: [authGuard]
  },
  {
    path : 'company-manage-jobs',
    component : ManageJobComponent,
    canActivate: [authGuard]
  },
  {
    path : 'company-applicants',
    component : ApplicantsComponent,
    canActivate: [authGuard]
  },
  {
    path : 'company/edit/:id',
    component : EditProfileComponent,
    canActivate: [authGuard]
  },
  {
    path : 'company/applicants/:jobId',
    component : ApplicantsListComponent,
    canActivate: [authGuard]
  },
  {
    path : 'company/applicant/:appId',
    component : ApplicantComponent,
    canActivate: [authGuard]
  },
  {
    path : 'company/review/:appId',
    component : ReviewComponent,
    canActivate: [authGuard]
  },
  {
    path : 'company-interviews',
    component : InterviewsComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRoutingModule { }
