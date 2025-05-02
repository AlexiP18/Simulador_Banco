import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HomeRoutingModule,
    CardModule,
    CarouselModule,
    ButtonModule
  ]
})
export class HomeModule { }
