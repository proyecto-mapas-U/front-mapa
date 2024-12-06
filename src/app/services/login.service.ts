import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Usuario} from "../models/Usuario.model";
import {environment} from "../../environments/environment";
import {RespuestaRestDtoModel} from "../models/RespuestaRestDto.model";


@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private registroUrl: string = environment.restUrl;

  constructor(
    private http: HttpClient
  ) {
  }

  registrar(usuario: Usuario): Observable<RespuestaRestDtoModel> {
    return this.http.post<RespuestaRestDtoModel>(`${this.registroUrl}/registro.php`, usuario);
  }

  buscar(usuario: Usuario): Observable<Usuario> {
    return this.http.post<any>(`${this.registroUrl}/buscar.php`, usuario);
  }
}
