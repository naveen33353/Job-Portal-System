import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LandingRoutingModule } from './landing-routing.module';
import { LandingComponent } from './component/landing/landing.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LandingComponent,

  ],
  imports: [
    CommonModule,
    FormsModule,
    LandingRoutingModule,
    SharedModule
  ],
  exports: [
    LandingComponent
  ]
})
export class LandingModule { }