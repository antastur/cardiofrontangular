import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Lugar } from '../models/lugar';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LugaresService {

private baseUrl = "http://localhost:8080/cardio/menuPrincipal/lugares";

constructor(private http: HttpClient) { }



getLugar(id: number): Observable<Lugar>{
  return this.http.get<Lugar>(this.baseUrl+'/'+id);
}


createLugar(lugar: Lugar) : Observable<Lugar>{

  return this.http.post<Lugar>(`${this.baseUrl}`,lugar);

}


updateLugar(lugar: Lugar): Observable<Lugar>{
  return this.http.put<Lugar>(`${this.baseUrl}/${lugar.id}`,lugar)/*.pipe(
    tap({
      error: e => this.handlerror(e)
    })) */}



deleteLugar(id: number): Observable<Lugar>{
      return this.http.delete<Lugar>(this.baseUrl+'/'+id/*`${this.baseUrl}/${id}`*/)}









}
