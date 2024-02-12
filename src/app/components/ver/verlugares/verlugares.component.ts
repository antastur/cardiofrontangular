import { IdClienteparaespaciosService } from './../../../shared/services/data/idClienteparaespacios.service';
import { ActivatedRoute, Router } from '@angular/router';
import { EquiposService } from './../../../shared/services/equipos.service';
import { Component, Input, OnInit } from '@angular/core';
import { Equipo } from 'src/app/shared/models/equipo';
import { Espacio } from 'src/app/shared/models/espacio';
import { Lugar } from 'src/app/shared/models/lugar';
import { EspaciosService } from 'src/app/shared/services/espacios.service';
import { Vehiculo } from 'src/app/shared/models/vehiculo';

@Component({
  selector: 'app-verlugares',
  templateUrl: './verlugares.component.html',
  styleUrls: ['./verlugares.component.css']
})
export class VerlugaresComponent implements OnInit {

  //@Input()lugaresHijo!: Lugar[];
  @Input()equipoHijo!: Equipo;
  @Input() espacioHijo!: Espacio;
  @Input() marcadorHijo!:Boolean;
  espacio!: Espacio;

  lugares!: Lugar[];
  idCliente!: number;


 //Constructor
 constructor(public $espaciosService: EspaciosService,public $idCliente: IdClienteparaespaciosService, private router: Router,private activatedRoute: ActivatedRoute){

 }


  ngOnInit(): void {
    this.espacio=new Espacio();
    this.equipoHijo=new Equipo();
    this.espacioHijo=new Espacio();
    this.$idCliente.getidCliente().subscribe(a=>this.idCliente=a).unsubscribe;
    this.cargar();
}


cargar():void{
  this.activatedRoute.params.subscribe(
    a=>{
      let id=a['id'];
      if(id){

        this.$espaciosService.getLugaresUnEspacio(id).subscribe(
          al => this.lugares = al).unsubscribe;

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



crearLugar(){

}


updateLugar(id: number){

}



deleteLugar(id: number){

console.log("espacio "+this.espacioHijo.direccion);

}

}
