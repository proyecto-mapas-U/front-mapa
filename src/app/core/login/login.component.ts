import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ReactiveFormsModule, Validators, FormBuilder, FormGroup, Form} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {NgIf} from '@angular/common';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  formlogin = new FormGroup({
    'name': new FormControl('', Validators.required),
    'numero': new FormControl('', Validators.required)
  });

  nombre:string = '';
  telefono:string = '';

  nomusuario:string = 'admin';

  datlogin() {
    const datoslogin = {
      nombre : this.nombre,
      telefono : this.telefono
    };
    if(this.nombre == this.nomusuario){
      console.log('correcto')
    }else{
      console.log('incorrecto')
    };
  };

  constructor(
    private readonly router: Router
  ) {
  }


  login() {
    this.router.navigate(['/mapa']);
  }

  get name() {
    return this.formlogin.get('name' ) as FormControl;
  }

  get numero() {
    return this.formlogin.get('numero') as FormControl;
  }

}
