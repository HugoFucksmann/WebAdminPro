import { filter, map } from 'rxjs/operators';
import { Router, ChildActivationEnd, ActivationEnd } from '@angular/router';
import { Component, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnDestroy{

  public titulo: string;
  public tituloSubs$: Subscription;

  constructor( private router: Router ) { 

    this.tituloSubs$ = this.getArgumentosRuta();
  }

  ngOnDestroy(): void {
    this.tituloSubs$.unsubscribe();
  }

  getArgumentosRuta(){

    return this.router.events
      .pipe(
        filter( event => event instanceof ActivationEnd ),
        filter( (event: ActivationEnd) => event.snapshot.firstChild === null ),
        map( (event: ActivationEnd) => event.snapshot.data )
      ) //desestructuracion suscribe
      .subscribe( ({ titulo }) => {
      
      this.titulo = titulo;
      document.title = `AdminPro - ${ titulo }`;
      
    });
  }

}
