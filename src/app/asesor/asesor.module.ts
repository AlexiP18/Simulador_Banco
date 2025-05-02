import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AsesorRoutingModule } from './asesor-routing.module';
import { AsesorComponent } from './asesor.component';


@NgModule({
  declarations: [
    AsesorComponent
  ],
  imports: [
    CommonModule,
    AsesorRoutingModule
  ]
})
export class AsesorModule { }
