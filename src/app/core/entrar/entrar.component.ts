import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {ReactiveFormsModule, Validators, FormBuilder, FormGroup, Form, FormsModule} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {NgIf} from '@angular/common';
import { LoginService } from '../../services/login.service';
import {Usuario} from "../../models/Usuario.model";

@Component({
  selector: 'app-entrar',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './entrar.component.html',
  styleUrl: './entrar.component.css'
})
export class EntrarComponent {
  protected numero: string = "";

  formentrar = new FormGroup({//validadores de campos *telefono
    'numero': new FormControl('', Validators.required)
  });

  constructor(
    private readonly router: Router,
    private loginService : LoginService //inyeccion de servicios
  ) {
  }

  comprobardatos(){
    const usuario : Usuario = {
      numero : this.numero
    }
    this.loginService.buscar(usuario).subscribe(
      (respuesta) => {
        console.log('entro correctamente');
        this.enrutarMapa();
      },
      (error) => {
        console.log('ocurrio un error => ', error);
        this.enrutarMapa();
      }
    );
  }

  enrutarMapa() {
    console.log('enrutar mapa');
    this.router.navigate(['/mapa']);
  }


  get obtenerNumero() {
    return this.formentrar.get('numero') as FormControl;
  }
}
