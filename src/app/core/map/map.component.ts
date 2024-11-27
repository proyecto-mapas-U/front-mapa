import {Component, OnInit, signal, WritableSignal} from '@angular/core';
import L from 'leaflet';
import {ServicesSocketService} from '../../services/services-socket.service';
import {ServicesGeolocationService} from '../../services/services-geolocation.service';
import {CoordenadasService} from "../../services/coordenadas.service";
import {CoordenadasModel} from "../../models/Coordenadas.model";

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
  private marker: L.Marker | undefined;

  private latitud: WritableSignal<number> = signal(0);
  private longitud: WritableSignal<number> = signal(0);
  private idUsuario: WritableSignal<number> = signal(0);

  constructor(
    private servicesGeolocation: ServicesGeolocationService,
    private coordenadasService: CoordenadasService
  ) {
  }

  ngOnInit() {
    this.obtenerIdParametros();
    if (this.idUsuario()) {
      this.initMap();
      this.obtenerCoordenadasLocales();
      this.registrarCoordenadas();
      setInterval(() => this.obtenerCoordenadasLocales(), 5000);
      this.obtenerCoordenadasGlobales();
      setInterval(() => this.obtenerCoordenadasGlobales(), 5000);
    } else {
      // TODO Manejar Alerta
      console.log('No se proporcionó un id de usuario en la ruta');
    }
  }

  private obtenerCoordenadasLocales() {
    this.servicesGeolocation.obtenerLocalizacionLocal()
      .subscribe((data: { coords: { latitude: number; longitude: number; }; }) => {
      this.latitud.set(data.coords.latitude);
      this.longitud.set(data.coords.longitude);
      if (this.mapa) {
        if (this.marker)
          this.marker.remove();
        this.marker = L.marker([this.latitud(), this.longitud()], {icon: iconDefault}).addTo(this.mapa);
        this.actualizarCoordenadas();
      }
      else console.log('El mapa no se ha inicializado aún');
    });
  }

  private obtenerCoordenadasGlobales() {
    this.coordenadasService.obtenerCoordenadasGlobales()
      .subscribe((respuesta) => {
        if (respuesta.success && this.mapa) {
          if (this.marker)
            this.marker.remove();
          respuesta.data.forEach((coordenada: any) => {
            L.marker([coordenada.latitud, coordenada.longitud], {icon: iconDefault}).addTo(this.mapa??L.map("map"));
          })
        }
      });
  }

  private actualizarCoordenadas() {
    this.coordenadasService.actualizarCoordenadas(this.construirCoordenadas());
  }

  private obtenerIdParametros(): void {
    const urlParams = new URLSearchParams(window.location.search);
    this.idUsuario.set(Number(urlParams.get('idUsuario')));
  }

  private registrarCoordenadas(): void {
    this.coordenadasService.verificarCoordenadasUsuario(this.idUsuario())
      .subscribe((data) => {
        if (!data.success) {
          this.coordenadasService.guardarCoordenadas(this.construirCoordenadas());
        }
      });
  }

  private construirCoordenadas(): CoordenadasModel {
    return new CoordenadasModel(this.idUsuario(), this.latitud(), this.longitud());
  }

  private initMap() {
    this.mapa = L.map("map").setView([5.53528, -73.36778], 15);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?", {}).addTo(this.mapa);
  }

  centrarUbicacion() {
    if (this.mapa)
      // centra el mapa en la posicion actual del usuario
      this.mapa.panTo([this.latitud(), this.longitud()]);
  }

   public mostrar:boolean = true;


  }

