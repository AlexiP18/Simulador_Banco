import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CoreModule } from './core/core.module';
import { CardModule } from 'primeng/card';
import { CarouselModule } from 'primeng/carousel';
import { ButtonModule } from 'primeng/button';
import { HomeComponent } from './pages/home/home.component';
import { ServiciosComponent } from './pages/servicios/servicios.component';
import { CreditosComponent } from './pages/creditos/creditos.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { DividerModule } from 'primeng/divider';
import { InversionesComponent } from './pages/inversiones/inversiones.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ServiciosComponent,
    CreditosComponent,
    InversionesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    CoreModule,
    CardModule,
    CarouselModule,
    ButtonModule,
    DropdownModule,
    FormsModule,
    InputTextModule,
    TableModule,
    DividerModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
