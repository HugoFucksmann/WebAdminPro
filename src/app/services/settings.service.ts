import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  

  public  linkTheme = document.querySelector('#theme');

  constructor() { 

    const url = localStorage.getItem('theme') || "./assets/css/colors/default-dark.css";

    this.linkTheme.setAttribute('href',url);
  }

  changeTheme( theme:string ){    
    
    const url = `./assets/css/colors/${theme}.css`;

    this.linkTheme.setAttribute('href',url);
    localStorage.setItem('theme',url); 
    
    this.checkCurrentTheme();
  }

  checkCurrentTheme(){

    const links = document.querySelectorAll('.selector');

    //buscar elemento a cual ponerle la clase working (tick)
    links.forEach( elem => {

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
