import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {ReactiveFormsModule, Validators, FormBuilder, FormGroup, Form, FormsModule} from '@angular/forms';
import {FormControl} from '@angular/forms';
import { LoginService } from '../../services/login.service';
import {Usuario} from "../../models/Usuario.model";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  protected nombre: string = "";
  protected numero: string = "";

  formlogin = new FormGroup({//validadores de campos *nombre *telefono
    'nombre': new FormControl('', Validators.required),
    'numero': new FormControl('', Validators.required)
  });

  constructor(
    private readonly router: Router,
    private loginService : LoginService //inyeccion de servicios
  ) {
  }

  enviarDatos(){
    const usuario : Usuario = {
      nombre: this.nombre,
      numero: this.numero
    }
    this.loginService.registrar(usuario);
    this.nombre = "";
    this.numero = "";
    console.log('se envío correctamente');
  }

  login() {
    this.router.navigate(['/mapa']);
  }

  get obtenerNombre() {
    return this.formlogin.get('nombre' ) as FormControl;
  }

  get obtenerNumero() {
    return this.formlogin.get('numero') as FormControl;
  }

}
