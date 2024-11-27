import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../models/Usuario.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API_URL = 'http://localhost/back-mapa/rest/registro.php';

  constructor(
    private http: HttpClient
  ) { }

  registrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<any>(`${this.API_URL}/registro.php`, usuario);
  }

  buscar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<any>(`${this.API_URL}/buscar.php`, usuario);
  }
}
