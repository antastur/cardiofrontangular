import { ClienteidService } from './../../../shared/services/data/clienteid.service';
import { LugaresService } from './../../../shared/services/lugares.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/shared/models/cliente';
import { Equipo } from 'src/app/shared/models/equipo';
import { Espacio } from 'src/app/shared/models/espacio';
import { Lugar } from 'src/app/shared/models/lugar';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { EquiposService } from 'src/app/shared/services/equipos.service';
import { EspaciosService } from 'src/app/shared/services/espacios.service';
import { VehiculosService } from 'src/app/shared/services/vehiculos.service';

@Component({
  selector: 'app-crearespacio',
  templateUrl: './crearespacio.component.html',
  styleUrls: ['./crearespacio.component.css']
})
export class CrearespacioComponent implements OnInit {



  idClienteSubcriptions!: Subscription;
  //Equipos a seleccionar
  equipos!: Equipo[];
  //Equipo seleccionado
  equipo!: Equipo;
  //Espacio seleccionado
  espacio!: Espacio;
  //Lugares del espacio
  lugares!: Lugar[];
  //cliente propietario
  cliente!: Cliente;
  //Marcador para componenteverlugares
  marcador:Boolean=false;
  //Marcador para desabilitar direccion
  marcador2:Boolean=true;
  //Marcador para dehabilitar boton crear lugar
  marcadorCrearLugar:Boolean=true;

  constructor(public $clienteId: ClienteidService, public $equiposService: EquiposService, public $clientesService: ClientesService, public $espaciosService: EspaciosService, public router: Router, private activatedRoute: ActivatedRoute) {

  }


  ngOnInit() {


    this.espacio = new Espacio();
    this.$equiposService.getEquiposNoAsignados().subscribe(a => this.equipos = a).unsubscribe;
    this.cliente = new Cliente();
    this.$clienteId.getClienteObservable().subscribe(a => this.cliente = a).unsubscribe;
    this.cargar();



  }


  //Metodo que redirecciona a un cliente en particular o deja uno vacio
  cargar(): void {

    this.activatedRoute.params.subscribe(
      a => {
        let id = a['id'];
        if (id) {

          this.$espaciosService.getEspacio(id).subscribe(ae =>{
            this.espacio = ae;
            this.$clienteId.setEspacioObservable(ae);

          }  ).unsubscribe;
         // this.$espaciosService.getLugaresUnEspacio(id).subscribe(al => this.lugares = al);

         this.marcador=true;
         this.marcadorCrearLugar=true;
        }else{
          this.marcador=false;
          this.marcador2=false;
          this.marcadorCrearLugar=false;
        }
      }
    )
  }


  //Metodo que guarda el cliente al que se han dado valores en BD
  guardar(): void {

    if (this.espacio.direccion) {
      this.espacio.cliente=this.cliente;
      this.$espaciosService.createEspacio(this.espacio).subscribe().unsubscribe;
      this.router.navigateByUrl('/cardio/menuPrincipal/espacios/' + this.cliente.id);

    } else {
      console.log("Rellena como mínimo el campo direccion");
    }

    //Da la orden para mandar este cliente a traves de la api hacia el back

    // this.router.navigateByUrl('/cardio/menuPrincipal/espacios/'+this.idCliente);
  }


  //Metodo que actualiza un cliente y devuelve a la vista de ver todos los clientes
  update(): void {

    if (this.espacio.direccion) {

      //Manda el equipo seteado a traves de la api
      this.$espaciosService.updateEspacio(this.espacio).subscribe().unsubscribe;

      this.router.navigateByUrl('/cardio/menuPrincipal/espacios/' + this.cliente.id);
    } else {
      console.log("Rellena como mínimo el campo direccion");
    }

  }
  asignarEquipo() {

    if (!this.equipo) { console.log("Elige un equipo a asignar"); }else{

      this.$clienteId.setEquipoObservable(this.equipo);
      console.log("equipo en este lugar "+this.equipo.numSerie);
      //this.$lugaresService.updateLugar()


    }



  }

  retornar() {
    this.router.navigateByUrl('/cardio/menuPrincipal/clientes/edit/' + this.cliente.id);
  /*  this.activatedRoute.params.subscribe(
      a => {
        let id = a['id'];
        if (id) {
          this.router.navigateByUrl('/cardio/menuPrincipal/clientes/edit/' + this.cliente.id);

        } else {
          this.router.navigateByUrl('/cardio/menuPrincipal/clientes');
        }
      }
    )  */
  }

  crearLugar() {

    this.router.navigateByUrl('/cardio/menuPrincipal/lugares/edit/');
   // console.log("equipo " + this.equipo.numSerie);


  }

}
