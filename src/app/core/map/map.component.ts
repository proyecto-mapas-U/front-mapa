import {Component, OnInit} from '@angular/core';
import L from 'leaflet';
import {ServicesSocketService} from '../../services/services-socket.service';
import {ServicesGeolocationService} from '../../services/services-geolocation.service';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  public mapa: L.Map | undefined;
  private latitud: number = 0;
  private longitud: number = 0;

  constructor(
    private serviceSocket: ServicesSocketService,
    private servicesGeolocation: ServicesGeolocationService
  ) {
  }

  ngOnInit() {
    this.initMap();
    this.serviceSocket.obtenerRespuesta().subscribe((data: GeolocationPosition) => {
      console.log('Mensaje => ', data);
    });
    this.obtenerGeolocalizacion();
  }

  private obtenerGeolocalizacion() {
    this.servicesGeolocation.obtenerGeolocalizacionEnTiempoReal().subscribe((data: { coords: { latitude: number; longitude: number; }; }) => {
      this.latitud = data.coords.latitude;
      this.longitud = data.coords.longitude;
      if (this.mapa) {
        L.marker([this.latitud, this.longitud]).addTo(this.mapa);
      }
      else console.log('El mapa no se ha inicializado aún');
    });
  }

  private initMap() {
    this.mapa = L.map("map").setView([5.53528, -73.36778], 15);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?", {}).addTo(this.mapa);
  }

  enviarMensaje(mensaje: string): void {
    this.serviceSocket.enviarMensaje(mensaje);
  }
}
