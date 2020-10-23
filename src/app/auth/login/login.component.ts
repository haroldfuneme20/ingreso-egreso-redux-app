import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';

import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import * as actions from '../../shared/ui.actions';
import { Subscription } from 'rxjs';
import { uiReducer } from '../../shared/ui.reducer';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit, OnDestroy{

  loginForm: FormGroup;
  cargando = false;
  // para manipular la suscripsion del store
  uiSusbscription: Subscription;

  constructor(
    private fb: FormBuilder,
    private _Auth: AuthService,
    private router: Router,
    // suscribirme al uiReducer || AppState estado global de la app desde appReducer
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.uiSusbscription = this.store.select('uiReducers').subscribe( uiReduce => {
      console.log(uiReduce.isLoadings);
      this.cargando = uiReduce.isLoadings;
      console.log('cargando subs');
    });
  }

  ngOnDestroy() {
    // limpieza de suscripcion del uireducer
    this.uiSusbscription.unsubscribe();
  }

  login() {

    // disparar la acción  isLoadings
    this.store.dispatch( actions.isLoadings() );
    if (this.loginForm.invalid) { return; }

    // this.loading();
    const {email, password} = this.loginForm.value;
    this._Auth.loginUser( email, password)
    .then( user => {
      // Swal.close();
      this.store.dispatch( actions.stopLoading());
      this.router.navigate(['/']);
      console.log(user);
    }).catch( err => {
      this.store.dispatch( actions.stopLoading());
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: err.message,
      });
      console.log(err);
    });

  }

  loading() {
    Swal.fire({
      title: 'Esperando Data',
      willOpen: () => {
        Swal.showLoading();
      }
    });
  }



}
