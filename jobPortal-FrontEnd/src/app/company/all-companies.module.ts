import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AllCompaniesComponent } from './component/all-companies/all-companies.component';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [
  { path: '', component: AllCompaniesComponent, pathMatch: 'full' }
];

@NgModule({
  declarations: [AllCompaniesComponent],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule]
})
export class AllCompaniesModule { }