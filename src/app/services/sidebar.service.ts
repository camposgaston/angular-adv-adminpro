import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {
  public menu = [];

  constructor() { }

  getMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu'));
  }
  // menu: any[] = [
  //   {
  //     title: 'Dashboard',
  //     icon: 'mdi mdi-gauge',
  //     submenu: [
  //       { title: 'Inicio', url: '/' },
  //       { title: 'Barra de Progreso', url: 'progress' },
  //       { title: 'Graficos', url: 'grafica1' },
  //       { title: 'Promesas', url: 'promesas' },
  //       { title: 'Rxjs', url: 'rxjs' }
  //     ]
  //   },
  //   {
  //     title: 'Mantenimiento',
  //     icon: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { title: 'Usuarios', url: 'users' },
  //       { title: 'Hospitales', url: 'hospitals' },
  //       { title: 'Doctores', url: 'doctors' }
  //     ]
  //   }
  // ];


}
