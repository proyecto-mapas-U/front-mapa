import {AfterViewInit, Component, ViewChild} from '@angular/core';
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
export class MapOverviewComponent implements AfterViewInit {

  @ViewChild("map")
  public map!: IgxGeographicMapComponent;

  constructor(){}

  ngAfterViewInit() {
    this.map.windowRect = { left: 0.2, top: 0.1, width: 0.7, height: 0.7 };
  }

}
