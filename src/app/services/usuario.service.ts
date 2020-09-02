import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { tap, map, catchError } from 'rxjs/operators';

import { environment } from './../../environments/environment';
import { LoginForm } from './../interfaces/login-form.interface';
import { RegisterForm } from './../interfaces/register-form.interface';
import { Observable, of } from 'rxjs';

const base_url = environment.base_url;
declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  public auth2: any;

  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) {
    
    this.googleInit(); //ejecuta unica vez cada vez que carga
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


  validarToken(): Observable<boolean> {
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token );
      }),
      map( resp => true ), //para transformar resp a boolean
      catchError( error => of(false) ) // of: regresa un nuevo observer con el valor de false (no hace la autenticacion)
      );
  }


  crearUsuario( formData: RegisterForm ){
    
    return this.http.post(`${ base_url }/usuarios`, formData )
    .pipe(
      tap( (resp: any) => {
        localStorage.setItem('token', resp.token )
      })
    );
  }


  login( formData: LoginForm ){

    return this.http.post(`${ base_url }/login`, formData )
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token )
        })
      );
  }


  loginGoolge( token ){

    return this.http.post(`${ base_url }/login/google`, { token } )
      .pipe(
        tap( (resp: any) => {
          localStorage.setItem('token', resp.token )
        })
      );
  }

  logOut() {

    localStorage.removeItem('token');

    this.auth2.signOut().then( () => {
      this.ngZone.run( () => {

        this.router.navigateByUrl('/login');
      })
    });
  }



}
