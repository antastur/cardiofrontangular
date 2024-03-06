import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Vehiculo } from '../models/vehiculo';

@Injectable({
  providedIn: 'root'
})
//Servicio para establecer enpoints y los metodos para obtener los objetos desde el server
export class VehiculosService {

  private baseUrl = "http://localhost:8080/cardio/menuPrincipal/vehiculos";

constructor(private http: HttpClient) { }


//Para obtener un vehiculo
getVehiculo(id: number): Observable<Vehiculo>{
  return this.http.get<Vehiculo>(this.baseUrl+'/'+id);
}

//Para crear un vehiculo
createVehiculo(vehiculo: Vehiculo) : Observable<Vehiculo>{

  return this.http.post<Vehiculo>(`${this.baseUrl}`,vehiculo);

}

//Para actualizar un vehiculo
updateVehiculo(vehiculo: Vehiculo): Observable<Vehiculo>{
  return this.http.put<Vehiculo>(`${this.baseUrl}/${vehiculo.id}`,vehiculo)/*.pipe(
    tap({
      error: e => this.handlerror(e)
    })) */}




}
