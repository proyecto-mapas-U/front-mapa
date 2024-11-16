import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private API_URL = 'http://localhost/backend-mapa-u/back-mapa/rest';

  constructor(
    private http: HttpClient
  ) { }

  login(username: string, password: string): Observable<any> {
    const body = {username, password};
    return this.http.post<any>(`${this.API_URL}/login.php`, body);
  }
}
