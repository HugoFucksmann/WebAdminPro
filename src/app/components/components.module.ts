import { GraficaRadarComponent } from './grafica-radar/grafica-radar.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IncrementadorComponent } from './incrementador/incrementador.component';
import { DonaComponent } from './dona/dona.component';
import { ModalImageComponent } from './modal-image/modal-image.component';
import { GraficaPorcentajeComponent } from './grafica-porcentaje/grafica-porcentaje.component';
import { GraficaBarrasComponent } from './grafica-barras/grafica-barras.component';


import { FormsModule } from '@angular/forms';
import { ChartsModule } from 'ng2-charts';

@NgModule({
  declarations: [
    IncrementadorComponent, 
    DonaComponent, 
    ModalImageComponent, 
    GraficaRadarComponent, 
    GraficaPorcentajeComponent, 
    GraficaBarrasComponent
  ],
  exports: [
    IncrementadorComponent, 
    DonaComponent,
    ModalImageComponent,
    GraficaRadarComponent,
    GraficaPorcentajeComponent,
    GraficaBarrasComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ChartsModule
  ]
})
export class ComponentsModule { }
