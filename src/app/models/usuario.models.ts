import { environment } from './../../environments/environment';

const base_url = environment.base_url;


export class Usuario{

    constructor(
        public google: string,
        public nombre: string,
        public email: string,
        public img?: string,
        public role?: 'ADMIN_ROLE' | 'USER_ROLE',
        public uid?: string,
    ) {}


    get imageUrl() {

        if ( !this.img ){
            return `${ base_url }/upload/usuarios/no-image`;

        }else if ( this.img.includes('https')) {
            return this.img;

        }else if ( this.img ){
            return `${ base_url }/upload/usuarios/${ this.img }`;
            
        }else{
            return `${ base_url }/upload/usuarios/no-image`;
        }
    }

}