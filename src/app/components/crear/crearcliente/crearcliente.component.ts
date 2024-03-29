
import { ClienteidService } from '../../../shared/data/clienteid.service';
import { ClientesService } from './../../../shared/services/clientes.service';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente';
import { Espacio } from 'src/app/shared/models/espacio';
import { Curso } from 'src/app/shared/models/curso';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { ErrorMessage } from 'src/app/shared/models/errormessage';


@Component({
  selector: 'app-crearcliente',
  templateUrl: './crearcliente.component.html',
  styleUrls: ['./crearcliente.component.css']
})

export class CrearclienteComponent implements OnInit{

   //Espacio seleccionado
   espacio!: Espacio;
   //Array de Espacios
   espacioscli!: Espacio[];
   //Curso a asignar
   curso!: Curso;
   //Array de cursos
   cursoscli!: Curso[];
  //clientes!: Cliente[];
   cliente!: Cliente;
   //para controlar una vista u otra
   marcador!: Boolean;
   //objeto subscriptor para gestionar las que maneja el componente
   subscripcion!: Subscription;


  //constructor con inyecciones necesarias
   constructor(private $clienteId: ClienteidService,private $clientesService: ClientesService, private router: Router,private activatedRoute: ActivatedRoute,private toastrService: ToastrService) {

 }


 //en Método OnInit se inician todas las variables a usar,así como se llaman los servicios necesarios
 //para obtener de BD los distintos clientes
  ngOnInit(): void {

    this.cliente=new Cliente();
    this.curso=new Curso();
    this.espacio=new Espacio();
    this.curso.nombre='';
    this.espacio.direccion='';

    //este metodo se encarga de delimitar si hay pathvariable y si es asi carga en
    //selectedCliente el de ese id al iniciar el componente
    this.cargar();
   }



  //Metodo que redirecciona a un cliente en particular o deja uno vacio
  cargar():void{

  this.subscripcion=this.activatedRoute.params.subscribe(
          a=>{
            let id=a['id'];
            if(id){
              //para mostrar en vista los datos anteriores del cliente a modificar
              //y carga del cliente cuya id es marcada por el pathvariable y boton modificar cliente

              this.marcador=true;
              this.subscripcion=this.$clientesService.getCliente(id).subscribe(
                a=>{this.cliente=a;
                //Carga con datos el servicio para mandar un cliente a otros componentes
                this.$clienteId.setClienteObservable(a);
                })


              //Se obtienen los espacios y cursos de un cliente con sus servicios y a la vez se subscribe esto al objeto Subscription
              this.subscripcion=this.$clientesService.getEspaciosUnCliente(id).subscribe(asa=>this.espacioscli=asa );
              this.subscripcion=this.$clientesService.getCursosUnCliente(id).subscribe(asa=>this.cursoscli=asa );


                //marcador para mostrar en vista boton crear cliente
              }else{
                this.marcador==false;

              }
            } )
    }




 //Metodo que guarda el cliente al que se han dado valores en BD
 guardar():void{

  //Da la orden para mandar este cliente a traves de la api hacia el back
  this.subscripcion=this.$clientesService.createCliente(this.cliente).subscribe(()=>{
    //Se notifica y se vuelve a ver clientes
    this.toastrService.success("Acción realizada");
    this.router.navigateByUrl('/cardio/menuPrincipal/clientes')}
  );
  }



//Metodo que actualiza un cliente y devuelve a la vista de ver todos los clientes
update():void{

 //Manda el equipo seteado a traves de la api
  this.subscripcion=this.$clientesService.updateCliente(this.cliente).subscribe(()=>{
     //Se notifica y se vuelve a ver clientes
    this.toastrService.success("Acción realizada");
    this.router.navigateByUrl('/cardio/menuPrincipal/clientes');
    });


}



//Método que lleva a la interfaz de editar un espacio o crearlo
IrAsignarEspacio(){

  if(this.espacio.direccion!==''){
    this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/'+this.espacio.id);
}else{
    this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit');
}

}



//Método que lleva a la interfaz de editar un curso o crearlo
IrAsignarCurso(){

    if(this.curso.nombre!==''){
    this.router.navigateByUrl('/cardio/menuPrincipal/cursos/edit/'+this.curso.id);
  }else{
    this.router.navigateByUrl('/cardio/menuPrincipal/cursos/edit');
}

}


ngOnDestroy(): void {
 this.subscripcion.unsubscribe();
}



}
