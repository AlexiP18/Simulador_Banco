import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RegistroAsesoresComponent } from './components/registro-asesores/registro-asesores.component';


@NgModule({
  declarations: [
    AdminComponent,
    RegistroAsesoresComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule
  ]
})
export class AdminModule { }
