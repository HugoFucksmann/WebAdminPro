import { map } from 'rxjs/operators';
import { Medico } from './../models/medico.model';
import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class MedicosService {

  public medico: Medico;

  constructor(private http: HttpClient) { }

  get token():string {
    return localStorage.getItem('token') || '';
  }

  get headers(){
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  cargarMedicos( desde: number ){

    const url = `${ base_url }/medicos?desde=${ desde }`;    
    
    
    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, medicos: Medico[],total:number }) => {return {
          medicos: resp.medicos,
          total: resp.total,
        }} )
      );
        
  }

  obtenerMedicoById( id:string ){

    const url = `${ base_url }/medicos/${ id }`;    
    
    return this.http.get( url, this.headers )
      .pipe(
        map( (resp: {ok: boolean, medico: Medico }) => resp.medico )
      );
        
  }


  crearMedico( medico: {nombre: string, hospitales: string} ){
    console.log(medico);
    
    const url = `${ base_url }/medicos`;
    
    return this.http.post( url, medico, this.headers );  
  }


  actualizarMedico( medico: Medico ){

    const url = `${ base_url }/medicos/${ medico._id }`;
    return this.http.put( url, medico, this.headers );

  }


  borrarMedico(  _id: string ){

    const url = `${ base_url }/medicos/${ _id }`;
    return this.http.delete( url, this.headers );
  }
}
