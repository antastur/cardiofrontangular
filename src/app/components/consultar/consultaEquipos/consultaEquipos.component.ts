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
//Lista de equipos con mantenimiento en 2 meses
equiposMant!: Equipo[];


  //constructor
  constructor(public equiposService: EquiposService,public router: Router,private activatedRoute: ActivatedRoute) {
  }


 //en Método OnInit se inician todas las variables a usar,asi´como se llaman los servicios necesarios
 //para obtener de BD los distintos equipos
  ngOnInit() {

    this.equiposTot=[];
    this.equiposDisp=[];
    this.equiposExt=[];
    this.equiposUsad=[];
    this.equiposCad=[];
    this.equiposMant=[];
    this.equipoElegido=new Equipo();
    this.equiposService.getEquipos().subscribe(e=>this.equiposTot=e).unsubscribe;
    this.equiposService.getEquiposNoAsignados().subscribe(e=>this.equiposDisp=e).unsubscribe;
    this.equiposService.getEquiposUsados().subscribe(e=>this.equiposUsad=e).unsubscribe;
    this.equiposService.getEquiposExterior().subscribe(e=>this.equiposExt=e).unsubscribe;
    this.equiposService.getEquiposCaducos().subscribe(e=>this.equiposCad=e).unsubscribe;
    this.equiposService.getEquiposMantenimiento().subscribe(e=>this.equiposMant=e).unsubscribe;

  }



 //Este método nos lleva a la interfaz para modificar un equipo elegido
  irModificarEquipo(){
    if(this.equipoElegido.id>0){
      this.router.navigateByUrl('/cardio/menuPrincipal/equipos/edit/'+this.equipoElegido.id);

  }
}




//Método que nos lleva al menú principal
irMenuPrincipal(){
  this.router.navigateByUrl('/cardio/menuPrincipal');

}

}
