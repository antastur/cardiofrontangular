import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
//Metodo en el que guardar y del que obtener el ud de un cliente desde componentes que no sean ni hijos ni padres
export class IdClienteparaespaciosService {


  private idCliente: BehaviorSubject<number>=new BehaviorSubject(0);

constructor() { }

public getidCliente(){

  return this.idCliente.asObservable();
}


public setIdCliente(idCliente: number): void{
  this.idCliente.next(idCliente);
 }

}
