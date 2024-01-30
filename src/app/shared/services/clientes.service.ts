import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {


private baseUrl =  "http://localhost:8080/cardio/menuPrincipal/clientes";

constructor(private http: HttpClient) { }

getClientes(): Observable<Cliente[]>{
  return this.http.get<Cliente[]>(this.baseUrl);
}


getEquipo(id: number): Observable<Cliente>{
  return this.http.get<Cliente>(this.baseUrl+'/'+id);
}


createCliente(cliente: Cliente) : Observable<Cliente>{

  return this.http.post<Cliente>(`${this.baseUrl}`,cliente );  /* .pipe(
 tap({
      error: e => this.handlerror(e)
    })) */
}


updateCliente(cliente: Cliente): Observable<Cliente>{
  return this.http.put<Cliente>(`${this.baseUrl}/${cliente.id}`,cliente)/*.pipe(
    tap({
      error: e => this.handlerror(e)
    })) */}



deleteCliente(id: number): Observable<Cliente>{
      return this.http.delete<Cliente>(this.baseUrl+'/'+id/*`${this.baseUrl}/${id}`*/)}




}
