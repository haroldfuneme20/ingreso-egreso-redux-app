import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( private authSer: AngularFireAuth) { }

  crearUsuario(nombre: string, email: string, password: string) {
    return this.authSer.createUserWithEmailAndPassword(email, password)

  }
}
