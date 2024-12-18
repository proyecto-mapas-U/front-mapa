import {Component, signal, WritableSignal} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
import {Usuario} from "../../models/Usuario.model";
import { CardComponent } from "../card/card.component";


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, CardComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  mostrarLoginEnPadre: boolean = true;
  protected nombre: string = "";
  protected numero: string = "";
  protected mensajeError: WritableSignal<string> = signal('');

  fondo: any[] = [
    {
      url: "background-image: url(https://wallpaperaccess.com/full/7130206.jpg); background-size: cover; background-repeat: no-repeat; height: 100vh; width: 100vw; transition: 1s;",
    },
    {
      url: "background-image: url(https://images.unsplash.com/photo-1446776899648-aa78eefe8ed0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29vZ2xlJTIwbWFwJTIwdmlld3xlbnwwfHwwfHx8MA%3D%3D); background-size: cover; background-repeat: no-repeat; height: 100vh; width: 100vw; transition: 1s;",
    }
  ];
  
  imagenFondo: string = 'background-image: url(https://wallpaperaccess.com/full/7130206.jpg); background-size: cover; background-repeat: no-repeat; height: 100vh; width: 100vw; transition: 1s;';

  constructor(
    private readonly router: Router,
    private loginService : LoginService //inyeccion de servicios
  ) {
  }

  enrutarMapa(idUsuario: number) {
    this.router.navigate(['/mapa', idUsuario]);
  }

  recibirDatos(dato: boolean) {
    this.mostrarLoginEnPadre = dato;
    console.log("Estado recibido en el padre:", this.mostrarLoginEnPadre);
    this.cambioFondo();
  }

  cambioFondo(){
    if (!this.mostrarLoginEnPadre){
      this.imagenFondo = this.fondo[1].url
    }else{
      this.imagenFondo = this.fondo[0].url
    }
  }
 
}


