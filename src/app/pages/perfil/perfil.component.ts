import  Swal  from 'sweetalert2';
import { FileUploadService } from './../../services/file-upload.service';
import { Usuario } from './../../models/usuario.models';
import { UsuarioService } from './../../services/usuario.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styles: [
  ]
})
export class PerfilComponent implements OnInit {

  public perfilForm: FormGroup;
  public usuario: Usuario;
  public imagenSubir: File;
  public imgTemp: any;

  constructor( private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private fileUploadService: FileUploadService ) {
  
    this.usuario = usuarioService.usuario;
  }

  ngOnInit(): void {

    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, Validators.required ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ],
    });
  }

  actualizarPerfil(){

    this.usuarioService.actualizarPerfil( this.perfilForm.value )
      .subscribe( () => {
       const { nombre, email } = this.perfilForm.value;
       this.usuario.nombre = nombre;
       this.usuario.email = email;

       Swal.fire('Gardado', 'Cambios fueron guardados', 'success');
      }, (err) => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }


  cambiarImagen( file: File ){

    this.imagenSubir = file;

    if ( !file ) { 
      return this.imgTemp = null; 
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = ( () => {
      this.imgTemp = reader.result;
      
    })
  }

  subirImagen(){
    this.fileUploadService
      .actualizarFoto( this.imagenSubir, 'usuarios', this.usuario.uid )
      .then( img => {
        this.usuario.img = img; 
        
        Swal.fire('Guardado', 'Imagen actualizada con exito', 'success');
      }).catch( err => {
        console.log(err);
        
        Swal.fire('Error', "error al cargar imagen", 'error');
      });
  }
} 
