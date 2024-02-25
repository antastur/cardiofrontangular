import { ToastrService } from 'ngx-toastr';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Subscription } from 'rxjs';
import { Cliente } from 'src/app/shared/models/cliente';
import { ClientesService } from 'src/app/shared/services/clientes.service';

@Component({
  selector: 'app-verclientes',
  templateUrl: './verclientes.component.html',
  styleUrls: ['./verclientes.component.css']
})
export class VerclientesComponent implements OnInit,OnDestroy {

      //Declaracion de variables
      //La lista de todos los equipos a ver
      clientes!: Cliente[];
      //Creacion de una subscripción para gestionar todas y cerrarlas al salir del componente
      subscription!: Subscription ;

      //Constructor en el que se inyecta el servicio para operar con clientes de BD : listar y borrar
      constructor(public $clientesServicio: ClientesService,private router: Router,private toastrService: ToastrService){

      }




      ngOnInit(): void {

        //se cargan todos los clientes de BD
       //this.subscription=this.$clientesServicio.getClientes().subscribe(e=>this.clientes=e);
        //this.subscription=this.$clientesServicio.refresh$.subscribe(()=>{
        this.reloadData();
       // })
    }

      //Metodo que recarga la lista clientes
      reloadData(): void{
        this.subscription=this.$clientesServicio.getClientes().subscribe(e=>this.clientes=e);

      }

      //Metodo para borrar un cliente de BD
      deleteCliente(cliente: Cliente):void{
        //llamando al metodo borrar del servicio y asignandolo a objeto subscription
        this.subscription=this.$clientesServicio.deleteCliente(cliente.id).subscribe(()=>{

          this.toastrService.success("Acción realizada");
          });
         this.subscription=this.$clientesServicio.getClientes().subscribe(e=>this.clientes=e);

 }


          ngOnDestroy(): void {
            this.subscription.unsubscribe();
          }


          irACrear(): void{

            this.router.navigateByUrl('/cardio/menuPrincipal/clientes/edit/');
          }



          irAUpdate(numb: number): void{

            this.router.navigateByUrl('/cardio/menuPrincipal/clientes/edit/'+numb);
          }





}
