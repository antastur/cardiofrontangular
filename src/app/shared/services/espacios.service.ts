import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Espacio } from '../models/espacio';
import { Lugar } from '../models/lugar';
import { Vehiculo } from '../models/vehiculo';

@Injectable({
  providedIn: 'root'
})

//Servicio para establecer enpoints y los metodos para obtener los objetos desde el server
export class EspaciosService {

  private baseUrl = "http://localhost:8080/cardio/menuPrincipal/espacios";

  private baseUrl2 = "http://localhost:8080/cardio/menuPrincipal/espacios/lugares";

  private baseUrl3 = "http://localhost:8080/cardio/menuPrincipal/espacios/vehiculos";

  private baseUrl4="http://localhost:8080/cardio/menuPrincipal/espacios/edit";

 //Constructor
  constructor(private http: HttpClient) { }
  //Para recibir lista de espacios
  getEspacios(): Observable<Espacio[]>{
    return this.http.get<Espacio[]>(this.baseUrl);
  }

  //Para recibir un espacio
  getEspacio(id: number): Observable<Espacio>{
    return this.http.get<Espacio>(this.baseUrl+'/'+id);
  }

  //Para obtener los lugars de un espacio
  getLugaresUnEspacio(id: number): Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.baseUrl2 + '/' + id);
  }

  //Para obtener los vehiculos de un espacio
  getVehiculosUnEspacio(id: number): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.baseUrl3 + '/' + id);
  }

  //Para crear un espacio
  createEspacio(espacio: Espacio) : Observable<Espacio>{

    return this.http.post<Espacio>(`${this.baseUrl}`,espacio );  /* .pipe(
   tap({
        error: e => this.handlerror(e)
      })) */
  }

  //Para actualizar un espacio
  updateEspacio(espacio: Espacio): Observable<Espacio>{
    return this.http.put<Espacio>(`${this.baseUrl4}/${espacio.id}`,espacio)/*.pipe(
      tap({
        error: e => this.handlerror(e)
      })) */}


  //Para borrar un espacio
  deleteEspacio(id: number): Observable<Espacio>{
        return this.http.delete<Espacio>(this.baseUrl+'/'+id/*`${this.baseUrl}/${id}`*/)}



}
