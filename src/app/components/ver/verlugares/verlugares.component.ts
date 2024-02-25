import { LugaresService } from './../../../shared/services/lugares.service';
import { IdClienteparaespaciosService } from '../../../shared/data/idClienteparaespacios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EquiposService } from './../../../shared/services/equipos.service';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Equipo } from 'src/app/shared/models/equipo';
import { Espacio } from 'src/app/shared/models/espacio';
import { Lugar } from 'src/app/shared/models/lugar';
import { EspaciosService } from 'src/app/shared/services/espacios.service';
import { Vehiculo } from 'src/app/shared/models/vehiculo';
import { ClienteidService } from 'src/app/shared/data/clienteid.service';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-verlugares',
  templateUrl: './verlugares.component.html',
  styleUrls: ['./verlugares.component.css']
})
export class VerlugaresComponent implements OnInit,OnDestroy {

  //@Input()lugaresHijo!: Lugar[];
  @Input()equipoHijo!: Equipo;
  @Input() espacioHijo!: Espacio;
  @Input() marcadorHijo!:Boolean;
  espacio!: Espacio;
  equipo!: Equipo;
  lugares!: Lugar[];
  idCliente!: number;
  vehiculo!: Vehiculo;
  lugar!: Lugar;
  subscription!: Subscription;

 //Constructor
 constructor(public $espaciosService: EspaciosService,public $idCliente: IdClienteparaespaciosService,public $clienteID: ClienteidService,
                             public $lugaresService: LugaresService,public $equiposService: EquiposService,
                                      private router: Router,private activatedRoute: ActivatedRoute,private toastrService: ToastrService){

 }


  ngOnInit(): void {
    this.lugar=new Lugar();
    this.vehiculo=new Vehiculo();
    this.equipo=new Equipo();
    this.espacio=new Espacio();
    this.equipoHijo=new Equipo();
    this.espacioHijo=new Espacio();
    this.subscription=this.$idCliente.getidCliente().subscribe(a=>this.idCliente=a);
    this.cargar();
}


cargar():void{
  this.subscription=this.activatedRoute.params.subscribe(
    a=>{
      let id=a['id'];
      if(id){

       // this.$espaciosService.getVehiculosUnEspacio(id).subscribe(
         // al => this.vehiculos = al).unsubscribe;
        this.subscription=this.$espaciosService.getLugaresUnEspacio(id).subscribe(
         al => this.lugares = al);


          /*  this.clienteServicio.getCliente(id).subscribe(
          as=>this.cliente=as
        ); */

      }else{



        /* this.$espaciosService.getEspacio(id).subscribe(a=>this.espacio=a);
        this.$espaciosService.getLugaresUnEspacio(this.espacioHijo.id).subscribe(
          al => this.lugares = al); */
      }
    })}

volveraEspacio(){
  this.marcadorHijo=false;
  this.router.navigateByUrl('/cardio/menuPrincipal/espacios/'+this.idCliente);

}


volveraInicio(){
  this.marcadorHijo=false;
  this.router.navigateByUrl('/cardio/menuPrincipal');

}



updateLugar(lugar: Lugar){

  this.router.navigateByUrl('/cardio/menuPrincipal/lugares/edit/'+lugar.id+'');
}



deleteLugar(lugar: Lugar){
    if(lugar.equipo){
    this.equipoHijo=lugar.equipo;
    this.equipoHijo.asignado=false;
    this.subscription=this.$equiposService.update(this.equipoHijo).subscribe();}
    this.subscription=this.$lugaresService.deleteLugar(lugar.id).subscribe(()=>{
      this.toastrService.success("Acción realizada")});
    }


asignarEquipo(lugar: Lugar){

                   if(lugar.equipo){



                            lugar.equipo.asignado=false;
                            this.subscription=this.$equiposService.update(lugar.equipo).subscribe();
                            lugar.espacio=this.espacioHijo;
                            console.log("lugar.equipo "+lugar.equipo.marca)
                            lugar.equipo=this.lugar.equipo;
                            // console.log("lugar.equipo "+lugar.equipo.marca)
                            this.subscription=this.$lugaresService.updateLugar(lugar).subscribe();
                            this.$clienteID.setEquipoObservable(undefined);

                            this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/'+this.espacioHijo.id+'');
                   } else {

                        if(this.equipoHijo.id){


                            this.equipoHijo.asignado=true;
                            lugar.equipo=this.equipoHijo;
                            lugar.espacio=this.espacioHijo;
                            this.subscription=this.$equiposService.update(lugar.equipo).subscribe();
                            this.subscription=this.$lugaresService.updateLugar(lugar).subscribe();
                            this.equipoHijo==null;
                            this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/'+this.espacioHijo.id+'');


                         }else{

                            console.log("Has de asignar un equipo");

              }


                    }

    }



    ngOnDestroy(): void {
      this.subscription.unsubscribe();
    }








   /* else{
      console.log("prueba1");

       if(!lugar.matricula){

      if(this.equipoHijo.id){


              this.equipoHijo.asignado=true;
              lugar.equipo=this.equipoHijo;
              lugar.espacio=this.espacioHijo;
              this.$equiposService.update(lugar.equipo).subscribe().unsubscribe;
              this.$lugaresService.updateLugar(lugar).subscribe().unsubscribe;


      }else{

        console.log("Has de asignar un equipo");

      }
    }


    if(lugar.matricula){

      if(this.equipoHijo.id){


              this.equipoHijo.asignado=true;
              this.vehiculo.equipo=this.equipoHijo;
              this.vehiculo.espacio=this.espacioHijo;
              this.vehiculo.id=lugar.id;
              this.vehiculo.marca=lugar.marca;
              this.vehiculo.matricula=lugar.matricula;
              this.vehiculo.modelo=lugar.modelo;
              this.vehiculo.telefono=lugar.telefono;
              this.vehiculo.ubicacion=lugar.ubicacion;
              this.$equiposService.update(this.vehiculo.equipo).subscribe().unsubscribe;
              this.$lugaresService.updateLugar(lugar).subscribe().unsubscribe;


      }else{

        console.log("Has de asignar un equipo");

    }

    } */













   /*   if(this.equipoHijo.id){

            if(!lugar.equipo){

              this.equipoHijo.asignado=true;
              lugar.equipo=this.equipoHijo;
              lugar.espacio=this.espacioHijo;
              this.$equiposService.update(lugar.equipo).subscribe().unsubscribe;
              this.$lugaresService.updateLugar(lugar).subscribe().unsubscribe;

            }

            if(lugar.equipo){

              lugar.equipo.asignado=false;
              this.$equiposService.update(lugar.equipo).subscribe().unsubscribe;
              this.equipoHijo.asignado=true;
              this.$equiposService.update(this.equipoHijo).subscribe().unsubscribe;
              lugar.equipo=this.equipoHijo;
              lugar.espacio=this.espacioHijo;
              this.$lugaresService.updateLugar(lugar).subscribe().unsubscribe;
          }

        }else{
          console.log("Has de asignar un equipo");
        }

}
*/

}

