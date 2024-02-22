import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from 'src/app/shared/models/equipo';
import { EquiposService } from 'src/app/shared/services/equipos.service';

@Component({
  selector: 'app-consultaEquipos',
  templateUrl: './consultaEquipos.component.html',
  styleUrls: ['./consultaEquipos.component.css']
})
export class ConsultaEquiposComponent implements OnInit {

  //Equipo que se elige par ir a modificarlo
  equipoElegido!: Equipo;
  //Lista de equipos totales
  equiposTot!: Equipo[];
//Lista de equipos disponibles
  equiposDisp!: Equipo[];
 //Lista de equipos exteriores
  equiposExt!: Equipo[];
 //Lista de equipos utilizados
  equiposUsad!: Equipo[];
  //Lista de equipos que caducan en 1 año
  equiposCad!: Equipo[];



  //constructor
  constructor(public equiposService: EquiposService,public router: Router,private activatedRoute: ActivatedRoute) {
  }


  ngOnInit() {

    this.equiposTot=[];
    this.equiposDisp=[];
    this.equiposExt=[];
    this.equiposUsad=[];
    this.equiposCad=[];
    this.equipoElegido=new Equipo();
    this.equiposService.getEquipos().subscribe(e=>this.equiposTot=e);
    this.equiposService.getEquiposNoAsignados().subscribe(e=>this.equiposDisp=e);
    this.equiposService.getEquiposUsados().subscribe(e=>this.equiposUsad=e);
    this.equiposService.getEquiposExterior().subscribe(e=>this.equiposExt=e);
    this.equiposService.getEquiposCaducos().subscribe(e=>this.equiposCad=e);

  }



  irModificarEquipo(){
    if(this.equipoElegido.id>0){
      this.router.navigateByUrl('/cardio/menuPrincipal/equipos/edit/'+this.equipoElegido.id);

  }
}

irMenuPrincipal(){
  this.router.navigateByUrl('/cardio/menuPrincipal');

}




}
