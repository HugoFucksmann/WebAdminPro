import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  menu: any[] = [
    {
      titulo: 'Dashboard',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main', url: '/'},
        { titulo: 'ProgresBar', url: 'progress'},
        { titulo: 'Graficas', url: 'grafica1'}
      ]
    }
  ]

  constructor() { }
}
