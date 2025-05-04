import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RegistroAsesoresComponent } from './components/registro-asesores/registro-asesores.component';
import { InfoInstitucionalComponent } from './components/info-institucional/info-institucional.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path : 'asesores', component: RegistroAsesoresComponent},
  { path : 'info-institucion', component: InfoInstitucionalComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
