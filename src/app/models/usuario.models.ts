
export class Usuario{

    constructor(
        public google: string,
        public nombre: string,
        public email: string,
        public img?: string,
        public role?: boolean,
        public uid?: string
    ) {}

}