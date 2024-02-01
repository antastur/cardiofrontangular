import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable } from 'rxjs';
import { Espacio } from '../models/espacio';
import { Curso } from '../models/curso';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {


  private baseUrl = "http://localhost:8080/cardio/menuPrincipal/clientes";
  private baseUrl2 = "http://localhost:8080/cardio/menuPrincipal/clientes/espacios";
  private baseUrl3 = "http://localhost:8080/cardio/menuPrincipal/clientes/espacios";

  constructor(private http: HttpClient) { }

  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);
  }


  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.baseUrl + '/' + id);
  }

  getEspaciosUnCliente(id: number): Observable<Espacio[]> {
    return this.http.get<Espacio[]>(this.baseUrl2 + '/' + id);
  }

  getCursosUnCliente(id: number): Observable<Curso[]>{
    return this.http.get<Curso[]>(this.baseUrl3+'/'+id);
  }

  createCliente(cliente: Cliente): Observable<Cliente> {

    return this.http.post<Cliente>(`${this.baseUrl}`, cliente);  /* .pipe(
 tap({
      error: e => this.handlerror(e)
    })) */
  }


  updateCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.baseUrl}/${cliente.id}`, cliente)/*.pipe(
    tap({
      error: e => this.handlerror(e)
    })) */}



  deleteCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(this.baseUrl + '/' + id/*`${this.baseUrl}/${id}`*/)
  }




}
