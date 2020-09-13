import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioService } from './../../services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'
  ]
})
export class RegisterComponent {

  public formularioEnviado = false; //para saber cuando se envia el formulario

  public formularioRegistro = this.fb.group({
    nombre: [ 'colo', [ Validators.required, Validators.minLength(3) ] ],
    email: [ 'colof@gmail.com', [ Validators.required, Validators.email ] ],
    password: [ '123456', [ Validators.required, Validators.minLength(3) ] ],
    password2: [ '123456', [ Validators.required, Validators.minLength(3) ] ],
    terminos: [ true, Validators.required ],
  },{
    validators: this.passwordIguales('password', 'password2')
  });

  constructor(private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private router: Router) { }

  crearUsuario() {

    this.formularioEnviado = true;
    

    if( this.formularioRegistro.invalid ){
      return;
      
    }
    
    
    //Realizarr el posteo
    this.usuarioService.crearUsuario( this.formularioRegistro.value )
      .subscribe( resp => {
        
        console.log('usuario creado');
        console.log(resp);
        // Navegar al dashboard
        this.router.navigateByUrl('/');

      }, (err) => {
        console.log(err);
        Swal.fire('Error', err.error.msg, 'error');
      });

    
    
      
  }
    


  campoNoValido( campo: string ): boolean {

    if( this.formularioRegistro.get(campo).invalid && this.formularioEnviado ){
      return true;
    }else{
      return false;
    }
  }

  contrasenasNoValidas(){
    const pass1 = this.formularioRegistro.get('password').value;
    const pass2 = this.formularioRegistro.get('password2').value;

    if( pass1 !== pass2 && this.formularioEnviado ){
      return true;
    }else{
      return false;
    }
  }

  aceptaTerminos(){
    return !this.formularioRegistro.get('terminos').value && this.formularioEnviado;
  }

  passwordIguales( pass1Name: string, pass2Name: string ){

    return ( formGroup: FormGroup ) => {

      const pass1Control = formGroup.get(pass1Name);
      const pass2Control = formGroup.get(pass2Name);
      

      if( pass1Control.value === pass2Control.value ){
        pass2Control.setErrors(null);
      }else{
        pass2Control.setErrors({ noEsIgual: true });
      }
    }
  }

}
