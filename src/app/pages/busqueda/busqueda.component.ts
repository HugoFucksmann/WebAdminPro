import { Medico } from './../../models/medico.model';
import { Hospital } from './../../models/hospital.model';
import { Usuario } from './../../models/usuario.models';
import { BusquedasService } from './../../services/busquedas.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [],
})
export class BusquedaComponent implements OnInit {

  public usuarios:Usuario[] = [];
  public hospitales:Hospital[] = [];
  public medicos: Medico[] = [];

  constructor(private activateRoute: ActivatedRoute,
              private busquedaService: BusquedasService) {}

  ngOnInit(): void {
    this.activateRoute.params
      .subscribe( ({termino}) => this.buscar(termino) );

  }

  buscar( termino: string ){
    this.busquedaService.buscarTodo(termino)
      .subscribe( (resp:any) => {
        
        this.usuarios = resp.usuarios;
        this.medicos = resp.medicos;
        this.hospitales = resp.hospitales;
        
        
      }

      )
  }

  abrirMedico( medico: Medico){
    console.log(medico._id);
    
  }
}
