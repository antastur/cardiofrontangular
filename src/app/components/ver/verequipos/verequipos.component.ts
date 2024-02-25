import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Equipo } from 'src/app/shared/models/equipo';
import { EquiposService } from 'src/app/shared/services/equipos.service';

@Component({
  selector: 'app-verequipos',
  templateUrl: './verequipos.component.html',
  styleUrls: ['./verequipos.component.css']
})
export class VerequiposComponent implements OnInit{


  //Declaracion de variables
  //Todos los equipos a ver
  equipos!: Equipo[];
  //Subscripcion para gestionar todas y cerrarlas al salir del componente
  subscription!: Subscription;

  //Constructor
  constructor(public equiposServicio: EquiposService,private router: Router,private toastrService: ToastrService){

  }


   ngOnInit(): void {
     //se cargan todos los equipos de BD
     this.subscription=this.reloadData();
  }


  //Metodo para ejecutar en el inicio de la app y traer todos los equipos de la BD
  reloadData() :Subscription{
    return this.equiposServicio.getEquipos().subscribe(e=>this.equipos=e);
}


  //Metodo para borrar un equipo
  deleteEquipo(equipo: Equipo):void{
    //Se ejecuta el metodo y en la subscripcion se actualizan los datos de la vista y se lanza mensaje de ok
    this.equiposServicio.deleteEquipo(equipo.id).subscribe(()=>{
      this.subscription=this.reloadData();
       this.toastrService.success("Acción realizada")})
      .unsubscribe();

     }


  //Metodo para ir a pantalla de asignar cliente
      irAsignar(equipo: Equipo):void{

        this.router.navigateByUrl('/cardio/menuPrincipal/espacios/'+equipo.id);
      }

      //Al salir del componente se cierran las subscripciones abiertas
      ngOnDestroy(): void {
        this.subscription.unsubscribe;
      }



}
