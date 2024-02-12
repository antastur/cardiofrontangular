import { LugaresService } from './../../../shared/services/lugares.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente';
import { Equipo } from 'src/app/shared/models/equipo';
import { Espacio } from 'src/app/shared/models/espacio';
import { Lugar } from 'src/app/shared/models/lugar';
import { Vehiculo } from 'src/app/shared/models/vehiculo';
import { ClienteidService } from 'src/app/shared/services/data/clienteid.service';
import { IdClienteparaespaciosService } from 'src/app/shared/services/data/idClienteparaespacios.service';
import { EquiposService } from 'src/app/shared/services/equipos.service';
import { EspaciosService } from 'src/app/shared/services/espacios.service';
import { VehiculosService } from 'src/app/shared/services/vehiculos.service';

@Component({
  selector: 'app-crearlugar',
  templateUrl: './crearlugar.component.html',
  styleUrls: ['./crearlugar.component.css']
})
export class CrearlugarComponent implements OnInit {

  lugar!: Lugar;
  vehiculo!: Vehiculo;
  marcador:Boolean=true;
  cliente!: Cliente;
  espacio!: Espacio;
  equipo!: Equipo;


  constructor(public $clienteid: ClienteidService, public $equiposService: EquiposService, public $espaciosService: EspaciosService,public $lugaresService: LugaresService,public $vehiculoService: VehiculosService, public router: Router, private activatedRoute: ActivatedRoute) {

   }

  ngOnInit() {
    this.lugar=new Lugar();
    this.vehiculo=new Vehiculo();
    this.espacio=new Espacio();
    this.$clienteid.getEspacioObservable().subscribe(a=>this.espacio=a);
    this.equipo=new Equipo();
    this.cliente=new Cliente();
    this.$clienteid.getClienteObservable().subscribe(a=>this.cliente=a);
    this.cargar();
  }

  //Metodo que redirecciona a un cliente en particular o deja uno vacio
  cargar(): void {

    this.activatedRoute.params.subscribe(
      a => {
        let id = a['id'];
        if (id) {

        this.$lugaresService.getLugar(id).subscribe(ae => this.lugar = ae);
         // this.$espaciosService.getLugaresUnEspacio(id).subscribe(al => this.lugares = al);
         this.$vehiculoService.getVehiculo(id).subscribe(a=>this.vehiculo=a);
        this.marcador=false;

        }else{
          this.marcador=true;

        }
      }
    )
  }


  asignar(){



  }


guardar(){

  console.log("espacio "+this.espacio.direccion);
  console.log("cliente "+this.cliente.nombEmp);
  console.log("espacio "+this.espacio.direccion);


  if (this.lugar.matricula){


    console.log("vehiculo "+this.vehiculo.matricula);
    this.$clienteid.getEquipoObservable().subscribe(a=>this.equipo=a).unsubscribe;
    this.vehiculo.ubicacion=this.lugar.ubicacion;

    console.log("equipo "+this.equipo.numSerie);
    this.vehiculo.marca=this.lugar.marca;
    this.vehiculo.matricula=this.lugar.matricula;
    this.vehiculo.modelo=this.lugar.modelo;
    this.vehiculo.telefono=this.lugar.telefono;
   // this.vehiculo.equipo=this.equipo;
   // this.vehiculo.espacio=this.espacio;
   // this.$lugaresService.createLugar(this.lugar);
    this.$vehiculoService.createVehiculo(this.vehiculo).subscribe();
   this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/' + this.espacio.id);
  }else{

    this.$clienteid.getEquipoObservable().subscribe(a=>this.equipo=a).unsubscribe
    console.log("vehiculo "+this.vehiculo.matricula);
    console.log("equipo "+this.equipo.numSerie);
    console.log("lugar "+this.lugar.ubicacion);
    this.lugar.equipo=this.equipo;
    this.lugar.espacio=this.espacio;
    this.$lugaresService.createLugar(this.lugar).subscribe;
    this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/' + this.espacio.id);
  }

}


update(){
console.log("espacio "+this.espacio.direccion);
//console.log("idCliente "+this.idClienteHijo);
console.log("equipo "+this.equipo.numSerie);
console.log("lugar "+ this.lugar.ubicacion);

}





}
