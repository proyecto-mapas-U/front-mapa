import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../models/Usuario.model";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API_URL = 'http://localhost/backend-mapa-u/back-mapa/rest';

  constructor(
    private http: HttpClient
  ) { }

  registrar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<any>(`${this.API_URL}/registro.php`, usuario);
  }
}
