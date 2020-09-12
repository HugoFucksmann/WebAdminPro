import { UsuarioService } from './../../services/usuario.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

declare const gapi:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css' ]
})
export class LoginComponent implements OnInit {

  public formularioEnviado = false;
  public auth2: any;

  public formularioLogin = this.fb.group({
    
    email: [ localStorage.getItem('email') || '', [ Validators.required, Validators.email ] ],
    password: [ '', [ Validators.required, Validators.minLength(3) ] ],
    recordar: [false]
  });

  constructor(private router:Router,
              private fb: FormBuilder,
              private usuarioService: UsuarioService,
              private ngZone: NgZone) 
  { }

  ngOnInit(): void {
    this.renderButton();
  }

  login(){
    
    
    this.usuarioService.login( this.formularioLogin.value )
    .subscribe( resp => {

      
      if( this.formularioLogin.get('recordar').value){
        localStorage.setItem('email', this.formularioLogin.get('email').value );
      }else{
        localStorage.removeItem('email');
      }

      // Navegar al dashboard
      this.router.navigateByUrl('/');
    
    }, (err) => {
      console.warn( err );
      Swal.fire('Error', err.error.msg, 'error');
    });
  }



  renderButton() {
    gapi.signin2.render('my-signin2', {
      'scope': 'profile email',
      'width': 240,
      'height': 50,
      'longtitle': true,
      'theme': 'dark',
    });

    this.startApp();
  }

  async startApp() {

    await this.usuarioService.googleInit();
    this.auth2 = this.usuarioService.auth2;
   
    this.attachSignin(document.getElementById('my-signin2'));
   
  };

  attachSignin(element) {
    
    this.auth2.attachClickHandler(element, {},
        (googleUser) => {
            const id_token = googleUser.getAuthResponse().id_token;
            //console.log(id_token);
            this.usuarioService.loginGoolge( id_token )
              .subscribe( resp => {
                this.ngZone.run( () => {

                  this.router.navigateByUrl('/');
                })
              });
        }, (error) => {
          console.log('paso algo malo che');
          alert(JSON.stringify(error, undefined, 2));
        });
  }
}