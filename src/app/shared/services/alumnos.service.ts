import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Alumno } from '../models/alumno';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlumnosService {

  private baseUrl = "http://localhost:8080/alumnos";
constructor(private http: HttpClient) { }

getAlumno(id: number): Observable<Alumno>{
  return this.http.get<Alumno>(this.baseUrl+'/'+id);
}

createAlumno(alumno: Alumno) : Observable<Alumno>{

  return this.http.post<Alumno>(`${this.baseUrl}`,alumno );  /* .pipe(
 tap({
      error: e => this.handlerror(e)
    })) */
}


update(alumno: Alumno): Observable<Alumno>{
  return this.http.put<Alumno>(`${this.baseUrl}/${alumno.id}`,alumno)/*.pipe(
    tap({
      error: e => this.handlerror(e)
    })) */}


deleteAlumno(id: number): Observable<Alumno>{
  return this.http.delete<Alumno>(this.baseUrl+'/'+id/*`${this.baseUrl}/${id}`*/)}









}
