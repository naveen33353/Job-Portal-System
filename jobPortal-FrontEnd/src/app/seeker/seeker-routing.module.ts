import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../seeker/component/dashboard/dashboard.component';
import { MyProfileComponent } from './component/my-profile/my-profile.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { InterviewsComponent } from './component/interviews/interviews.component';
import { authGuard } from '../core/guard/auth.guard';
import { ResumePhotoComponent } from './component/resume-photo/resume-photo.component';

const routes: Routes = [
  {
    path : 'jobseeker-dashboard',
    component : DashboardComponent,
    canActivate: [authGuard]
  },
  {
    path : 'profile-jobseeker',
    component : MyProfileComponent,
    canActivate: [authGuard]
  },
  {
    path : 'profile-jobseeker/edit',
    component : EditProfileComponent,
    canActivate: [authGuard]
  },
  {
    path : 'interviews',
    component : InterviewsComponent,
    canActivate: [authGuard]
  },
  {
    path : 'resume-photo',
    component : ResumePhotoComponent,
    canActivate : [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SeekerRoutingModule { }
