import { Routes } from '@angular/router';
import {AppComponent} from "./app.component";
import {MapOverviewComponent} from "./core/map-overview/map-overview.component";

export const routes: Routes = [
  {
    path: '',
    component: MapOverviewComponent
  }
];
