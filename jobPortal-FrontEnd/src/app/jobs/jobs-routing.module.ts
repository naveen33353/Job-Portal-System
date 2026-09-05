import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewJobComponent } from './component/view-job/view-job.component';
import { ApplyJobComponent } from './component/apply-job/apply-job.component';
import { SavedJobsComponent } from './component/saved-jobs/saved-jobs.component';
import { authGuard } from '../core/guard/auth.guard';
import { AllJobsComponent } from './component/all-jobs/all-jobs.component';

const routes: Routes = [
{
      path:'all-jobs',
      component:AllJobsComponent
    },
    {
    path: 'view-job/:id',
    component: ViewJobComponent
  },
  {
    path : 'saved-jobs',
    component : SavedJobsComponent
  },
  {
    path : 'apply-job/:id',
    component : ApplyJobComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class JobsRoutingModule { }
