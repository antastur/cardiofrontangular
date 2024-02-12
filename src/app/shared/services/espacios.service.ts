import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Espacio } from '../models/espacio';
import { Lugar } from '../models/lugar';
import { Vehiculo } from '../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class EspaciosService {

  private baseUrl = "http://localhost:8080/cardio/menuPrincipal/espacios";

  private baseUrl2 = "http://localhost:8080/cardio/menuPrincipal/espacios/lugares";

  private baseUrl3 = "http://localhost:8080/cardio/menuPrincipal/espacios/vehiculos";

  private baseUrl4="http://localhost:8080/cardio/menuPrincipal/espacios/edit";


  constructor(private http: HttpClient) { }

  getEspacios(): Observable<Espacio[]>{
    return this.http.get<Espacio[]>(this.baseUrl);
  }


  getEspacio(id: number): Observable<Espacio>{
    return this.http.get<Espacio>(this.baseUrl+'/'+id);
  }


  getLugaresUnEspacio(id: number): Observable<Lugar[]> {
    return this.http.get<Lugar[]>(this.baseUrl2 + '/' + id);
  }

  getVehiculosUnEspacio(id: number): Observable<Vehiculo[]> {
    return this.http.get<Vehiculo[]>(this.baseUrl3 + '/' + id);
  }


  createEspacio(espacio: Espacio) : Observable<Espacio>{

    return this.http.post<Espacio>(`${this.baseUrl}`,espacio );  /* .pipe(
   tap({
        error: e => this.handlerror(e)
      })) */
  }


/*createEspacioUnCliente(espacio: Espacio,id: number){

  return this.http.post<Espacio>(`${this.baseUrl}`+id,espacio );

}
*/




  updateEspacio(espacio: Espacio): Observable<Espacio>{
    return this.http.put<Espacio>(`${this.baseUrl4}/${espacio.id}`,espacio)/*.pipe(
      tap({
        error: e => this.handlerror(e)
      })) */}



  deleteEspacio(id: number): Observable<Espacio>{
        return this.http.delete<Espacio>(this.baseUrl+'/'+id/*`${this.baseUrl}/${id}`*/)}



}
