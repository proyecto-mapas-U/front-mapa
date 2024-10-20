import {Component, OnInit} from '@angular/core';
import L from 'leaflet';
import {ServicesSocketService} from '../../services/services-socket.service';
import {ServicesGeolocationService} from '../../services/services-geolocation.service';

// Define la ruta de los iconos manualmente
const iconDefault = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41], // tamaño del icono
  iconAnchor: [12, 41], // punto donde se ancla el icono en el mapa
  popupAnchor: [1, -34], // punto donde se abrirá el popup relativo al icono
  shadowSize: [41, 41]  // tamaño de la sombra del icono
});

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
    setInterval(() => this.obtenerGeolocalizacion(), 5000);
  }

  private obtenerGeolocalizacion() {
    this.servicesGeolocation.obtenerGeolocalizacionEnTiempoReal().subscribe((data: { coords: { latitude: number; longitude: number; }; }) => {
      this.latitud = data.coords.latitude;
      this.longitud = data.coords.longitude;
      if (this.mapa) {
        // centra el mapa en la posicion actual del usuario
        this.mapa.panTo([this.latitud, this.longitud]);
        L.marker([this.latitud, this.longitud], {icon: iconDefault}).addTo(this.mapa);
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
