import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingComponent } from './landing/component/landing/landing.component';

const routes: Routes = [
 {
    path :'',
    component : LandingComponent,
    pathMatch: 'full'
  },
  {
    path :'auth',
    loadChildren : () => import('../app/auth/auth.module').then(m => m.AuthModule)
  },
   {
    path: 'company',
    loadChildren: () =>
      import('./company/company.module').then(m => m.CompanyModule)
  },
  {
    path: 'seeker',
    loadChildren: () =>
      import('./seeker/seeker.module').then(m => m.SeekerModule)
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then(m => m.AdminModule)
  },
  {
    path: 'job',
    loadChildren: () =>
      import('./jobs/jobs.module').then(m => m.JobsModule)
  },
  {
    path : 'application',
    loadChildren : () => 
      import('./application/application.module').then(m => m.ApplicationModule)
  },
  {
    path: '**',
    loadChildren: () =>
      import('./notfound/notfound.module').then(m => m.NotfoundModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
