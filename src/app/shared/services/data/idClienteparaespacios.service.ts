import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
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
