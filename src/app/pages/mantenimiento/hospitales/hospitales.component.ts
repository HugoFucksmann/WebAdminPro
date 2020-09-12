import { BusquedasService } from './../../../services/busquedas.service';
import { delay } from 'rxjs/operators';
import { Subscription } from 'rxjs';
import { ModalImageService } from './../../../services/modal-image.service';
import Swal from 'sweetalert2';
import { HospitalService } from './../../../services/hospital.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Hospital } from 'src/app/models/hospital.model';

@Component({
  selector: 'app-hospitales',
  templateUrl: './hospitales.component.html',
  styles: [
  ]
})
export class HospitalesComponent implements OnInit, OnDestroy {

 
  public desde: number = 0;
  public totalHosp: number;
  public hospitales: Hospital[] = [];
  public hospitalesTemp: Hospital[] = [];
  public cargando: boolean = true;
  private imgSubs: Subscription;

  constructor(private hospitalService: HospitalService,
              private modalService: ModalImageService,
              private busquedaService: BusquedasService) { }

  ngOnDestroy(): void {
    this.imgSubs.unsubscribe(); //sin fuga de memoria (para que no vuelva a cargar)
  }

  ngOnInit(): void {

    this.cargarHospitales();

    this.imgSubs = this.modalService.nuevaImagen
      .pipe( delay(200) )
      .subscribe( img => this.cargarHospitales() );
  }

  buscar( termino: string){

    if ( termino.length === 0 ){
      return this.hospitales = this.hospitalesTemp; //retorna punto original antes de buscar
    }

    this.busquedaService.buscar( 'hospitales', termino )
      .subscribe( (resp: Hospital[]) => {
        
        this.hospitales = resp;
      }
      )
    
  }

  cargarHospitales(){

    this.cargando = true;
    this.hospitalService.cargarHospitales()
      .subscribe( resp => {
        this.cargando = false;
        this.hospitales = resp.hospitales;
        this.hospitalesTemp = resp.hospitales;
        this.totalHosp = resp.total;
      })
  }
  

  cambiarPagina( valor: number ){
    this.desde += valor;

    if( this.desde < 0 ){
      this.desde = 0;
    }else if ( this.desde >= this.totalHosp ){
      this.desde -= valor;
    }
    
    
    this.cargarHospitales();
  }

  guardarCambios( hospital: Hospital ) {

      this.hospitalService.actualizarHospital( hospital._id, hospital.nombre )
        .subscribe( resp => {
          Swal.fire('Actualizado', hospital.nombre, 'success');
        });
  }

  eliminarHospital( hospital: Hospital ){

    this.hospitalService.borrarHospital( hospital._id )
      .subscribe( resp => {
        this.cargarHospitales()
        Swal.fire('Borrado', hospital.nombre, 'success')
      });
  }

  async abrirSweetAlert(){
    const { value } = await Swal.fire<string>({
      title: 'Crear Hospital',
      text: 'Ingrese el nombre del hospital',
      input: 'text',
      inputPlaceholder: 'nombre del hospital',
      showCancelButton: true,
    })
    try{
    if( value.trim().length > 0 ){
      this.hospitalService.crearHospital(value)
        .subscribe( (resp: any) => {
          //this.hospitales.push( resp.hospital) //para agregar directo al array de hosp
          this.cargarHospitales()
        })
    }
    }catch(err){
      return      
    }
  }

  abrirModal(hospital: Hospital){
    this.modalService.abrirModal('hospitales',hospital._id, hospital.img);
  }
}
