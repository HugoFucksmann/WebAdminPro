import { delay } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { Hospital } from 'src/app/models/hospital.model';
import { HospitalService } from './../../../services/hospital.service';

import { Medico } from './../../../models/medico.model';

import { MedicosService } from './../../../services/medicos.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
})
export class MedicoComponent implements OnInit {

  public medicoForm: FormGroup;
  
  
  public medicoSeleccionado: Medico
  public hospitales: Hospital[] = [];
  public  hospSelec: Hospital;
  

  constructor( private fb: FormBuilder,
    private medicosService: MedicosService,
    private hospitalService: HospitalService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {}


  ngOnInit(): void {

    this.activatedRoute.params.subscribe(  ({ id }) => this.cargrarMedico( id ));

    this.medicoForm = this.fb.group({
      nombre: [ '', Validators.required ],
      hospitales: [ '', Validators.required ]
    });

    this.cargarHospital();

    this.medicoForm.get('hospitales').valueChanges
    .subscribe( hospId => {
      //detecta el id del hosp selec y busca si hay uno en el []
      this.hospSelec = this.hospitales.find( h => h._id === hospId );     
    })
  }

  cargrarMedico( id: string){

    if( id === 'nuevo'){
      return;
    }

    this.medicosService.obtenerMedicoById( id )
      .pipe( delay(100) )
      .subscribe( (medico:any) => {
                
        if(!medico){
          return  this.router.navigateByUrl(`/dashboard/medicos/`);
        }
        
        const { nombre, hospitales:{ _id } } = medico;

        this.medicoSeleccionado = medico;  
        this.medicoForm.setValue({ nombre, hospitales: _id });
      }
    );
  }

  cargarHospital(){
    this.hospitalService.cargarHospitales()
      .subscribe( resp => {
      this.hospitales = resp.hospitales;
        
        
      })
  }


  guardarMedico(){
    //actualizar
    const { nombre } = this.medicoForm.value;

    if( this.medicoSeleccionado ){
           
      const data = {
        ...this.medicoForm.value,
        _id: this.medicoSeleccionado._id
      }
      
      
      this.medicosService.actualizarMedico( data )
        .subscribe( resp => Swal.fire('Actualizado', `${ nombre } actualizado correctamente`, 'success'));

    }else{
      //crear
      const { nombre } = this.medicoForm.value;
      
      this.medicosService.crearMedico( this.medicoForm.value )
        .subscribe( (resp:any) => {
        
          Swal.fire('Creado', `${ nombre } creado correctamente`,'success');
          this.router.navigateByUrl(`/dashboard/medico/${ resp.medicos._id }`)
        })
    }
  }

}
