import {Component, OnInit} from '@angular/core';
import L from 'leaflet';
import {ServicesSocketService} from "../../services/services-socket.service";

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  public mapa: L.Map | undefined;
  constructor(
    private serviceSocket: ServicesSocketService
  ) {
  }

  ngOnInit() {
    this.initMap();
    this.serviceSocket.obtenerRespuesta().subscribe((data) => {
      console.log('Mensaje => ', data);
    })
  }

  private initMap() {
    this.mapa = L.map("map").setView([5.53528, -73.36778], 15);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?", {}).addTo(this.mapa);
  }

  enviarMensaje(mensaje: string): void {
    this.serviceSocket.enviarMensaje(mensaje);

  }
}
