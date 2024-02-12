import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Curso } from '../models/curso';
import { Observable } from 'rxjs';
import { Formacion } from '../models/formacion';

@Injectable({
  providedIn: 'root'
})
export class CursosService {

  private baseUrl =  "http://localhost:8080/cardio/menuPrincipal/cursos";
  private baseUrl2 ="http://localhost:8080/cardio/menuPrincipal/cursos/formaciones"
  constructor(private http: HttpClient) { }

  getCursos(): Observable<Curso[]>{
    return this.http.get<Curso[]>(this.baseUrl);
  }


  getCurso(id: number): Observable<Curso>{
    return this.http.get<Curso>(this.baseUrl+'/'+id);
  }

  getFormacionesUnCurso(id: number): Observable<Formacion[]> {
    return this.http.get<Formacion[]>(this.baseUrl2 + '/' + id);
  }


  createCurso(curso: Curso) : Observable<Curso>{

    return this.http.post<Curso>(`${this.baseUrl}`,curso );  /* .pipe(
   tap({
        error: e => this.handlerror(e)
      })) */
  }

  updateCurso(curso: Curso): Observable<Curso>{
    return this.http.put<Curso>(`${this.baseUrl}/${curso.id}`,curso)/*.pipe(
      tap({
        error: e => this.handlerror(e)
      })) */}



  deleteCurso(id: number): Observable<Curso>{
        return this.http.delete<Curso>(this.baseUrl+'/'+id/*`${this.baseUrl}/${id}`*/)}


}
