import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formacion } from '../models/formacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Servicio para establecer enpoints y los metodos para obtener los objetos desde el server
export class FormacionesService {

  private baseUrl = "http://localhost:8080/cardio/menuPrincipal/clientes/formaciones";
  private baseUrl2 ="http://localhost:8080/cardio/menuPrincipal/cursos/alumnos"

  //Constructor
constructor(private http: HttpClient) { }

//para obtener una lista de formaciones
getFormaciones(): Observable<Formacion[]>{
  return this.http.get<Formacion[]>(this.baseUrl);
}

//Obtener una formacion
getFormacion(id: number): Observable<Formacion>{
  return this.http.get<Formacion>(this.baseUrl+'/'+id);
}

//Para obtener los alumnos de una formacion
getAlumnosUnaFormacion(id: number): Observable<Formacion[]> {
  return this.http.get<Formacion[]>(this.baseUrl2 + '/' + id);
}

//Para crear una formacion
createFormacion(formacion: Formacion) : Observable<Formacion>{

  return this.http.post<Formacion>(`${this.baseUrl}`,formacion );  /* .pipe(
 tap({
      error: e => this.handlerror(e)
    })) */
}

//Para actualizar una formacion
updateFormacion(formacion: Formacion): Observable<Formacion>{
  return this.http.put<Formacion>(`${this.baseUrl}/${formacion.id}`,formacion)/*.pipe(
    tap({
      error: e => this.handlerror(e)
    })) */}


//Para borrar una formacion
deleteFormacion(id: number): Observable<Formacion>{
      return this.http.delete<Formacion>(this.baseUrl+'/'+id/*`${this.baseUrl}/${id}`*/)}


}
