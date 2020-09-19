import { Component } from '@angular/core';


@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component{

  intervalo: any;

  // dona grafica
  public labelDona: string[] = ['Dato 1', 'Dato 2', 'Dato 3', 'Dato 4'];
  public dataDona = [ 10, 20, 30, 40 ];
  //----------------------

  // radar grafica
  public radarLabel: String[] =['dato 1', 'dato 2', 'dato 3', 'dato 4', 'dato 5', 'dato 6', 'dato 7'];
  public radarData: any[] = [
    { data: [65, 20, 90, 45, 10, 55, 40], label:  'dato 1'},
    { data: [22, 15, 40, 25, 90, 27, 75], label: 'dato 2' },
    { data: [42, 33, 40, 12, 34, 49, 65], label: 'dato 3' }
  ];
  //-----------------------

  // porcentaje Grafica
  public porcentajeLabel: string[] = ['dato 1', 'dato 2', 'dato 3'];
  public porcentajeData: number[] = [ 45, 25, 30 ];
  //-----------------------

  // barra Grafica
  public barraLabel: string[] = ['2000', '2010', '2020', '2030'];
  public barraData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'dato 1' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'dato 2' }
  ]
  //------------------------

  constructor(){
    const newResultD: number[] = [...this.dataDona ];
    const newResultR = [...this.radarData]
    const newResultP = [...this.porcentajeData];
    const newResultB = [...this.barraData]
    
    this.intervalo = setInterval( () => {

      for (let i in newResultD) {
        newResultD[i] = Math.round(Math.random() * 100);
      }

      for (let i in newResultP) {
        newResultP[i] = Math.round(Math.random() * 100);
      }

      for (let i in newResultR[0].data) {
        newResultR[0].data[i] = Math.round(Math.random() * 100);
        newResultR[1].data[i] = Math.round(Math.random() * 100);
        newResultR[2].data[i] = Math.round(Math.random() * 100);
      }      

      for (let i in newResultB[0].data) {
        newResultB[0].data[i] = Math.round(Math.random() * 100);
        newResultB[1].data[i] = Math.round(Math.random() * 100);
      }
       
       this.dataDona = [...newResultD];
       this.radarData = [...newResultR]; 
      this.porcentajeData = [...newResultP];
      this.barraData = [...newResultB];

    }, 3000 );


  }
}
