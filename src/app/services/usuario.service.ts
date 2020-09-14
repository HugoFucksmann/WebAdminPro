import { Injectable, NgZone } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { Usuario } from './../models/usuario.models';

import { CargarUsuario } from './../interfaces/cargar-usuarios.interface';
import { LoginForm } from './../interfaces/login-form.interface';
import { RegisterForm } from './../interfaces/register-form.interface';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;
  public usuario: Usuario;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
 
    this.googleInit(); //ejecuta unica vez cada vez que carga
  }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get uid():string{
    return this.usuario.uid || "";
  }

  get role(): 'ADMIN_ROLE' | 'USER_ROLE'{
    return this.usuario.role;
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  
  googleInit(){

    return new Promise( resolve => {
      gapi.load('auth2', () => {
        this.auth2 = gapi.auth2.init({
          client_id: '1088794549338-ffn8ok60r5ripbhc39r8jo05k68fe2cj.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin',
        });
        resolve();
      })
    });
  }

  guardarLocalStorage( token: string, menu: any ){

    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu) );
    
    
  }


  validarToken(): Observable<boolean> {
    
    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp: any) => {

        //this.usuario = resp.usuario; //no sirve para acceder a metodos del modelo Usuario
        const { email, google, nombre, role, img='', uid } = resp.usuario;
        this.usuario = new Usuario( google, nombre, email, img, role, uid );
        
        this.guardarLocalStorage( resp.token, resp.menu );

        return true;
      }),
      //map( resp => true ), //para transformar resp a boolean
      catchError( error => of(false) ) // of: regresa un nuevo observer con el valor de false (no hace la autenticacion)
      );
  }


  crearUsuario( formData: RegisterForm ){
    
    return this.http.post(`${ base_url }/usuarios`, formData )
    .pipe(
      tap((resp: any) => this.guardarLocalStorage(resp.token, resp.menu) )
    );
  }

  actualizarPerfil( data: { email:string, nombre:string, role:string } ) {

    data = {
      ...data,
      role: this.usuario.role
    }

    return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers );
  }


  login( formData: LoginForm ){

    return this.http.post(`${ base_url }/login`, formData )
      .pipe(
        tap((resp: any) => this.guardarLocalStorage(resp.token, resp.menu) )
      );
  }


  loginGoolge( token ){
    
    return this.http.post(`${ base_url }/login/google`, { token } )
      .pipe(
        tap((resp: any) => this.guardarLocalStorage(resp.token, resp.menu) )
      );
  }

  logOut() {

    localStorage.removeItem('token');
    localStorage.removeItem('menu');

    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {

        this.router.navigateByUrl('/login');
      })
    });
  }

  cargarUsuarios( desde: number = 0 ){

    const url = `${ base_url }/usuarios?desde=${ desde }`;
    return this.http.get<CargarUsuario>( url, this.headers )
      .pipe(
        //delay(300),
        map( resp => {          
          const usuarios = resp.usuarios.map(
            user => new Usuario( user.google, user.nombre, user.email, user.img, user.role, user.uid )
          );
          return {
            total: resp.total,
            usuarios
          };
          
        } )
      )

  }

  
  eliminarUsuario( usuario: Usuario ){
    
    
    const url = `${ base_url }/usuarios/${ usuario.uid }`;    
    return this.http.delete( url, this.headers );
  }

  guardarUsuario( usuario: Usuario ) {

    return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers );
  }

  

}
