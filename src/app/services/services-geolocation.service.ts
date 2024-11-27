import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ServicesGeolocationService {

  constructor() { }

  obtenerLocalizacionLocal(): Observable<GeolocationPosition> {
    return new Observable((observer) => {
      const watchId = navigator.geolocation.watchPosition(
        (position: GeolocationPosition) => {
          observer.next(position);
        },
        (err: GeolocationPositionError) => {
          observer.error(err);
        }
      );

      return {
        unsubscribe() {
          navigator.geolocation.clearWatch(watchId);
        }
      };
    });
  }
}
