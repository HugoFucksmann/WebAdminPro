import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable,interval, Subscription } from 'rxjs';
import { retry, take, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;

  constructor() { 

    //poner a la escucha al observ
    //obs$.subscribe();

    /* this.retornaObservable().pipe(
      retry(2)
    ).subscribe(
      valor => console.log('Subs: ', valor),
      error => console.warn("Error: ", error),
      ()    => console.info('Obs terminado')
      
    ); */


    /* this.intervalSubs = this.retornaIntervalo()
      .subscribe(
        (valor) => console.log( valor )
        
      ) */ 
      //! o asi mas simple

      this.intervalSubs = this.retornaIntervalo()
      .subscribe( console.log );
  }

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

  retornaIntervalo(): Observable<number> {
    
    //ver orden de take map y filter
    return interval(500)
              .pipe(
                take(10),
                map( valor => valor +1 ),
                filter( valor => ( valor % 2 === 0 ) ? true : false ),
              );    
  }

  retornaObservable(): Observable<number> {

    let i = -1;
    
    //tipo subscriber para emitir cuando realiza una tarea
    return new Observable<number>( observer => {

      //callback: se dispara infinitamente cada 1 seg
      const intervalo = setInterval( () => {
        i++;
        observer.next(i);
        
        if(i===4){
          clearInterval(intervalo); //finaliza el observ
          observer.complete();
        }

        if (i === 2){
          observer.error('i llego al valor de 2');
          i=0;
        }
                
      }, 1000)

    });

    
  }

  

}
