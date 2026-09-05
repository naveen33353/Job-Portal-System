import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { JobsRoutingModule } from './jobs-routing.module';
import { ViewJobComponent } from './component/view-job/view-job.component';
import { ApplyJobComponent } from './component/apply-job/apply-job.component';
import { SavedJobsComponent } from './component/saved-jobs/saved-jobs.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { AllJobsComponent } from './component/all-jobs/all-jobs.component';

@NgModule({
  declarations: [
    ViewJobComponent,
    ApplyJobComponent,
    SavedJobsComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    JobsRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class JobsModule { }
