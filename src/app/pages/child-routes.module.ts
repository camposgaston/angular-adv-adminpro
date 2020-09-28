import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminGuard } from '../guards/admin.guard';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorEditComponent } from './maintenance/doctors/doctor-edit.component';
import { SearchComponent } from './search/search.component';


const childRoutes: Routes = [

  { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
  { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de cuenta' } },
  { path: 'grafica1', component: Grafica1Component, data: { title: 'Grafica #1' } },
  { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de usuario' } },
  { path: 'progress', component: ProgressComponent, data: { title: 'Barra de progreso' } },
  { path: 'promesas', component: PromisesComponent, data: { title: 'Promesas' } },
  { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },
  { path: 'search/:term', component: SearchComponent, data: { title: 'Busquedas' } },

  // ADMIN maintenance routes

  { path: 'users', canActivate: [AdminGuard], component: UsersComponent, data: { title: 'Mantenimiento de Usuarios' } },

  // maintenance routes
  { path: 'doctors', component: DoctorsComponent, data: { title: 'Mantenimiento de Doctores' } },
  { path: 'doctor/:did', component: DoctorEditComponent, data: { title: 'Crear o Editar Doctores' } },
  { path: 'hospitals', component: HospitalsComponent, data: { title: 'Mantenimiento de Hospitales' } },

]

@NgModule({
  imports: [RouterModule.forChild(childRoutes)],
  exports: [RouterModule]
})
export class ChildRoutesModule { }
