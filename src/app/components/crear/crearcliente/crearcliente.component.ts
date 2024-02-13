import { ClienteidService } from './../../../shared/services/data/clienteid.service';
import { ClientesService } from './../../../shared/services/clientes.service';
import { Component, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente';
import { Espacio } from 'src/app/shared/models/espacio';
import { Curso } from 'src/app/shared/models/curso';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-crearcliente',
  templateUrl: './crearcliente.component.html',
  styleUrls: ['./crearcliente.component.css']
})
export class CrearclienteComponent implements OnInit ,OnDestroy{



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
  // idCliente!: number;
   $clienteSubscription!: Subscription;

 //constructor
 constructor(public $clienteId: ClienteidService,public $clientesService: ClientesService, public router: Router,private activatedRoute: ActivatedRoute) {



 }


   ngOnInit(): void {



    this.cliente=new Cliente();
    this.curso=new Curso();
    this.espacio=new Espacio();
    this.curso.nombre='';
    this.espacio.direccion='';
    this.marcador=false;

    //este metodo se encarga de delimitar si hay pathvariable y si es asi carga en
    //selectedCliente el de ese id
    this.cargar();

  }



  //Metodo que redirecciona a un cliente en particular o deja uno vacio
  cargar():void{

    this.activatedRoute.params.subscribe(
          a=>{
            let id=a['id'];
            if(id){
              //para mostrar en vista los datos anteriores del cliente a modificar
              //y carga del cliente cuya id es marcada por el pathvariable y boton modificar cliente

              this.marcador=true;
              this.$clienteSubscription=this.$clientesService.getCliente(id).subscribe(
                a=>{this.cliente=a;
                //Carga con datos el servicio para mandar un cliente a otros componentes
                this.$clienteId.setClienteObservable(a);
                });


              //this.$clienteId.idCliente$.subscribe(a=>this.idCliente=a);
              this.$clienteSubscription=this.$clientesService.getEspaciosUnCliente(id).subscribe(asa=>this.espacioscli=asa );
              this.$clienteSubscription=this.$clientesService.getCursosUnCliente(id).subscribe(asa=>this.cursoscli=asa );








          //marcador para mostrar en vista boton crear cliente
           }else{
            this.marcador=false;



             }
          }
        )
}



 //Metodo que guarda el cliente al que se han dado valores en BD
 guardar():void{

  //Da la orden para mandar este cliente a traves de la api hacia el back
  this.$clienteSubscription=this.$clientesService.createCliente(this.cliente).subscribe();
  this.router.navigateByUrl('/cardio/menuPrincipal/clientes');
}



//Metodo que actualiza un cliente y devuelve a la vista de ver todos los clientes
update():void{


  //Manda el equipo seteado a traves de la api
  this.$clienteSubscription=this.$clientesService.updateCliente(this.cliente).subscribe();

 this.router.navigateByUrl('/cardio/menuPrincipal/clientes');
}

IrAsignarEspacio(){

  if(this.espacio.direccion!==''){
    this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/'+this.espacio.id);
}else{

  this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit');
}

}
IrAsignarCurso(){

    if(this.curso.nombre!==''){
    this.router.navigateByUrl('/cardio/menuPrincipal/cursos/edit/'+this.curso.id);

  }

}



ngOnDestroy(): void {
 if(this.$clienteSubscription){
  this.$clienteSubscription.unsubscribe();
 }

}



}
