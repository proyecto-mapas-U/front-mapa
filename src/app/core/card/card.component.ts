import {Component, computed, EventEmitter, Output, signal, WritableSignal} from '@angular/core';
import {Router} from "@angular/router";
import {ReactiveFormsModule, Validators, FormBuilder, FormGroup, Form, FormsModule} from '@angular/forms';
import {FormControl} from '@angular/forms';
import {NgIf} from '@angular/common';
import {LoginService} from '../../services/login.service';
import {Usuario} from '../../models/Usuario.model';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Output() enviarCambio: EventEmitter<boolean> = new EventEmitter();

  protected nombre: string = "";
  protected numero: string = "";
  protected formLogin: FormGroup;
  protected mostrarLogin: WritableSignal<boolean> = signal(true);

  cambiarFondo = computed(() => {
    if (!this.mostrarLogin()) {
      this.formLogin.addControl('nombre', new FormControl('', Validators.required));
      console.log(this.formLogin);
    }
    return this.mostrarLogin();
  });

  constructor(
    private readonly router: Router,
    private loginService: LoginService,
  ) {
    this.formLogin = new FormGroup({//validadores de campos *nombre *telefono
      'numero': new FormControl('', Validators.required)
    });
  }

  get obtenerNombre() {
    return this.formLogin.get('nombre') as FormControl;
  }

  get obtenerNumero() {
    return this.formLogin.get('numero') as FormControl;
  }

  registrar() {
    this.loginService.registrar(this.construirUsuario()).subscribe(
      (respuesta) => {
        if (respuesta.success) {
          window.alert(respuesta.mensaje);
          this.router.navigate(['/mapa']);
        }
      }, (error) => {
        window.alert(error.mensaje);
      }
    );
  }

  private construirUsuario(): Usuario {
    return new Usuario(this.obtenerNombre.value, this.obtenerNumero.value);
  }

  login() {
    this.loginService.login(this.obtenerNumero.value).subscribe(
      (respuesta) => {
        console.log(respuesta);
        if (respuesta.success) {
          window.alert(respuesta.mensaje);
          localStorage.setItem('id', respuesta.data.id.toString());
          this.router.navigate(['/mapa']);
        }
      }, (error) => {
        console.log(error);
        window.alert('Ocurrió un error');
      }
    )

  }

  cambioFondo(event: MouseEvent) {
    event.preventDefault(); // Evita que se ejecute la acción por defecto
    this.mostrarLogin.set(!this.mostrarLogin());
    this.enviarCambio.emit(this.cambiarFondo());
  }

}
