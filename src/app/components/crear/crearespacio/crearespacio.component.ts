import { ClienteidService } from '../../../shared/data/clienteid.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/shared/models/cliente';
import { Equipo } from 'src/app/shared/models/equipo';
import { ErrorMessage } from 'src/app/shared/models/errormessage';
import { Espacio } from 'src/app/shared/models/espacio';
import { Lugar } from 'src/app/shared/models/lugar';
import { EquiposService } from 'src/app/shared/services/equipos.service';
import { EspaciosService } from 'src/app/shared/services/espacios.service';


@Component({
  selector: 'app-crearespacio',
  templateUrl: './crearespacio.component.html',
  styleUrls: ['./crearespacio.component.css']
})

export class CrearespacioComponent implements OnInit,OnDestroy{


  //Espacio seleccionado
  espacio!: Espacio;
  //Lugares del espacio
  lugares!: Lugar[];
  //cliente propietario
  cliente!: Cliente;
  //Marcador para componenteverlugares (es heredado a componente verlugares)
  marcador: Boolean=false;
  //Marcador para dehabilitar boton crear lugar
  marcadorCrearLugar:Boolean=true;
  //Marcador para vista crear/modificar
  marcadorCrearMod:Boolean=true;
  //objeto subscriptor para gestionar las que maneja el componente
  subscription!: Subscription;


  //constructor con inyecciones necesarias
  constructor(private $clienteId: ClienteidService, private $espaciosService: EspaciosService,
           private router: Router, private activatedRoute: ActivatedRoute,
               private toastrService: ToastrService ) {
 }



  //Metodo al abrir el componente que inicia variables y servicios necesarios para tratar la información del componente
  ngOnInit() {
    this.espacio = new Espacio();
    this.cliente = new Cliente();
    //Obtención del cliente al que asignar el espacioque se crea y al que volver
    this.subscription=this.$clienteId.getClienteObservable().subscribe(a => this.cliente = a);
    //Se delimita si es vista crear o vista según parametros de URL
    this.cargar();

  }



  //Metodo que redirecciona a un espacio en particular o deja uno vacio
  cargar(): void {

    this.subscription=this.activatedRoute.params.subscribe(
      a => {
        let id = a['id'];
        if (id) {
            //Se obtiene el espacio que se esta editando y se guarda en servicio de datos para poder acceder desde otros componentes
            this.subscription=this.$espaciosService.getEspacio(id).subscribe(ae =>{
            this.espacio = ae;
            this.$clienteId.setEspacioObservable(ae);

          }  );

            //Gestión de la vista(crear o modificar),(boton crear lugar ,si o no),para que en verlugares se vean botones de gestión o no
            this.marcador=true;
            this.marcadorCrearLugar=true;
            this. marcadorCrearMod=true;
         }else{
            this.marcador=true;
            this.marcadorCrearLugar=false;
            this. marcadorCrearMod=false;
         }
        })
     }




  //Metodo que guarda el cliente al que se han dado valores en BD
  guardar(): void {

    //Se comprueba con marcador si es creacion o modificacion
    //persistencia del espacio en el que se está trabajando
    if (this.marcadorCrearMod=false) {

      //Se setea su cliente(que es el actual)
      this.espacio.cliente=this.cliente;

      //Se persiste,notifica y redirecciona
        this.subscription=this.$espaciosService.createEspacio(this.espacio).subscribe(()=>{
        this.toastrService.success("Accion realizada");
        this.router.navigateByUrl('/cardio/menuPrincipal/espacios/' + this.cliente.id);
      });


    } else {
      //Aviso de mal suministro de datos
      this.toastrService.warning("Has de rellenar \n la fecha de registro y \n la ubicación como mínimo")
    }

  }


  //Metodo que actualiza un cliente y devuelve a la vista de ver todos los clientes
  update(): void {

    //Se comprueba con marcador si es creacion o modificacion
    //persistencia del espacio en el que se está trabajando
    if (!this.marcadorCrearMod==false) {

      //Manda el equipo seteado a traves de la api
      this.subscription= this.$espaciosService.updateEspacio(this.espacio).subscribe(()=>{
        this.toastrService.success("Accion realizada");
      });


   } else {
      //Aviso de mal suministro de datos
      this.toastrService.warning("Has de rellenar \n la ubicación como mínimo")
    }

  }




  borrarEspacio():void{


         this.subscription=this.$espaciosService.deleteEspacio(this.espacio.id).subscribe(()=>{
          //Se lanza mensaje de accion
           this.toastrService.success("Acción realizada")
          //Se vuelve al cliente
           this.router.navigateByUrl('/cardio/menuPrincipal/clientes/edit/' + this.cliente.id);
          });
}


  //Método para volver a la interfaz del cliente sobre el que se está trabajando
  retornar() {
    this.router.navigateByUrl('/cardio/menuPrincipal/clientes/edit/' + this.cliente.id);

  }



  //Método que lleva a la interfaz para crear un lugar
  crearLugar() {

    this.router.navigateByUrl('/cardio/menuPrincipal/lugares/edit/');
  }


  ngOnDestroy(): void {
    this.marcador=false;
    this.subscription.unsubscribe();
  }

}
