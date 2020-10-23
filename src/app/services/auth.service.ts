import { Injectable, OnDestroy } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { Store } from '@ngrx/store';
import { map } from 'rxjs/operators';
import { User } from '../models/user.model';
import * as authActions from '../auth/auth.actions';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  nameUser: string;
  unSubscripe: Subscription;

  constructor( 
    private authSer: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store
  ) { }


  initAuthListener() {
    this.authSer.authState.subscribe( fireUser => {
      // console.log(fireUser.uid);

      if (fireUser) {
       this.unSubscripe = this.firestore.doc(`${ fireUser.uid}/usuario`).valueChanges()
                      .subscribe( (doc: any) => {
                        // const tempUser = new User('abc', 'borar', 'asdf@asdf.com');
                        // se envia el doc dese el fireStore al metodo estatico del
                        // modelo el cual crea una nueva instancia con estos datos
                        // y asi se puede enviar este objeto a la acción
                        console.log(doc);
                        const user = User.fromFireStore(doc);
                        this.store.dispatch( authActions.setUser({ user: user }));
                      });
        // this.store.dispatch( authActions.setUser(fireUser.) );

      } else {
        this.unSubscripe.unsubscribe();
        this.store.dispatch( authActions.unSetUser());

      }

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
