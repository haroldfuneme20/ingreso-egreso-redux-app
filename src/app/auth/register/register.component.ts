import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';
import { AppState } from '../../app.reducer';
import { Subscription } from 'rxjs';
import * as actions from '../../shared/ui.actions';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit, OnDestroy {

  form: FormGroup;
  uiSusbscription: Subscription;
  cargando = false;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
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

  crearUser() {

    if (this.form.invalid) {return; }
    this.store.dispatch( actions.isLoadings() );
    // this.loading();
    const { nombre, correo, password} = this.form.value;
    this.auth.crearUsuario(nombre, correo, password)
          .then( credenciales => {
            // Swal.close();
            this.store.dispatch( actions.stopLoading() );
            console.log(credenciales);
            this.router.navigate(['/']);
          })
          .catch( error => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...',
              text: error.message,
            });
            console.log(error);
          });
  }

  loading() {
    // Swal.fire({
    //   title: 'Esperando Datas',
    //   willOpen: () => {
    //     Swal.showLoading();
    //   }
    // });
  }

}
