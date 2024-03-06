import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cliente } from '../models/cliente';
import { Observable, Subject, tap } from 'rxjs';
import { Espacio } from '../models/espacio';
import { Curso } from '../models/curso';
import { ToastrService } from 'ngx-toastr';
import { ErrorMessage } from '../models/errormessage';

@Injectable({
  providedIn: 'root'
})

export class ClientesService {

  //Se crean constantes con los distintos endpoint que el servicio trabajará
  private baseUrl = "http://localhost:8080/cardio/menuPrincipal/clientes";
  private baseUrl2 = "http://localhost:8080/cardio/menuPrincipal/clientes/espacios";
  private baseUrl3 = "http://localhost:8080/cardio/menuPrincipal/clientes/cursos";

  //Se instancia un observable para refrescar la vista cuando se ejecuten los metodos
  private _refresh$=new Subject<void>();

  //Se inyecta un HttpClient
  constructor(private http: HttpClient) { }

  //Metodo getter del observable
  get refresh$(){
    return this._refresh$;
  }

  //metodo que trae observables de lista de clientes desde el back
  getClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.baseUrl);}

  //Para obtener un cliente
  getCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(this.baseUrl + '/' + id);
  }
  //Para obtener los listados de un cliente
  getEspaciosUnCliente(id: number): Observable<Espacio[]> {
    return this.http.get<Espacio[]>(this.baseUrl2 + '/' + id);
  }
  //Para obtener los cursos de un cliente
  getCursosUnCliente(id: number): Observable<Curso[]>{
    return this.http.get<Curso[]>(this.baseUrl3+'/'+id);
  }

  //Para crear un cliente
  createCliente(cliente: Cliente): Observable<any> {

    return this.http.post<Object>(`${this.baseUrl}`, cliente).pipe(
      tap(()=>{
          this._refresh$.next();
      }
          ))
        }




  //Para modificar un cliente
  updateCliente(cliente: Cliente): Observable<Cliente> {

    return this.http.put<Cliente>(`${this.baseUrl}/${cliente.id}`, cliente).pipe(
      tap(()=>{
          this._refresh$.next();
      }
         ))}


 //Para borrar un cliente
  deleteCliente(id: number): Observable<Cliente> {

    return this.http.delete<Cliente>(this.baseUrl + '/' + id/*`${this.baseUrl}/${id}`*/) /*.pipe(
     tap(() =>{
        this._refresh$.next();

      }
         )) */
  }




}
