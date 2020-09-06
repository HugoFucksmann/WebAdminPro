import { delay } from 'rxjs/operators';
import { ModalImageService } from './../../../services/modal-image.service';
import  Swal  from 'sweetalert2';
import { BusquedasService } from './../../../services/busquedas.service';
import { Usuario } from './../../../models/usuario.models';
import { UsuarioService } from './../../../services/usuario.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: [
  ]
})
export class UsuariosComponent implements OnInit, OnDestroy {

  public totalUsuarios: number = 0;
  public usuarios: Usuario[] = [];
  public usuariosTemp: Usuario[] = [];

  public desde: number = 0;
  public cargando: boolean;
  public imgSubs: Subscription;

  constructor(private usuariosService: UsuarioService,
              private busquedaService: BusquedasService,
              private modalService: ModalImageService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe(); //sin fuga de memoria (para que no vuelva a cargar)
  }

  ngOnInit(): void {

    this.cargrarUsuarios();

    this.imgSubs = this.modalService.nuevaImagen
      .pipe( delay(200) )
      .subscribe( img => {
       console.log(img);
      
        this.cargrarUsuarios()
      });
  }

  cargrarUsuarios(){
    this.cargando = true;
    this.usuariosService.cargarUsuarios(this.desde)
    .subscribe( ({ total, usuarios }) => {
      this.totalUsuarios = total;
      this.usuarios = usuarios;
      this.usuariosTemp = usuarios;
      this.cargando = false;
    })
  }


  cambiarPagina( valor: number ){
    this.desde += valor;

    if( this.desde < 0 ){
      this.desde = 0;
    }else if ( this.desde >= this.totalUsuarios ){
      this.desde -= valor;
    }

    this.cargrarUsuarios();
  }


  buscar( termino: string){

    if ( termino.length === 0 ){
      return this.usuarios = this.usuariosTemp; //retorna punto original antes de buscar
    }

    this.busquedaService.buscar( 'usuarios', termino )
      .subscribe( resultados => {
        
        this.usuarios = resultados;
      }
      )
    
  }


  eliminarUsuario( usuario: Usuario ){

    if( usuario.uid === this.usuariosService.uid ){
      return Swal.fire('Error', 'No se puede borrarse a si mismo', 'error');
    }
    
    Swal.fire({
      title: 'Borrar usuario?',
      text: `Estas a punto de borrar a ${ usuario.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borralo'
    }).then((result) => {
      if (result.value) {
        
        this.usuariosService.eliminarUsuario( usuario )
          .subscribe( resp => {
            
            this.cargrarUsuarios();
            Swal.fire(
              'Usuario borrado',
              `${ usuario.nombre } fue eliminado correctamente`,
              'success'
            )
          });
      }
    })
  }

  cambiarRole( usuario: Usuario){
    this.usuariosService.guardarUsuario( usuario )
      .subscribe( resp => console.log(resp)
      );
  }


  abrirModal(usuario: Usuario){
    this.modalService.abrirModal('usuarios',usuario.uid, usuario.img);
  }

  
}
