import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {environment} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ServicesSocketService {

  private webSocket: WebSocket;
  private messagesSubject: Subject<any> = new Subject<any>();

  constructor() {
    this.webSocket = new WebSocket(environment.socketUrl);

    this.webSocket.onopen = (event) => {
      console.log('Conexión abierta => ', event);
    }

    this.webSocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      this.messagesSubject.next(data);
    }

    this.webSocket.onerror = (error) => {
      console.log('Error => ', error);
    }

    this.webSocket.onclose = (event) => {
      console.log('Conexión cerrada => ', event);
    }
  }

  enviarMensaje(mensaje: string): void {
    if (this.webSocket.readyState === WebSocket.OPEN)
      this.webSocket.send(JSON.stringify(mensaje));
    else console.log('Conexión cerrada');
  }

  obtenerRespuesta(): Observable<any> {
    return this.messagesSubject.asObservable();
  }
}
