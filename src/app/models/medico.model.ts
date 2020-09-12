
import { Hospital } from './hospital.model';

interface _MedicoUser {
    _id: string;
    nombre: string;
    img: string;
}


export class Medico {
    constructor(
        public _id: string,
        public nombre: string,
        public Hospitales: Hospital,
        public usuario: _MedicoUser,
        public img?: string
    ){}

}