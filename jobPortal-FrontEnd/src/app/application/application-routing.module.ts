import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MyApplicationsComponent } from './component/my-applications/my-applications.component';
import { ViewApplicationComponent } from './component/view-application/view-application.component';
import { authGuard } from '../core/guard/auth.guard';

const routes: Routes = [
  {
    path : 'jobseeker-applications',
    component : MyApplicationsComponent,
    canActivate: [authGuard]
  },
  {
    path : 'jobseeker-applications/:id',
    component : ViewApplicationComponent,
    canActivate: [authGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ApplicationRoutingModule { }
