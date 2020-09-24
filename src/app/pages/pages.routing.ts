import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromisesComponent } from './promises/promises.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { PerfilComponent } from './perfil/perfil.component';

import { AuthGuard } from '../guards/auth.guard';

import { UsersComponent } from './maintenance/users/users.component';
import { HospitalsComponent } from './maintenance/hospitals/hospitals.component';
import { DoctorsComponent } from './maintenance/doctors/doctors.component';
import { DoctorEditComponent } from './maintenance/doctors/doctor-edit.component';


const routes: Routes = [
    {
        path: 'dashboard',
        component: PagesComponent,
        canActivate: [AuthGuard],
        children: [
            { path: '', component: DashboardComponent, data: { title: 'Dashboard' } },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Ajustes de cuenta' } },
            { path: 'grafica1', component: Grafica1Component, data: { title: 'Grafica #1' } },
            { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil de usuario' } },
            { path: 'progress', component: ProgressComponent, data: { title: 'Barra de progreso' } },
            { path: 'promesas', component: PromisesComponent, data: { title: 'Promesas' } },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'Rxjs' } },

            // maintenance 

            { path: 'users', component: UsersComponent, data: { title: 'Mantenimiento de Usuarios' } },
            { path: 'hospitals', component: HospitalsComponent, data: { title: 'Mantenimiento de Hospitales' } },
            { path: 'doctors', component: DoctorsComponent, data: { title: 'Mantenimiento de Doctores' } },
            { path: 'doctor/:did', component: DoctorEditComponent, data: { title: 'Crear o Editar Doctores' } },
        ]
    }
];
@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PagesRoutingModule { }
