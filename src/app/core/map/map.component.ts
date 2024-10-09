import {Component, OnInit} from '@angular/core';
import L from 'leaflet';

@Component({
  selector: 'app-map',
  standalone: true,
  imports: [],
  templateUrl: './map.component.html',
  styleUrl: './map.component.css'
})
export class MapComponent implements OnInit {

  public mapa: L.Map | undefined;
  constructor() {
  }

  ngOnInit() {
    this.initMap();
  }

  private initMap() {
    this.mapa = L.map("map").setView([5.53528, -73.36778], 15);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png?", {}).addTo(this.mapa);
  }
}
