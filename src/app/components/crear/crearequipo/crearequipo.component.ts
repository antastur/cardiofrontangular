import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from 'src/app/shared/models/equipo';
import { EquiposService } from 'src/app/shared/services/equipos.service';

@Component({
  selector: 'app-crearequipo',
  templateUrl: './crearequipo.component.html',
  styleUrls: ['./crearequipo.component.css']
})
export class CrearequipoComponent implements OnInit{

  //Alumno sobre el que trabajar
  selectedEquipo!: Equipo;
   //para controlar una vista u otrs
   marcador!: Boolean;



   //constructor
  constructor(public equiposService: EquiposService,private router: Router,private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {

    this.selectedEquipo=new Equipo();
    this.marcador=false;
     //este metodo se encarga de delimitar si hay pathvariable y si es asi carga en
    //selectedAlumno el de ese id
    this.cargar();
  }


  //Metodo que guarda el equipo al que se han dado valores en BD
  guardar():void{

    //Da la orden para mandar este equipo a traves de la api hacia el back
    this.equiposService.createEquipo(this.selectedEquipo).subscribe()
 }


 //Metodo que actualiza un alumno y devuelve a la vista de ver todos los alumnos
 update():void{


    //Manda el alumno seteado a traves de la api
   this.equiposService.update(this.selectedEquipo).subscribe(
    data => {
         this.router.navigate(['/cardio/menuPrincipal/equipos'])
        })
}


  //Metodo que redirecciona a un alumno en particular o deja uno vacio
  cargar():void{

    this.activatedRoute.params.subscribe(
          a=>{
            let id=a['id'];
            if(id){
              //marcador para mostrar en vista los datos anteriores del alumno a modificar
              //y carga del alumno cuya id es marcada por el pathvariable
              this.marcador=true;
              this.equiposService.getEquipo(id).subscribe(
              as=>this.selectedEquipo=as

              );
          //marcador para mostrar en vista los datos anteriores del alumno a modificar
           }else{
            this.marcador=false;
             }
          }
        )
}


}
