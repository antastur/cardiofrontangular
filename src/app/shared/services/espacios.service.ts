import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Espacio } from '../models/espacio';

@Injectable({
  providedIn: 'root'
})
export class EspaciosService {

  private baseUrl = "http://localhost:8080/cardio/menuPrincipal/espacios";



  constructor(private http: HttpClient) { }

  getEspacios(): Observable<Espacio[]>{
    return this.http.get<Espacio[]>(this.baseUrl);
  }


  getEspacio(id: number): Observable<Espacio>{
    return this.http.get<Espacio>(this.baseUrl+id);
  }


  createEspacio(espacio: Espacio) : Observable<Espacio>{

    return this.http.post<Espacio>(`${this.baseUrl}`,espacio );  /* .pipe(
   tap({
        error: e => this.handlerror(e)
      })) */
  }


  update(espacio: Espacio): Observable<Espacio>{
    return this.http.put<Espacio>(`${this.baseUrl}/${espacio.id}`,espacio)/*.pipe(
      tap({
        error: e => this.handlerror(e)
      })) */}



  deleteEspacio(id: number): Observable<Espacio>{
        return this.http.delete<Espacio>(this.baseUrl+'/'+id/*`${this.baseUrl}/${id}`*/)}



}
