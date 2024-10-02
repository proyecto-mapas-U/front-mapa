import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {IgxGeographicMapComponent, IgxGeographicMapCoreModule} from "igniteui-angular-maps";

@Component({
  selector: 'app-map-overview',
  standalone: true,
  imports: [
    IgxGeographicMapCoreModule
  ],
  templateUrl: './map-overview.component.html',
  styleUrl: './map-overview.component.css'
})
export class MapOverviewComponent implements AfterViewInit, OnInit {

  @ViewChild("map", {static: true})
  public map!: IgxGeographicMapComponent;

  constructor(){}

  ngOnInit() {
    this.map.zoomToGeographic({
      left: -100,
      top: -10,
      width: 50,
      height: 20
    });
  }

  ngAfterViewInit() {
    this.map.windowRect = { left: 0.2, top: 0.1, width: 0.7, height: 0.7 };
  }

}
