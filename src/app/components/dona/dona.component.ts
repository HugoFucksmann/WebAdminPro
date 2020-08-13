import { Component, OnInit, Input } from '@angular/core';

import { ChartType } from 'chart.js';
import { MultiDataSet, Label, Colors } from 'ng2-charts';

@Component({
  selector: 'app-dona',
  templateUrl: './dona.component.html',
  styles: [
  ]
})
export class DonaComponent{

  @Input() title: string = 'sin titulo';
   
  


  @Input('labels') doughnutChartLabels: Label[] = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
  @Input('data') doughnutChartData: MultiDataSet = [
    [350, 450, 100],
    /* [50, 150, 120],
    [250, 130, 70], */
  ];
  public doughnutChartType: ChartType = 'doughnut';

  @Input() public colors:Colors[] = [
    { backgroundColor: [ '#6857e', '#009fff', '#ffb414' ] }
  ];
}
