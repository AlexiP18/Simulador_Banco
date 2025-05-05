import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { RegistroAsesoresComponent } from './components/registro-asesores/registro-asesores.component';
import { InfoInstitucionalComponent } from './components/info-institucional/info-institucional.component';
import { FormsModule } from '@angular/forms';
import { CoreModule } from '../core/core.module';
import { CreditosComponent } from './components/creditos/creditos.component';


@NgModule({
  declarations: [
    AdminComponent,
    RegistroAsesoresComponent,
    InfoInstitucionalComponent,
    CreditosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    CoreModule
  ]
})
export class AdminModule { }
