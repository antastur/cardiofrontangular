import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../models/curso';
import { Observable } from 'rxjs';
import { Formacion } from '../models/formacion';

@Injectable({
  providedIn: 'root'
})
//Servicio para establecer enpoints y los metodos para obtener los objetos desde el server
export class CursosService {

  private baseUrl =  "http://localhost:8080/cardio/menuPrincipal/cursos";
  private baseUrl2 ="http://localhost:8080/cardio/menuPrincipal/cursos/formaciones"
  constructor(private http: HttpClient) { }

  //Para obtener una lista de cursos
  getCursos(): Observable<Curso[]>{
    return this.http.get<Curso[]>(this.baseUrl);
  }

  //Para obtener un curso
  getCurso(id: number): Observable<Curso>{
    return this.http.get<Curso>(this.baseUrl+'/'+id);
  }
  //Para obtener las formaciones de un curso
  getFormacionesUnCurso(id: number): Observable<Formacion[]> {
    return this.http.get<Formacion[]>(this.baseUrl2 + '/' + id);
  }

  //Para crear un curso
  createCurso(curso: Curso) : Observable<Curso>{

    return this.http.post<Curso>(`${this.baseUrl}`,curso );  /* .pipe(
   tap({
        error: e => this.handlerror(e)
      })) */
  }

  //Para modificar un curso
  updateCurso(curso: Curso): Observable<Curso>{
    return this.http.put<Curso>(`${this.baseUrl}/${curso.id}`,curso)/*.pipe(
      tap({
        error: e => this.handlerror(e)
      })) */}


  //Para borrar un curso
  deleteCurso(id: number): Observable<Curso>{
        return this.http.delete<Curso>(this.baseUrl+'/'+id/*`${this.baseUrl}/${id}`*/)}


}
