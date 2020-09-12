import { Usuario } from './../../models/usuario.models';
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

  //menuItems: any[];
  public usuario: Usuario;
  
  

  constructor(public sidebarService:SidebarService,
              private usuarioService: UsuarioService) { 

    ///this.menuItems = sidebarService.menu;

    this.usuario = usuarioService.usuario; 

    
    
  }

  logout(){
    this.usuarioService.logOut();
  }

}
