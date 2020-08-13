import { Component, OnInit } from '@angular/core';




@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [
  ]
})
export class Grafica1Component{

  public label1: string[] = ['label1', 'label2', 'label3'];

  public data1 = [
    [10,20, 30]
  ];

  public data2 = [
    [100,305, 50]
  ];

  
}
