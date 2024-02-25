import { ClienteidService } from '../../../shared/data/clienteid.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Cliente } from 'src/app/shared/models/cliente';
import { Equipo } from 'src/app/shared/models/equipo';
import { Espacio } from 'src/app/shared/models/espacio';
import { Lugar } from 'src/app/shared/models/lugar';
import { EquiposService } from 'src/app/shared/services/equipos.service';
import { EspaciosService } from 'src/app/shared/services/espacios.service';


@Component({
  selector: 'app-crearespacio',
  templateUrl: './crearespacio.component.html',
  styleUrls: ['./crearespacio.component.css']
})

export class CrearespacioComponent implements OnInit {

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
  //Marcador para dehabilitar boton crear lugar
  marcadorCrearLugar:Boolean=true;


  constructor(public $clienteId: ClienteidService, public $equiposService: EquiposService,
      public $espaciosService: EspaciosService, public router: Router, private activatedRoute: ActivatedRoute,
          private toastrService: ToastrService ) {
 }

  //Metodo al abrir el componente que inicia variables y servicios necesarios para tratar la información del componente
  ngOnInit() {


    this.espacio = new Espacio();
    //Para obtener todos los equipos asignables
    this.$equiposService.getEquiposNoAsignados().subscribe(a => this.equipos = a).unsubscribe;
    this.cliente = new Cliente();
    //Obtención del cliente al que asignar el espacioque se crea y al que volver
    this.$clienteId.getClienteObservable().subscribe(a => this.cliente = a).unsubscribe;
    this.cargar();

   }


  //Metodo que redirecciona a un cliente en particular o deja uno vacio
  cargar(): void {

    this.activatedRoute.params.subscribe(
      a => {
        let id = a['id'];
        if (id) {
            //Se obtiene el espacio que se sta editando y se guarda en servicio de datos para poder acceder desde otros componentes
            this.$espaciosService.getEspacio(id).subscribe(ae =>{
            this.espacio = ae;
            this.$clienteId.setEspacioObservable(ae);

          }  );

            //Gestión de la vista(crear o modificar)
            this.marcador=true;
            this.marcadorCrearLugar=true;
         }else{
                this.marcador=false;
                this.marcadorCrearLugar=false;
         }
        })
     }




  //Metodo que guarda el cliente al que se han dado valores en BD
  guardar(): void {

    //persistencia del espacio en el que se está trabajando
    if (!this.espacio.direccion===null) {
      //Se setea su cliente(que es el actual)
      this.espacio.cliente=this.cliente;
      this.$espaciosService.createEspacio(this.espacio).subscribe(()=>{
        this.toastrService.success("Accion realizada");
      }).unsubscribe;
      this.router.navigateByUrl('/cardio/menuPrincipal/espacios/' + this.cliente.id);

    }

  }


  //Metodo que actualiza un cliente y devuelve a la vista de ver todos los clientes
  update(): void {

    if (this.espacio.direccion) {
      console.log("true"+this.espacio.direccion);
      //Manda el equipo seteado a traves de la api
      this.$espaciosService.updateEspacio(this.espacio).subscribe(()=>{
        this.toastrService.success("Accion realizada");
      }).unsubscribe;

      this.router.navigateByUrl('/cardio/menuPrincipal/espacios/' + this.cliente.id);
    } else {
      console.log("true"+this.espacio.direccion);
      this.toastrService.warning("Has de rellenar \n la ubicación como mínimo")
    }

  }


  //Método que carga un equipo seleccionado entre los asignables para poder asignarlo en otro componente
  asignarEquipo() {

    if (!this.equipo) {

             console.log("Elige un equipo a asignar");

            }else{
                      this.$clienteId.setEquipoObservable(this.equipo);
                      console.log("equipo en este lugar "+this.equipo.numSerie);

                    }
     }




  //Método para volver a la interfaz del cliente sobre el que se está trabajando
  retornar() {
    this.router.navigateByUrl('/cardio/menuPrincipal/clientes/edit/' + this.cliente.id);

  }



  //Método que lleva a la interfaz para crear un lugar
  crearLugar() {

    this.router.navigateByUrl('/cardio/menuPrincipal/lugares/edit/');


/*

    //Metodo para borrar un equipo
  deleteEspacio(espacio: Espacio):void{

    console.log('borrado');
    console.log(espacio.id);
    this.$espacioServicio.deleteEspacio(espacio.id).subscribe(()=>{
      this.toastrService.success("Acción realizada")})
      .unsubscribe;
      this.$clienteServicio.getEspaciosUnCliente(espacio.id).subscribe(
        response=>this.espacios=response).unsubscribe;

      }
*/



  }

}
