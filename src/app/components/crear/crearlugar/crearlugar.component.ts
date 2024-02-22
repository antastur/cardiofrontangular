import { LugaresService } from './../../../shared/services/lugares.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente';
import { Equipo } from 'src/app/shared/models/equipo';
import { Espacio } from 'src/app/shared/models/espacio';
import { Lugar } from 'src/app/shared/models/lugar';
import { Vehiculo } from 'src/app/shared/models/vehiculo';
import { ClienteidService } from 'src/app/shared/services/data/clienteid.service';
import { EquiposService } from 'src/app/shared/services/equipos.service';
import { EspaciosService } from 'src/app/shared/services/espacios.service';
import { VehiculosService } from 'src/app/shared/services/vehiculos.service';

@Component({
  selector: 'app-crearlugar',
  templateUrl: './crearlugar.component.html',
  styleUrls: ['./crearlugar.component.css']
})

export class CrearlugarComponent implements OnInit {

  //Declaración de variables necesarias
  lugar!: Lugar;
  vehiculo!: Vehiculo;
  marcador:Boolean=true;
  cliente!: Cliente;
  espacio!: Espacio;
  equipo!: Equipo;

  //Constructor inyectando servicios necesarios
  constructor(public $clienteid: ClienteidService, public $equiposService: EquiposService, public $lugaresService: LugaresService,public $vehiculoService: VehiculosService, public router: Router, private activatedRoute: ActivatedRoute) {
 }

 //Método en el que se inician variables y servicios necesarios
  ngOnInit() {
    this.lugar=new Lugar();
    this.vehiculo=new Vehiculo();
    this.espacio=new Espacio();
    //Se recupera el espacio guardado en el servicio de datos
    this.$clienteid.getEspacioObservable().subscribe(a=>this.espacio=a).unsubscribe;
    this.equipo=new Equipo();
    //Se recupera el equipo guardado en el servicio de datos
    this.$clienteid.getEquipoObservable().subscribe(e=>this.equipo=e).unsubscribe;
    this.cliente=new Cliente();
    //Se recupera el cliente guardado en el servicio de datos
    this.$clienteid.getClienteObservable().subscribe(a=>this.cliente=a).unsubscribe;
    this.cargar();
  }

  //Metodo que redirecciona a un cliente en particular o deja uno vacio
  cargar(): void {

    this.activatedRoute.params.subscribe(
      a => {
        let id = a['id'];
        if (id) {
        //Obtención del lugar sobre el que se trabaja
        this.$lugaresService.getLugar(id).subscribe(ae => this.lugar = ae).unsubscribe;
        //Gestión de la vista con flags
        this.marcador=false;

        }else{
          this.marcador=true;

        }
      }
    )
  }


//Método que persiste el lugar que se crea teniendo en cuenta si es lugar o vehiculo
guardar(){


              if(this.lugar.matricula){

                    this.vehiculo.id=this.lugar.id;
                    this.vehiculo.espacio=this.espacio;
                    this.vehiculo.marca=this.lugar.marca;
                    this.vehiculo.matricula=this.lugar.matricula;
                    this.vehiculo.modelo=this.lugar.modelo;
                    this.vehiculo.telefono=this.lugar.telefono;
                    this.vehiculo.ubicacion=this.lugar.ubicacion;
                    this.$vehiculoService.createVehiculo(this.vehiculo).subscribe().unsubscribe;
                    this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/' + this.espacio.id);
                }

                if(!this.lugar.matricula){
                     this.lugar.espacio=this.espacio;
                     this.$lugaresService.createLugar(this.lugar).subscribe().unsubscribe;
                     this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/' + this.espacio.id);
                   }

 }



//Método que persiste el lugar que se modifica teniendo en cuenta si es lugar o vehiculo y si tiene equipo asignado o no
update(){

  if(this.equipo.id){

    this.equipo=this.lugar.equipo;
    this.equipo.asignado=true;
    this.$equiposService.update(this.equipo).subscribe().unsubscribe;

            if(this.lugar.matricula){


                this.vehiculo.equipo=this.equipo;
                this.vehiculo.espacio=this.espacio;
                this.vehiculo.marca=this.lugar.marca;
                this.vehiculo.matricula=this.lugar.matricula;
                this.vehiculo.modelo=this.lugar.modelo;
                this.vehiculo.telefono=this.lugar.telefono;
                this.vehiculo.ubicacion=this.lugar.ubicacion;
                console.log("vehiculo "+this.vehiculo.id);
                this.$vehiculoService.updateVehiculo(this.vehiculo).subscribe().unsubscribe;
                this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/' + this.espacio.id);
              }

            if(!this.lugar.matricula){


                this.lugar.equipo=this.equipo;
                this.lugar.espacio=this.espacio;
                this.$lugaresService.updateLugar(this.lugar).subscribe().unsubscribe;
                this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/' + this.espacio.id);
                }

  }else{

            if(this.lugar.matricula){

                this.vehiculo.espacio=this.espacio;
                this.vehiculo.marca=this.lugar.marca;
                this.vehiculo.matricula=this.lugar.matricula;
                this.vehiculo.modelo=this.lugar.modelo;
                this.vehiculo.telefono=this.lugar.telefono;
                this.vehiculo.ubicacion=this.lugar.ubicacion;
                this.$vehiculoService.updateVehiculo(this.vehiculo).subscribe().unsubscribe;
                this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/' + this.espacio.id);
                }

            if(!this.lugar.matricula){

                  this.lugar.espacio=this.espacio;
                  this.$lugaresService.updateLugar(this.lugar).subscribe().unsubscribe;
                  this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/' + this.espacio.id);
                  }
   }
}





}
