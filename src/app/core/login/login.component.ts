import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ReactiveFormsModule, Validators, FormBuilder, FormGroup, Form, FormsModule} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {NgIf} from '@angular/common';
import { DatosloginService } from '../../datoslogin.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  nomrbre : string = "";
  telefono : string = "";

  formlogin = new FormGroup({//validadores de campos *nombre *telefono
    'name': new FormControl('', Validators.required),
    'numero': new FormControl('', Validators.required)
  });

  constructor(
    private readonly router: Router,
    public datoslogin : DatosloginService //inyeccion de servicios
  ) {
  }
  
  enviardatos(){
    this.datoslogin.comprobardatos(this.nomrbre,this.telefono);
    this.nomrbre = "";
    this.telefono = "";
    console.log('se envio correctamente');
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
