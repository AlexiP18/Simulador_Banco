import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthComponent } from './auth.component';
import { ServiciosRoutingModule } from '../pages/servicios/servicios-routing.module';
import { CoreModule } from '../core/core.module';

import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AuthComponent
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ServiciosRoutingModule,
    CoreModule,

    FormsModule
  ]
})
export class AuthModule { }
