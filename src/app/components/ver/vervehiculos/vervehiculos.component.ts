import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Equipo } from 'src/app/shared/models/equipo';
import { Espacio } from 'src/app/shared/models/espacio';
import { Vehiculo } from 'src/app/shared/models/vehiculo';
import { IdClienteparaespaciosService } from 'src/app/shared/services/data/idClienteparaespacios.service';
import { EspaciosService } from 'src/app/shared/services/espacios.service';

@Component({
  selector: 'app-vervehiculos',
  templateUrl: './vervehiculos.component.html',
  styleUrls: ['./vervehiculos.component.css']
})
export class VervehiculosComponent {


  @Input()equipoHijo!: Equipo;
  @Input() espacioHijo!: Espacio;
  @Input() marcadorHijo!:Boolean;
  espacio!: Espacio;
  idCliente!: number;
  vehiculos!: Vehiculo[];


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

       // this.$espaciosService.getVehiculosUnEspacio(id).subscribe(
         // al => this.vehiculos = al).unsubscribe;
        this.$espaciosService.getVehiculosUnEspacio(id).subscribe(
          al => this.vehiculos = al).unsubscribe;

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



asignarEquipo(equipo: Equipo){

}

crearVehiculo(){

}

updateVehiculo(id: number){

}

deleteVehiculo(id: number){

}




}
