import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Equipo } from '../models/equipo';



@Injectable({
  providedIn: 'root'
})
export class EquiposService {

  //Constantes para contener los endpoints que se usarán para comunicarse con el back
  private baseUrl = "http://localhost:8080/cardio/menuPrincipal/equipos";

  private baseUrl2 = "http://localhost:8080/cardio/menuPrincipal/clientes";

  private baseUrl3 = "http://localhost:8080/cardio/menuPrincipal/equipos/asignados";

  private baseUrl4 = "http://localhost:8080/cardio/menuPrincipal/consultas/usados";

  private baseUrl5 = "http://localhost:8080/cardio/menuPrincipal/consultas/exterior";

  private baseUrl6 = "http://localhost:8080/cardio/menuPrincipal/consultas/caducidad";

  private baseUrl7 = "http://localhost:8080/cardio/menuPrincipal/consultas/mantenimiento";


  //Constructor
  constructor(private http: HttpClient) { }

  //Metodo para obtener todos los equipos desde el back
  getEquipos(): Observable<Equipo[]>{
    return this.http.get<Equipo[]>(this.baseUrl);
  }

  //Metodo para obtener los equipos disponibles desde el back
  getEquiposNoAsignados(): Observable<Equipo[]>{
    return this.http.get<Equipo[]>(this.baseUrl3);
  }

  //Metodo para obtener todos los equipos usados desde el back
  getEquiposUsados(): Observable<Equipo[]>{
    return this.http.get<Equipo[]>(this.baseUrl4);
  }

  //Metodo para obtener todos los equipos de exterior desde el back
  getEquiposExterior(): Observable<Equipo[]>{
    return this.http.get<Equipo[]>(this.baseUrl5);
  }

  //Metodo para obtener todos los equipos que caducan antes de 1 año desde el back
  getEquiposCaducos(): Observable<Equipo[]>{
    return this.http.get<Equipo[]>(this.baseUrl6);
  }

   //Metodo para obtener todos los equipos que caducan antes de 1 año desde el back
   getEquiposMantenimiento(): Observable<Equipo[]>{
    return this.http.get<Equipo[]>(this.baseUrl7);
  }



  //Metodo para obtener un equipo por su id desde el back
  getEquipo(id: number): Observable<Equipo>{
    return this.http.get<Equipo>(this.baseUrl+'/'+id);
  }


  //Metodo para mandar un equipo al back para que lo persista
  createEquipo(equipo: Equipo) : Observable<Equipo>{

    return this.http.post<Equipo>(`${this.baseUrl}`,equipo );
  }


  //Metodo para mandar un numero y un equipo al back para que este encuentre el equipo con el
  //id = al numero mandado  y lo persista con los atributos del equipo mandado
  update(equipo: Equipo): Observable<Equipo>{
    return this.http.put<Equipo>(`${this.baseUrl}/${equipo.id}`,equipo)/*.pipe(
      tap({
        error: e => this.handlerror(e)
      })) */}



  //Metodo que manda un numero al back para que este borre de BD el equipo cuya id coincida con el numero
  deleteEquipo(id: number): Observable<Equipo>{
        return this.http.delete<Equipo>(this.baseUrl+'/'+id/*`${this.baseUrl}/${id}`*/)}


}
