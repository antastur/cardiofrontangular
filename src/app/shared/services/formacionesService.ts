import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Formacion } from '../models/formacion';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FormacionesService {

  private baseUrl = "http://localhost:8080/cardio/menuPrincipal/clientes/formaciones";
  private baseUrl2 ="http://localhost:8080/cardio/menuPrincipal/cursos/alumnos"

constructor(private http: HttpClient) { }

getFormaciones(): Observable<Formacion[]>{
  return this.http.get<Formacion[]>(this.baseUrl);
}


getFormacion(id: number): Observable<Formacion>{
  return this.http.get<Formacion>(this.baseUrl+'/'+id);
}

getAlumnosUnaFormacion(id: number): Observable<Formacion[]> {
  return this.http.get<Formacion[]>(this.baseUrl2 + '/' + id);
}


createFormacion(formacion: Formacion) : Observable<Formacion>{

  return this.http.post<Formacion>(`${this.baseUrl}`,formacion );  /* .pipe(
 tap({
      error: e => this.handlerror(e)
    })) */
}


updateFormacion(formacion: Formacion): Observable<Formacion>{
  return this.http.put<Formacion>(`${this.baseUrl}/${formacion.id}`,formacion)/*.pipe(
    tap({
      error: e => this.handlerror(e)
    })) */}



deleteCurso(id: number): Observable<Formacion>{
      return this.http.delete<Formacion>(this.baseUrl+'/'+id/*`${this.baseUrl}/${id}`*/)}


}
