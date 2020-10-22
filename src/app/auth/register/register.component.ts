import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    }) 
  }

  crearUser() {

    if (this.form.invalid) {return; }
    this.loading();
    const { nombre, correo, password} = this.form.value;
    this.auth.crearUsuario(nombre, correo, password)
          .then( credenciales => {
            Swal.close();
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
          })
    console.log(this.form);
    console.log(this.form.value);
  }

  loading() {
    let timerInterval;
    Swal.fire({
      title: 'Esperando Data',
      willOpen: () => {
        Swal.showLoading();
      }
    });
  }

}
