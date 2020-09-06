import { Usuario } from './../models/usuario.models';

export interface CargarUsuario{
    total: number;
    usuarios: Usuario[];
}