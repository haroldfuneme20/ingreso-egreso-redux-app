export class User {

    // se obtiene una nueva instancia del modelo user
    // llenandola con los datos desde FireStore
    static fromFireStore( {email, uid, nombre}) {
        return new User(uid, email, nombre);
    }

    constructor(
        public uid: string,
        public nombre: string,
        public email: string,
    ) {}
}