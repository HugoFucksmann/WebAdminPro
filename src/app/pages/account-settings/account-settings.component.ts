import { SettingsService } from './../../services/settings.service';

import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: [
  ]
})
export class AccountSettingsComponent implements OnInit {

  private  linkTheme = document.querySelector('#theme');
  public links:NodeListOf<Element>;

  constructor(private SettingsService:SettingsService) { }

  ngOnInit(): void {

    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  changeTheme( theme:string ){

    this.SettingsService.changeTheme(theme);

    this.checkCurrentTheme();
    
  }

  checkCurrentTheme(){

    //buscar elemento a cual ponerle la clase working (tick)
    this.links.forEach( elem => {

      elem.classList.remove('working'); //quita working de todos

      const btnTheme = elem.getAttribute('data-theme'); //almacena el tema del boton

      
      

      const btnThemeUrl = `./assets/css/colors/${ btnTheme }.css`; //extrae el tema del boton y lo almacena en la url

      

      const currentTheme = this.linkTheme.getAttribute('href'); //url del tema actual

      

      if( btnThemeUrl === currentTheme ){

        console.log(btnTheme + "  " + currentTheme);
        
        elem.classList.add('working');
      }

    })
  }

}
