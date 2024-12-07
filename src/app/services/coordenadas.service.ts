import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CoordenadasModel} from "../models/Coordenadas.model";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs";
import {RespuestaRestDtoModel} from "../models/RespuestaRestDto.model";

@Injectable({
  providedIn: 'root'
})
export class CoordenadasService {

  private urlGuardarCoordenadas = environment.restUrl;

  constructor(
    private http: HttpClient,
  ) {
  }

  public guardarCoordenadas(coordenadas: CoordenadasModel): Observable<RespuestaRestDtoModel> {
   return this.http.post<RespuestaRestDtoModel>(`${this.urlGuardarCoordenadas}/enviar_coordenadas.php`, coordenadas);
  }

  public obtenerCoordenadasUsuario(idUsuario: number): Observable<RespuestaRestDtoModel> {
    return this.http.get<RespuestaRestDtoModel>(`${this.urlGuardarCoordenadas}/obtener_coordenadas_usuario.php?idUsuario=${idUsuario}`);
  }

  public obtenerCoordenadasGlobales(): Observable<RespuestaRestDtoModel> {
    return this.http.get<RespuestaRestDtoModel>(`${this.urlGuardarCoordenadas}/coordenadas_globales.php`);
  }

  public verificarCoordenadasUsuario(idUsuario: number): Observable<RespuestaRestDtoModel> {
    return this.http.get<RespuestaRestDtoModel>(`${this.urlGuardarCoordenadas}/verificar_coordenadas_usuario.php`, {
      params: {
        idUsuario: idUsuario.toString()
      }
    });
  }

  public actualizarCoordenadas(coordenadas: CoordenadasModel): Observable<RespuestaRestDtoModel> {
    console.log('actualizarCoordenadas => ', coordenadas);
    return this.http.post<RespuestaRestDtoModel>(`${this.urlGuardarCoordenadas}/actualizar_coordenadas.php`, coordenadas);
  }
}
