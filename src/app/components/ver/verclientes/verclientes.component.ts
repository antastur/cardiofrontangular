import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/shared/models/cliente';
import { Curso } from 'src/app/shared/models/curso';
import { Espacio } from 'src/app/shared/models/espacio';
import { ClientesService } from 'src/app/shared/services/clientes.service';

@Component({
  selector: 'app-verclientes',
  templateUrl: './verclientes.component.html',
  styleUrls: ['./verclientes.component.css']
})
export class VerclientesComponent implements OnInit ,OnDestroy{

      //Declaracion de variables

      clientes!: Cliente[];
      $clientesSubscription!: Subscription;

      //Constructor en el que se inyecta el servicio para operar con clientes de BD : listar y borrar
      constructor(public $clientesServicio: ClientesService,private router: Router){

      }


      ngOnInit(): void {

        //se cargan todos los clientes de BD
        this.reloadData();
    }

      //Se traen todos los clientes con el servicio y se asignan a un objeto Subscription para poder desuscribirlo en el hook OnDestroy
      reloadData(){
        this.$clientesSubscription=this.$clientesServicio
                                       .getClientes().subscribe(e=>this.clientes=e);
    }


      //Metodo para borrar un cliente de BD
      deleteCliente(cliente: Cliente):void{
        //llamando al metodo borrar del servicio y asignandolo a objeto subscription
        this.$clientesSubscription=this.$clientesServicio
                                        .deleteCliente(cliente.id).subscribe(
                                               res =>this.$clientesServicio.getClientes().subscribe(
                                                                                                response=>this.clientes=response
                                                                                              ));

          }


          //En metodo OnDestroy se desubscriben los servicios para optimizar recursos e impedir interferencias con otros componentes
          ngOnDestroy(): void {

            if(this.$clientesSubscription){

              this.$clientesSubscription.unsubscribe;
            }
          }

}
