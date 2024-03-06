import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../models/alumno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

//Servicio para establecer enpoints y los metodos para obtener los objetos desde el server
export class AlumnosService {

  private baseUrl = "http://localhost:8080/alumnos";
constructor(private http: HttpClient) { }

//Para obtener un alumno
getAlumno(id: number): Observable<Alumno>{
  return this.http.get<Alumno>(this.baseUrl+'/'+id);
}

//Para crear un alumno
createAlumno(alumno: Alumno) : Observable<Alumno>{

  return this.http.post<Alumno>(`${this.baseUrl}`,alumno );  /* .pipe(
 tap({
      error: e => this.handlerror(e)
    })) */
}

//para actualizar un alumno
update(alumno: Alumno): Observable<Alumno>{
  return this.http.put<Alumno>(`${this.baseUrl}/${alumno.id}`,alumno)/*.pipe(
    tap({
      error: e => this.handlerror(e)
    })) */}

//Para borrar un alumno
deleteAlumno(id: number): Observable<Alumno>{
  return this.http.delete<Alumno>(this.baseUrl+'/'+id/*`${this.baseUrl}/${id}`*/)}









}
