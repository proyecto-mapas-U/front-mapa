import {Component, signal, WritableSignal} from '@angular/core';
import {Router} from "@angular/router";
import {FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {LoginService} from '../../services/login.service';
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
  protected mensajeError: WritableSignal<string> = signal('');

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
    const usuario: Usuario = this.obtenerDatosFormulario();
    this.loginService.registrar(usuario).subscribe(
      (respuesta) => {
        if (respuesta.success)
          this.enrutarMapa(respuesta.data.id);
        else this.mensajeError.set(respuesta.mensaje);
      }
    );
  }

  private obtenerDatosFormulario(): Usuario {
    return {
      nombre: this.obtenerNombre.value,
      numero: this.obtenerNumero.value
    };
  }

  enrutarMapa(idUsuario: number) {
    this.router.navigate(['/mapa', idUsuario]);
  }

  get obtenerNombre() {
    return this.formlogin.get('nombre' ) as FormControl;
  }

  get obtenerNumero() {
    return this.formlogin.get('numero') as FormControl;
  }

}
