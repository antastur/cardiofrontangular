
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


  //Declaración de las variables necesarias
  //Heredado desde componente padre el espacio al que pertenecen los lugares que se muestran
  @Input() espacioHijo!: Espacio;
  //Marcadores para manejar las vistas
  @Input() marcadorHijo!:Boolean;
  marcador!: Boolean;
  marcadorEquipo!: Boolean;
  //Equipo cargado en servicio datos desde consultar equipos
  desdeCrearEquipo!: Equipo;
  //Equipo seleccionado de los disponibles en select
  equipoSelected!: any;
  //id del espacio actual
  idEspacio!:number;
  //id del cliente para poder volver a el
  idCliente!: number;
  espacio!: Espacio;
  equipo!: Equipo;
  equipos!: Equipo[];
  lugares!: Lugar[];
  vehiculo!: Vehiculo;
  lugar!: Lugar;
  subscription!: Subscription;




 //Constructor
 constructor(private $espaciosService: EspaciosService,private $idCliente: IdClienteparaespaciosService,private $clienteID: ClienteidService,
              private $lugaresService: LugaresService,private $equiposService: EquiposService,
                                      private router: Router,private activatedRoute: ActivatedRoute,private toastrService: ToastrService){

 }

  //Se inician los objetos y se usan los marcadores para tener la vista deseada al abrir el componente
  ngOnInit(): void {
    this.marcador=true;
    this.ocultarVolver();
    this.lugar=new Lugar();
    this.vehiculo=new Vehiculo();
    this.equipo=new Equipo();
    this.espacio=new Espacio();
    this.equipoSelected=null;
    this.espacioHijo=new Espacio();
    this.desdeCrearEquipo=new Equipo();
    this.marcadorEquipo=true;
    this.cargar();
}



//Metodo que redirecciona a un cliente en particular o deja uno vacio
cargar():void{
  this.subscription=this.activatedRoute.params.subscribe(
    a=>{
      let id=a['id'];
      if(id){
        //se guarda el parametro en variable number para tener id del espacio en el que se esta
        this.idEspacio=id;
        //Se obtiene desde el servicio de datos el id del cliente actual
        this.subscription=this.$idCliente.getidCliente().subscribe(a=>this.idCliente=a);
        //Se obtienen los lugares desde BD y se listan en vista
        this.subscription=this.$espaciosService.getLugaresUnEspacio(id).subscribe(
         al => this.lugares = al);
         //Se carga desde servicio de datos posible equipo cargado en consultar equipos
         this.subscription=this.$clienteID.getEquipoObservable().subscribe(a=>this.desdeCrearEquipo=a);
        //Se obtienen de bd los equipos no asignados
         this.getEquiposDisponibles();
       }else{

      }
    })}



//Metodo para ocultar botones y select en vista desde listar espacios
ocultarVolver(){

  if(this.marcadorHijo==true){
    this.marcador==false;
  }
}




//Metodo para retroceder al Espacio
volveraEspacio(){

  this.router.navigateByUrl('/cardio/menuPrincipal/espacios/'+this.idCliente);

}


//Metodo para ir a update lugar
updateLugar(lugar: Lugar){

  this.router.navigateByUrl('/cardio/menuPrincipal/lugares/edit/'+lugar.id);

}


//Metodo para volver a inicio
volveraInicio(){

  this.router.navigateByUrl('/cardio/menuPrincipal');

}


//Metodo para borrar un lugar
deleteLugar(lugar: Lugar){
    if(lugar.equipo){
    this.equipo=lugar.equipo;
    this.equipo.asignado=false;
    this.subscription=this.$equiposService.update(this.equipo).subscribe();}
    this.subscription=this.$lugaresService.deleteLugar(lugar.id).subscribe(()=>{
      this.lugares=this.lugares.filter(a=> a !== lugar);
      this.toastrService.success("Lugar borrado")});
  }




//Metodo para asignar o desasignar un equipo
desasignarEquipo(lugar: Lugar){

  //Si el lugar tiene un equipo se actualiza el equipo a no asignado y se actualiza el lugar sin el
  if(lugar.equipo){

      lugar.equipo.asignado=false;
      this.subscription=this.$equiposService.update(lugar.equipo).subscribe(()=>{
      this.getEquiposDisponibles();
      this.subscription= this.$espaciosService.getLugaresUnEspacio(this.idEspacio).subscribe(
      al => this.lugares = al)

     });
      lugar.espacio=this.espacioHijo;
      lugar.equipo=this.lugar.equipo;
      this.subscription=this.$lugaresService.updateLugar(lugar).subscribe(()=>{
      this.subscription= this.$espaciosService.getLugaresUnEspacio(this.idEspacio).subscribe(
      al => this.lugares = al)

    });

} else {
             //Si se ha recibido un equipo desde consultar equipo se actualiza el equipo a asignado y el lugar con el
             if(this.desdeCrearEquipo.id!==undefined){


              this.desdeCrearEquipo.asignado=true;
              lugar.equipo=this.desdeCrearEquipo;
              lugar.espacio=this.espacioHijo;
              this.subscription=this.$equiposService.update(lugar.equipo).subscribe(()=>{
              this.$clienteID.setEquipoObservable(undefined);
              this.getEquiposDisponibles();

                });
                this.subscription=this.$lugaresService.updateLugar(lugar).subscribe(()=>{

                  this.subscription= this.$espaciosService.getLugaresUnEspacio(this.idEspacio).subscribe(
                    al => this.lugares = al);
                    this.toastrService.success("Equipo asignado");
                });


            }else {

             //si se ha seleccionado un equipo se actualiza el equipo a asignado y el lugar con el
             if(this.equipoSelected){

                                    this.equipoSelected.asignado=true;
                                    lugar.equipo=this.equipoSelected;
                                    lugar.espacio=this.espacioHijo;
                                    this.subscription=this.$equiposService.update(this.equipoSelected).subscribe(()=>{
                                    this.equipoSelected=null;
                                    this.getEquiposDisponibles();
                                    });
                                    this.subscription=this.$lugaresService.updateLugar(lugar).subscribe(()=>{

                                      this.subscription= this.$espaciosService.getLugaresUnEspacio(this.idEspacio).subscribe(
                                        al => this.lugares = al);
                                        this.toastrService.success("Equipo asignado");
                                    });

              //si el lugar no tiene equipo ni recibe ningún otro equipo
              }else{
                    if(this.equipoSelected){
                      this.equipoSelected=null;
                      this.getEquiposDisponibles();
                    }

                    this.toastrService.warning("Has de asignar un equipo");
                  }
               }
             }
     }


//Metodo para rellenar el select con equipos no asignados
getEquiposDisponibles(){
  this.subscription=this.$equiposService.getEquiposNoAsignados().subscribe(a => this.equipos = a);
}


 //Metodo final en el que se cierran laas subscripciones
 ngOnDestroy(): void {

  this.subscription.unsubscribe();
    }

 }






