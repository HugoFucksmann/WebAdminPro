import Swal from 'sweetalert2';
import { FileUploadService } from './../../services/file-upload.service';
import { ModalImageService } from './../../services/modal-image.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-modal-image',
  templateUrl: './modal-image.component.html',
  styles: [
  ]
})

export class ModalImageComponent{

  public imagenSubir: File;
  public imgTemp: any;

  constructor(public modalService: ModalImageService,
              private fileUploadService: FileUploadService) { }


  cerrarModal(){
    this.imgTemp = null;
   this.modalService.cerrarModal();
  }


  cambiarImagen( file: File ){

    this.imagenSubir = file;

    if ( !file ) { 
      return this.imgTemp = null; 
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = ( () => {
      this.imgTemp = reader.result;
      
    })
  }

  subirImagen(){

    const id = this.modalService.id;
    const tipo = this.modalService.tipo;

    this.fileUploadService
      .actualizarFoto( this.imagenSubir, tipo, id )
      .then( img => { 
        
        Swal.fire('Guardado', 'Imagen actualizada con exito', 'success');
        this.modalService.nuevaImagen.emit(img);
        console.log(img);
        
        this.cerrarModal();

      }).catch( err => {
        console.log(err);
        Swal.fire('Error', "error al cargar imagen", 'error');
      });
  }
}
