import { Injectable } from '@angular/core';
import { Usuario } from './models/Usuario.model';
@Injectable({
  providedIn: 'root'
})
export class DatosloginService {

  constructor(public usuarios : Usuario) { }

  comprobardatos(nombre: string,telefono: string){
    this.usuarios.nombreusuario.push(nombre)
    this.telefonousuario.push(telefono);
  }
}
