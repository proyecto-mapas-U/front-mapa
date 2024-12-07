import {Component, OnDestroy, OnInit, signal, WritableSignal} from '@angular/core';
import L from 'leaflet';
import {ServicesGeolocationService} from '../../services/services-geolocation.service';
import {CoordenadasService} from '../../services/coordenadas.service';
import {CoordenadasModel} from '../../models/Coordenadas.model';

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
export class MapComponent implements OnInit, OnDestroy {

  public mapa: L.Map | undefined;
  private marker: L.Marker | undefined;
  private latitud: WritableSignal<number> = signal(0);
  private longitud: WritableSignal<number> = signal(0);
  private idUsuario: WritableSignal<number> = signal(0);
  private intervalCoordenadasGlobales!: ReturnType<typeof setInterval>;

  constructor(
    private servicesGeolocation: ServicesGeolocationService,
    private coordenadasService: CoordenadasService,
  ) {
  }

  ngOnInit(): void {
    this.obtenerIdParametros();
    if (this.idUsuario()) {
      this.initMap();
      this.registrarCoordenadas();
      this.initIntervals();
    } else {
      // TODO Manejar Alerta
      console.log('No se proporcionó un id de usuario en la ruta');
    }
  }

  ngOnDestroy(): void {
    this.clearIntervals();
  }

  private initIntervals(): void {
    this.obtenerCoordenadas();
    this.intervalCoordenadasGlobales = setInterval(() => this.obtenerCoordenadas(), 5000);
  }

  private clearIntervals(): void {
    if (this.intervalCoordenadasGlobales)
      clearInterval(this.intervalCoordenadasGlobales);
  }

  /**
   * Método encargado de obtener la ubicación actual del usuario
   * @private
   */
  private obtenerCoordenadasLocales(): void {
    this.servicesGeolocation.obtenerLocalizacionLocal()
      .subscribe((data: { coords: { latitude: number; longitude: number; }; }) => {
        this.latitud.set(data.coords.latitude);
        this.longitud.set(data.coords.longitude);
        this.actualizarCoordenadas();
      });
  }

  private obtenerCoordenadas(): void {
    this.obtenerCoordenadasLocales();
    this.coordenadasService.obtenerCoordenadasGlobales()
      .subscribe((respuesta) => {
        console.log(respuesta);
        if (respuesta.success && this.mapa) {
          this.limpiarMarkers();
          respuesta.data.forEach((coordenada: any) => {
            this.marker = L.marker([coordenada.latitud, coordenada.longitud], {icon: iconDefault}).addTo(this.mapa ?? L.map("map"));
            this.marker.bindPopup(`Latitud: ${coordenada.latitud}, Longitud: ${coordenada.longitud}`);
            // this.marker.openPopup();
          });
        }
      });
  }

  private limpiarMarkers(): void {
    // Clear existing markers from the map
    this.mapa!.eachLayer((layer) => {
      if (layer instanceof L.Marker) {
        this.mapa?.removeLayer(layer);
      }
    });
  }

  private actualizarCoordenadas(): void {
    this.coordenadasService.actualizarCoordenadas(this.construirCoordenadas())
      .subscribe((respuesta) => {
        console.log('actualizarCoordenadas => ', respuesta);
        if (this.marker)
          this.marker.remove();
      })
  }

  /**
   * Método encargado de obtener id del usuario registrado en base de datos
   * @private
   */
  private obtenerIdParametros(): void {
    this.idUsuario.set(localStorage.getItem('id') as unknown as number);
  }

  private registrarCoordenadas(): void {
    this.coordenadasService.verificarCoordenadasUsuario(this.idUsuario())
      .subscribe((respuesta) => {
        if (!respuesta.success) {
          this.coordenadasService.guardarCoordenadas(this.construirCoordenadas());
        }
      });
  }

  private construirCoordenadas(): CoordenadasModel {
    return new CoordenadasModel(this.idUsuario(), this.latitud(), this.longitud());
  }

  private initMap(): void {
    this.mapa = L.map("map").setView([5.53528, -73.36778], 15);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?", {}).addTo(this.mapa);
  }

  centrarUbicacion(): void {
    if (this.mapa)
      // centra el mapa en la posicion actual del usuario
      this.mapa.panTo([this.latitud(), this.longitud()]);
  }

}

