import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Equipo } from 'src/app/shared/models/equipo';
import { EquiposService } from 'src/app/shared/services/equipos.service';

@Component({
  selector: 'app-verequipos',
  templateUrl: './verequipos.component.html',
  styleUrls: ['./verequipos.component.css']
})
export class VerequiposComponent implements OnInit{


  //Declaracion de variables
  equipos!: Equipo[];

  //Constructor
  constructor(public equiposServicio: EquiposService,private router: Router){}

  ngOnInit(): void {
     //se cargan todos los alumnos de BD
     this.reloadData();
  }


  reloadData(){
    this.equiposServicio.getEquipos().subscribe(e=>this.equipos=e);
  }


  //Metodo para borrar un equipo
  deleteEquipo(equipo: Equipo):void{
    console.log('borrado');
    console.log(equipo.id);
    this.equiposServicio.deleteEquipo(equipo.id).subscribe(
      res =>this.equiposServicio.getEquipos().subscribe(
        response=>this.equipos=response
      ));

      }


  //Metodo para ir a pantalla de asignar cliente
      irAsignar(equipo: Equipo):void{

        this.router.navigateByUrl('/cardio/menuPrincipal/espacios/'+equipo.id);
      }

}
