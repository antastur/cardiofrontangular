import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Cliente } from '../../models/cliente';
import { Equipo } from '../../models/equipo';
import { Espacio } from '../../models/espacio';

@Injectable({
  providedIn: 'root'
})
export class ClienteidService {

   private cliente=new Cliente();
   private clienteSource: BehaviorSubject<Cliente> =new BehaviorSubject<Cliente>(this.cliente);

   private equipo=new Equipo();
   private equipoSource: BehaviorSubject<Equipo> =new BehaviorSubject<Equipo>(this.equipo);

   private espacio=new Espacio();
   private espacioSource: BehaviorSubject<Espacio> =new BehaviorSubject<Espacio>(this.espacio);

   constructor() {

    }

   getClienteObservable(){
    return this.clienteSource.asObservable();
   }


   setClienteObservable(cliente: Cliente=this.cliente):void{
    this.clienteSource.next(cliente=null? this.cliente : cliente);
   }


   getEquipoObservable(){
    return this.equipoSource.asObservable();
   }


   setEquipoObservable(equipo: Equipo=this.equipo):void{
    this.equipoSource.next(equipo=null? this.equipo : equipo);
   }


   getEspacioObservable(){
    return this.espacioSource.asObservable();
   }


   setEspacioObservable(espacio: Espacio=this.espacio):void{
    this.espacioSource.next(espacio=null? this.espacio : espacio);
   }

}
