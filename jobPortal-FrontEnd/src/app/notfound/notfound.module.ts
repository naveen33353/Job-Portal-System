import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { NotfoundRoutingModule } from './notfound-routing.module';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    NotFoundComponent
  ],
  imports: [
    CommonModule,
    NotfoundRoutingModule,
    SharedModule
  ]
})
export class NotfoundModule { }
