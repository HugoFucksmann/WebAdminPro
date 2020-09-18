import { Component, OnInit } from '@angular/core';





@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component{

  // dona grafica
  public labelDona: string[] = ['label1', 'label2', 'label3'];

  public data1 = [
    [10,20, 30]
  ];

  public data2 = [
    [100,305, 50]
  ];
  //----------------------

  // radar grafica
  public radarLabel: String[] =['comer', 'Bailar', 'Dormir', 'pensar', 'Trabajar', 'Andar en Bici', 'Correr'];
  public radarChartData: any[] = [
    { data: [65, 20, 90, 45, 10, 55, 40], label:  'Fin de semana'},
    { data: [65, 15, 40, 25, 90, 27, 75], label: 'Dias de semana' }
  ];
  //-----------------------

  // porcentaje G
  public porcentajeLabel: string[] = ['ventas online', 'Ventas en tienda', 'Ventas por Email'];
  public porcentajeData: number[] = [ 45, 25, 30];
  //-----------------------

  // barra G
  public barraLabel: string[] = ['2000', '2010', '2020']
  public barraData: any[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'peso' },
    { data: [28, 48, 40, 19, 86, 27, 90], label: 'dolar' }]
}
