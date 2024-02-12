import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo';
import { Cliente } from '../models/cliente';

@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  private baseUrl = "http://localhost:8080/cardio/menuPrincipal/equipos";

  private baseUrl2 = "http://localhost:8080/cardio/menuPrincipal/clientes";

  private baseUrl3 = "http://localhost:8080/cardio/menuPrincipal/equipos/asignados";

  constructor(private http: HttpClient) { }

  getEquipos(): Observable<Equipo[]>{
    return this.http.get<Equipo[]>(this.baseUrl);
  }


  getEquiposNoAsignados(): Observable<Equipo[]>{
    return this.http.get<Equipo[]>(this.baseUrl3);
  }


  getEquipo(id: number): Observable<Equipo>{
    return this.http.get<Equipo>(this.baseUrl+'/'+id);
  }


  createEquipo(equipo: Equipo) : Observable<Equipo>{

    return this.http.post<Equipo>(`${this.baseUrl}`,equipo );  /* .pipe(
   tap({
        error: e => this.handlerror(e)
      })) */
  }


  update(equipo: Equipo): Observable<Equipo>{
    return this.http.put<Equipo>(`${this.baseUrl}/${equipo.id}`,equipo)/*.pipe(
      tap({
        error: e => this.handlerror(e)
      })) */}



  deleteEquipo(id: number): Observable<Equipo>{
        return this.http.delete<Equipo>(this.baseUrl+'/'+id/*`${this.baseUrl}/${id}`*/)}



  getClientes(): Observable<Cliente[]>{
          return this.http.get<Cliente[]>(this.baseUrl2);
        }




}
