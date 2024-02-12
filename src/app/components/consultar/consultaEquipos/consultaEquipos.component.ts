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

  equipoElegido!: Equipo;

  equipos!: Equipo[];

  equiposDisp!: Equipo[];

  equiposExt!: Equipo[];

  equiposUsad!: Equipo[];

  equiposCad!: Equipo[];



  //constructor
  constructor(public equiposService: EquiposService,public router: Router,private activatedRoute: ActivatedRoute) { }


  ngOnInit() {

    this.equipoElegido=new Equipo();
    this.equipoElegido.id=0;
    this.equiposService.getEquipos().subscribe(e=>this.equipos=e);
    console.log(this.equipos[0].fabricante)
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
