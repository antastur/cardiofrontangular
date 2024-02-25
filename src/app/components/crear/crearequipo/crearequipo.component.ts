import { ClientesService } from './../../../shared/services/clientes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente';
import { Equipo } from 'src/app/shared/models/equipo';
import { ClienteidService } from 'src/app/shared/data/clienteid.service';
import { EquiposService } from 'src/app/shared/services/equipos.service';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-crearequipo',
  templateUrl: './crearequipo.component.html',
  styleUrls: ['./crearequipo.component.css']
})

export class CrearequipoComponent implements OnInit{

  //Equipo sobre el que trabajar
  selectedEquipo!: Equipo;

  //Clientes a elegir
  clientes!: Cliente[];

  //Cliente elegido
  cliente!: Cliente;

  //para controlar una vista u otra
  marcador!: Boolean;





  //constructor
  constructor(public $clienteid: ClienteidService,public equiposService: EquiposService,public clientesService: ClientesService,
      public router: Router,private activatedRoute: ActivatedRoute,private toastrService: ToastrService) { }


  //en Método OnInit se inician todas las variables a usar para crear o modificar un equipo
  ngOnInit(): void {

    //Se inicializan las variables

    this.marcador=false;
    this.selectedEquipo=new Equipo();
    this.cliente=new Cliente();
    //este metodo se encarga de delimitar si hay pathvariable y si es asi carga en
    //selectedEquipo el de ese id
    this.cargar();
  }




    //Metodo que guarda el equipo al que se han dado valores en BD
    guardar():void{

    //Da la orden para mandar este equipo a traves de la api hacia el back
    this.equiposService.createEquipo(this.selectedEquipo).subscribe(()=>{
      this.toastrService.success("Accion realizada");
    }).unsubscribe

    //y vuelve a la pantalla de ver los equipos
    this.router.navigateByUrl('/cardio/menuPrincipal/equipos');
 }




    //Metodo que actualiza un equipo y devuelve a la vista de ver todos los equipos
    update():void{

    //Manda el equipo seteado a traves de la api
    this.equiposService.update(this.selectedEquipo).subscribe(()=>{
      this.toastrService.success("Accion realizada");
    }).unsubscribe
    //y vuelve a la pantalla de ver los equipos
    this.router.navigateByUrl('/cardio/menuPrincipal/equipos');
}




    //Metodo para elegir guardar el equipo en un servicio de datos y enviar el programa a la
    //pantalla de update de un cliente para asignar el equipo en un espacio y lugar de ese cliente
    IrAsignarCliente(){
    //Se guarda el equipo seteado en el servicio
    this.$clienteid.setEquipoObservable(this.selectedEquipo);
    //y nos lleva a la edicion del cliente elegido
    this.router.navigateByUrl('/cardio/menuPrincipal/clientes/edit/'+this.cliente.id);



  }

  //Metodo que redirecciona a un equipo en particular o deja uno vacio
  cargar():void{

    this.activatedRoute.params.subscribe(
          a=>{
            let id=a['id'];
            if(id){
              //para mostrar en vista los datos anteriores del equipo a modificar
              //y carga del equipo cuya id es marcada por el pathvariable y boton modificar equipo
              this.marcador=true;
              this.clientesService.getClientes().subscribe(
                a=>this.clientes=a ).unsubscribe;

              this.equiposService.getEquipo(id).subscribe(
              as=>this.selectedEquipo=as ).unsubscribe;

           //marcador para mostrar en vista boton crear equipo
           }else{
            this.marcador=false;
            }
          }).unsubscribe
    }


}
