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

  public guardarCoordenadas(coordenadas: CoordenadasModel) {
    this.http.post(`${this.urlGuardarCoordenadas}/enviar_coordenadas.php`, coordenadas);
  }

  public obtenerCoordenadasUsuario(idUsuario: number): Observable<RespuestaRestDtoModel> {
    return this.http.get<RespuestaRestDtoModel>(`${this.urlGuardarCoordenadas}/obtener_coordenadas_usuario.php?idUsuario=${idUsuario}`);
  }

  public obtenerCoordenadasGlobales(): Observable<RespuestaRestDtoModel> {
    return this.http.get<RespuestaRestDtoModel>(`${this.urlGuardarCoordenadas}/obtener_coordenadas_globales.php`);
  }

  public verificarCoordenadasUsuario(idUsuario: number): Observable<RespuestaRestDtoModel> {
    return this.http.get<RespuestaRestDtoModel>(`${this.urlGuardarCoordenadas}/verificar_coordenadas_usuario.php?idUsuario=${idUsuario}`);
  }

  public actualizarCoordenadas(coordenadas: CoordenadasModel): void {
    this.http.post(`${this.urlGuardarCoordenadas}/actualizar_coordenadas.php`, coordenadas);
  }
}
