import { UsuarioService } from './../../services/usuario.service';
import { SidebarService } from './../../services/sidebar.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  menuItems: any[];

  constructor(private SidebarService:SidebarService,
              private usuarioService: UsuarioService) { 

    this.menuItems = SidebarService.menu;
  }

  logout(){
    this.usuarioService.logOut();
  }

}
