import { Routes } from '@angular/router';
import {MapComponent} from "./core/map/map.component";
import {LoginComponent} from "./core/login/login.component";

export const routes: Routes = [
  {
    path: 'mapa',
    component: MapComponent
  },
  {
    path: '',
    component: LoginComponent
  }
];
