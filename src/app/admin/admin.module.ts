import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RegistroAsesoresComponent } from './components/registro-asesores/registro-asesores.component';
import { InfoInstitucionalComponent } from './components/info-institucional/info-institucional.component';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AdminComponent,
    RegistroAsesoresComponent,
    InfoInstitucionalComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule
  ]
})
export class AdminModule { }
