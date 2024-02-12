import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from '../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
export class VehiculosService {

  private baseUrl = "http://localhost:8080/cardio/menuPrincipal/vehiculos";

constructor(private http: HttpClient) { }



getVehiculo(id: number): Observable<Vehiculo>{
  return this.http.get<Vehiculo>(this.baseUrl+'/'+id);
}

createVehiculo(vehiculo: Vehiculo) : Observable<Vehiculo>{

  return this.http.post<Vehiculo>(`${this.baseUrl}`,vehiculo);

}


updateVehiculo(vehiculo: Vehiculo): Observable<Vehiculo>{
  return this.http.put<Vehiculo>(`${this.baseUrl}/${vehiculo.id}`,vehiculo)/*.pipe(
    tap({
      error: e => this.handlerror(e)
    })) */}




}
