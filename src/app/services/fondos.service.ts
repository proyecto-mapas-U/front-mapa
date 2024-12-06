import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FondosService {

  constructor() { }
  mostrar: boolean = true;
  imagenfondo: string = 'background-image: url(https://wallpaperaccess.com/full/7130206.jpg); background-size: cover; background-repeat: no-repeat; height: 100vh; width: 100vw;';


  fondo: any[] = [
    {
      url: "background-image: url(https://wallpaperaccess.com/full/7130206.jpg); background-size: cover; background-repeat: no-repeat; height: 100vh; width: 100vw;",
    },
    {
      url: "background-image: url(https://images.unsplash.com/photo-1446776899648-aa78eefe8ed0?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Z29vZ2xlJTIwbWFwJTIwdmlld3xlbnwwfHwwfHx8MA%3D%3D); background-size: cover; background-repeat: no-repeat; height: 100vh; width: 100vw;",
    }
  ]

}
