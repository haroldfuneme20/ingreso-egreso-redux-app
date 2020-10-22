import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor( 
    private authSer: AngularFireAuth,
    private firestore: AngularFirestore
  ) { }


  initAuthListener() {
    this.authSer.authState.subscribe( fireUser => {
      console.log(fireUser);
    });
  }

  crearUsuario(nombre: string, email: string, password: string) {

    return this.authSer.createUserWithEmailAndPassword(email, password)
                       .then( ({ user }) => {
                         const newUser = new User( user.uid, nombre, user.email );
                         return this.firestore.doc(`${user.uid}/usuario`).set(
                           {
                              ...newUser
                           }
                         )
                       });

  }

  loginUser(email: string, password: string) {
      return this.authSer.signInWithEmailAndPassword(email, password);
  }

  logOut() {
    return this.authSer.signOut();
  }

  isAuth() {
    return this.authSer.authState.pipe(
      map( firebaseUSer =>  firebaseUSer != null)
    );
  }
}
