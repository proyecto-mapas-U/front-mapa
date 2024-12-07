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

  login(numero: number): Observable<RespuestaRestDtoModel> {
    return this.http.post<RespuestaRestDtoModel>(`${this.registroUrl}/login.php`, numero);
  }
}
