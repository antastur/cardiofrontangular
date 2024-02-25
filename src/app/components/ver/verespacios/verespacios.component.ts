import { IdClienteparaespaciosService } from '../../../shared/data/idClienteparaespacios.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Espacio } from 'src/app/shared/models/espacio';
import { ClientesService } from 'src/app/shared/services/clientes.service';


@Component({
  selector: 'app-verespacios',
  templateUrl: './verespacios.component.html',
  styleUrls: ['./verespacios.component.css']
})
export class VerespaciosComponent implements OnInit,OnDestroy{

  //Declaracion de la variable que tendra la lista de espacios de un cliente
  espacios!: Espacio[];

  subscription!: Subscription;

  //Constructor
  constructor(public $idCliente: IdClienteparaespaciosService, public $clienteServicio: ClientesService,
                private router: Router,private activatedRoute: ActivatedRoute){
                 }



  ngOnInit(): void {
      this.cargar();
   }

  //Metodo que redirecciona a un cliente en particular o deja uno vacio
  cargar():void{
    this.subscription= this.activatedRoute.params.subscribe(
      a=>{
        let id=a['id'];
        if(id){
          //Se usa el parametro id de la url para guardar la id del cliente del que se buscan sus espacios
              //se listan y se guarda en el servicio de datos para poder volver desde la vista de la lista de espacios

         this.subscription= this.$clienteServicio.getEspaciosUnCliente(id).subscribe(

             as=>this.espacios=as
          );

         this.$idCliente.setIdCliente(id);

        }
      })}


      ngOnDestroy(): void {
        this.subscription.unsubscribe();
      }



}
