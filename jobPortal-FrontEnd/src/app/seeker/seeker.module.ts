import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { SeekerRoutingModule } from './seeker-routing.module';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { MyProfileComponent } from './component/my-profile/my-profile.component';
import { EditProfileComponent } from './component/edit-profile/edit-profile.component';
import { InterviewsComponent } from './component/interviews/interviews.component';
import { SharedModule } from '../shared/shared.module';
import { ResumePhotoComponent } from './component/resume-photo/resume-photo.component';


@NgModule({
  declarations: [
    DashboardComponent,
    MyProfileComponent,
    EditProfileComponent,
    InterviewsComponent,
    ResumePhotoComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    SeekerRoutingModule,
    SharedModule
  ]
})
export class SeekerModule { }
