
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

  @Input() espacioHijo!: Espacio;
  desdeCrearEquipo!:Equipo;
  @Input() marcadorHijo!:Boolean;
  marcador!: Boolean;
  marcadorEquipo!: Boolean;
  equipoSelected!: Equipo;
  idEspacio!:number;
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


  ngOnInit(): void {
    this.marcador=true;
    this.ocultarVolver();
    this.lugar=new Lugar();
    this.vehiculo=new Vehiculo();
    this.equipo=new Equipo();
    this.espacio=new Espacio();
    this.equipoSelected=new Equipo();
    this.espacioHijo=new Espacio();
    this.desdeCrearEquipo=new Equipo;
    this.marcadorEquipo=true;


    this.cargar();
}


cargar():void{
  this.subscription=this.activatedRoute.params.subscribe(
    a=>{
      let id=a['id'];
      if(id){

        this.idEspacio=id;
        this.subscription=this.$idCliente.getidCliente().subscribe(a=>this.idCliente=a);
        this.subscription=this.$espaciosService.getLugaresUnEspacio(id).subscribe(
         al => this.lugares = al);
         this.subscription=this.$clienteID.getEquipoObservable().subscribe(a=>this.desdeCrearEquipo=a);
         this.getEquiposDisponibles();
       }else{

      }
    })}




ocultarVolver(){

  if(this.marcadorHijo==true){
    this.marcador==false;
  }
}



volveraEspacio(){

  this.router.navigateByUrl('/cardio/menuPrincipal/espacios/'+this.idCliente);

}



volveraInicio(){

  this.router.navigateByUrl('/cardio/menuPrincipal');

}



updateLugar(lugar: Lugar){

  this.router.navigateByUrl('/cardio/menuPrincipal/lugares/edit/'+lugar.id+'');
}




deleteLugar(lugar: Lugar){
    if(lugar.equipo){
    this.equipo=lugar.equipo;
    this.equipo.asignado=false;
    this.subscription=this.$equiposService.update(this.equipo).subscribe();}
    this.subscription=this.$lugaresService.deleteLugar(lugar.id).subscribe(()=>{
      this.lugares=this.lugares.filter(a=> a !== lugar);
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

    if(this.equipoSelected.id){


          this.equipoSelected.asignado=true;
          lugar.equipo=this.equipoSelected;
          lugar.espacio=this.espacioHijo;
          this.subscription=this.$equiposService.update(lugar.equipo).subscribe(()=>{
            this.equipoSelected==undefined;
            this.subscription=this.$espaciosService.getLugaresUnEspacio(this.idEspacio).subscribe(
              al => this.lugares = al);
              this.getEquiposDisponibles();
            });
          this.subscription=this.$lugaresService.updateLugar(lugar).subscribe();

    }else{

    console.log("Has de asignar un equipo");
    }


  if(this.desdeCrearEquipo.id){


          this.desdeCrearEquipo.asignado=true;
          lugar.equipo=this.desdeCrearEquipo;
          lugar.espacio=this.espacioHijo;
          this.subscription=this.$equiposService.update(lugar.equipo).subscribe(()=>{
            this.desdeCrearEquipo==undefined;
            this.subscription=this.$espaciosService.getLugaresUnEspacio(this.idEspacio).subscribe(
              al => this.lugares = al);
              this.getEquiposDisponibles();
            });
          this.subscription=this.$lugaresService.updateLugar(lugar).subscribe();
}else{

  console.log("Has de asignar un equipo");

}
}
}




















getEquiposDisponibles(){
  this.subscription=this.$equiposService.getEquiposNoAsignados().subscribe(a => this.equipos = a);
}




    ngOnDestroy(): void {

      this.subscription.unsubscribe();
    }



  }






