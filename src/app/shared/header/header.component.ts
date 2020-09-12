import { Router } from '@angular/router';
import { Usuario } from './../../models/usuario.models';
import { UsuarioService } from './../../services/usuario.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit{

  public usuario: Usuario;
  

  constructor(private usuarioService: UsuarioService,
              private router: Router) { 
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {   
  }


  logout(){
    this.usuarioService.logOut();
  }
  
  buscar(termino){
   
    if( termino.length === 0 ){
      return this.router.navigateByUrl('/dashboard');
    }
    
    this.router.navigateByUrl(`/dashboard/buscar/${ termino }`);

  }

}
