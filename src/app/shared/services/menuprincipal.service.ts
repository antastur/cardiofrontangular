import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Equipo } from '../models/equipo';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuprincipalService {

  private baseUrl = "http://localhost:8080/menuPrincipal";
constructor(private http: HttpClient) { }


getEquipos(): Observable<Equipo[]>{
  return this.http.get<Equipo[]>(this.baseUrl);
}

}
