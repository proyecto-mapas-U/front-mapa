import { Injectable } from '@angular/core';
import { usuario } from './models/Usuario.model';
@Injectable({
  providedIn: 'root'
})
export class DatosloginService {

  constructor() { }

  nombreusuario : string = "";
  telefonousuario : string[] = ['1'];

  comprobardatos(nombre: string,telefono: string){
    this.nombreusuario.push(nombre);
    this.telefonousuario.push(telefono);
  }
}
