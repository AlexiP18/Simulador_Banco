import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RegistroAsesoresComponent } from './components/registro-asesores/registro-asesores.component';
import { InfoInstitucionalComponent } from './components/info-institucional/info-institucional.component';
import { CreditosComponent } from './components/creditos/creditos.component';


const routes: Routes = [
  { path: '', component: AdminComponent },
  { path : 'asesores', component: RegistroAsesoresComponent},
  { path : 'info-institucion', component: InfoInstitucionalComponent},
  { path : 'credito-admin', component: CreditosComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
