import { IdClienteparaespaciosService } from './../../../shared/services/data/idClienteparaespacios.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/shared/models/cliente';
import { Espacio } from 'src/app/shared/models/espacio';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { ClienteidService } from 'src/app/shared/services/data/clienteid.service';
import { EspaciosService } from 'src/app/shared/services/espacios.service';

@Component({
  selector: 'app-verespacios',
  templateUrl: './verespacios.component.html',
  styleUrls: ['./verespacios.component.css']
})
export class VerespaciosComponent implements OnInit,OnDestroy{

  //cliente!: Cliente;
  espacios!: Espacio[];
  $espaciosSubscription!: Subscription;

  //Constructor
  constructor(/*public $clienteid: ClienteidService, */public $idCliente: IdClienteparaespaciosService, public $clienteServicio: ClientesService,private $espacioServicio: EspaciosService,private router: Router,private activatedRoute: ActivatedRoute){


  }


  ngOnInit(): void {
      /*this.cliente=new Cliente();*/
      this.cargar();
    /*  this.$espaciosSubscription=this.$clienteid.getClienteObservable().subscribe(a=>this.cliente=a);*/
  }


  cargar():void{
    this.activatedRoute.params.subscribe(
      a=>{
        let id=a['id'];
        if(id){

          this.$espaciosSubscription=this.$clienteServicio.getEspaciosUnCliente(id).subscribe(

             as=>this.espacios=as
          );

          this.$idCliente.setIdCliente(id);
        /*  this.clienteServicio.getCliente(id).subscribe(
            as=>this.cliente=as
          ); */
        }
      })}



  //Metodo para borrar un equipo
  deleteEspacio(espacio: Espacio):void{

    console.log('borrado');
    console.log(espacio.id);
    this.$espaciosSubscription=this.$espacioServicio.deleteEspacio(espacio.id).subscribe(
      res =>this.$clienteServicio.getEspaciosUnCliente(espacio.id).subscribe(
        response=>this.espacios=response
      ));

      }

      probarIdCliente(){

       /* console.log(this.cliente.nombEmp); */
      }


      ngOnDestroy(): void {
        this.$espaciosSubscription.unsubscribe;
      }


}
