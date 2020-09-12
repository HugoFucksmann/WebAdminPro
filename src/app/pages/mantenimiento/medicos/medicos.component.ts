import  Swal  from 'sweetalert2';
import { MedicosService } from './../../../services/medicos.service';
import { delay } from 'rxjs/operators';
import { Medico } from './../../../models/medico.model';
import { BusquedasService } from './../../../services/busquedas.service';
import { ModalImageService } from './../../../services/modal-image.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-medicos',
  templateUrl: './medicos.component.html',
  styles: [
  ]
})
export class MedicosComponent implements OnInit {

  public desde: number = 0;
  public totalMed: number;
  public medicos: Medico[] = [];
  public medicosTemp: Medico[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor(private medicoService: MedicosService,
    private modalService: ModalImageService,
    private busquedasService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe(); //sin fuga de memoria (para que no vuelva a cargar)
  }

  ngOnInit(): void {

    this.cargarMedicos();

    this.imgSubs = this.modalService.nuevaImagen
      .pipe( delay(200) )
      .subscribe( img => this.cargarMedicos() );
  }

  cargarMedicos(){

    this.cargando = true;
    this.medicoService.cargarMedicos( this.desde )
      .subscribe( resp => {
        this.cargando = false;
        this.medicos = resp.medicos;
        this.medicosTemp = resp.medicos;
        this.totalMed = resp.total;
      })
  }


  buscar( termino: string){
    
    if ( termino.length === 0 ){
      return this.medicos = this.medicosTemp; 
    }

    this.busquedasService.buscar( 'medicos', termino )
      .subscribe( (resp: Medico[]) => {
        
        this.medicos = resp;
        
      }
      )
    
  }
  

  cambiarPagina( valor: number ){
    this.desde += valor;

    if( this.desde < 0 ){
      this.desde = 0;
    }else if ( this.desde >= this.totalMed ){
      this.desde -= valor;
    }
    
    
    this.cargarMedicos();
  }

  guardarCambios( medico: Medico ) {

      this.medicoService.actualizarMedico( medico )
        .subscribe( resp => {
          Swal.fire('Actualizado', medico.nombre, 'success');
        });
  }

  eliminarMedicos( medico: Medico ){
    
    Swal.fire({
      title: 'Borrar medico?',
      text: `Estas a punto de borrar a ${ medico.nombre }`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Si, borralo'
    }).then((result) => {
      if (result.value) {
        
        this.medicoService.borrarMedico( medico._id )
          .subscribe( resp => {
            
            this.cargarMedicos();
            Swal.fire(
              'Medico borrado',
              `${ medico.nombre } fue eliminado correctamente`,
              'success'
            )
          });
      }
    })
  }

  

  abrirModal(medico: Medico){
    this.modalService.abrirModal('medicos',medico._id, medico.img);
  }

}
