import { Component, EventEmitter,Output } from '@angular/core';
import {Router} from "@angular/router";
import {ReactiveFormsModule, Validators, FormBuilder, FormGroup, Form, FormsModule} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {NgIf} from '@angular/common';
import { LoginService } from '../../services/login.service';
import {Usuario} from "../../models/Usuario.model";
import { FondosService } from '../../services/fondos.service';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ReactiveFormsModule,FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  protected nombre: string = "";
  protected numero: string = "";
  protected formLogin: FormGroup;
  mostrarLogin: boolean = true;

  

  constructor(
    private readonly router: Router,
    private loginService : LoginService, //inyeccion de servicios
  ) {

    this.formLogin = new FormGroup({//validadores de campos *nombre *telefono
      'numero': new FormControl('', Validators.required)
    });
    if (!this.mostrarLogin){
      const nombre = new FormControl('',Validators.required);
      this.formLogin.addControl('nombre',nombre);
    } 
  }

  get obtenerNombre() {
    return this.formLogin.get('nombre' ) as FormControl;
  }

  get obtenerNumero() {
    return this.formLogin.get('numero') as FormControl;
  }

  enviarDatos(){
    const usuario : Usuario = {
      nombre: this.nombre,
      numero: this.numero
    }
    this.loginService.registrar(usuario).subscribe(
      (respuesta) => {
        console.log('se envío correctamente');
        //this.enrutarMapa();
      },
      (error) => {
        console.log('ocurrio un error => ', error);
        //this.enrutarMapa();
      }
    );
  }

  @Output() enviarCambio: EventEmitter<boolean> = new EventEmitter();
  cambioFondo(event: MouseEvent) {
    event.preventDefault(); // Evita que se ejecute la acción por defecto
    this.mostrarLogin = false;
    this.enviarCambio.emit(this.mostrarLogin);
  }

}
