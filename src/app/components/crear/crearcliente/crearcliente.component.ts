import { EspaciosService } from './../../../shared/services/espacios.service';
import { ClientesService } from './../../../shared/services/clientes.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente';
import { Equipo } from 'src/app/shared/models/equipo';
import { EquiposService } from 'src/app/shared/services/equipos.service';
import { VehiculosService } from 'src/app/shared/services/vehiculos.service';
import { Espacio } from 'src/app/shared/models/espacio';
import { Alumno } from 'src/app/shared/models/alumno';
import { Curso } from 'src/app/shared/models/curso';

@Component({
  selector: 'app-crearcliente',
  templateUrl: './crearcliente.component.html',
  styleUrls: ['./crearcliente.component.css']
})
export class CrearclienteComponent implements OnInit {

  //Equipo a asignar
   selectedEquipo!: Equipo;
   //Alumno a asignar
   selectedAlumno!: Alumno;
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

 //constructor
 constructor(public clientesService: ClientesService,public espaciosService: EspaciosService,public vehiculosService: VehiculosService,public router: Router,private activatedRoute: ActivatedRoute) { }

   ngOnInit(): void {
    console.log("espacios");


    this.selectedEquipo=new Equipo();
    this.curso=new Curso();
    this.espacio=new Espacio();
    this.marcador=false;
    this.cliente=new Cliente();
    this.curso.id=0;
    this.espacio.id=0;
    //este metodo se encarga de delimitar si hay pathvariable y si es asi carga en
    //selectedCliente el de ese id
    console.log("espacios");
    this.cargar();
    console.log("espacios");
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
              this.clientesService.getCliente(id).subscribe(a=>this.cliente=a );
              this.clientesService.getEspaciosUnCliente(id).subscribe(asa=>this.espacioscli=asa );
              this.clientesService.getCursosUnCliente(id).subscribe(asa=>this.cursoscli=asa );
             // this.clientesService.getEspaciosUnCliente(id).subscribe(as=>this.espacioscli=as );
             // console.log("pruebaespacios"+this.espacios[0].id);
             // this.espaciosService.getEspacios().subscribe(
              //  a=>this.espacios=a );


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
  this.clientesService.createCliente(this.cliente).subscribe();
  this.router.navigateByUrl('/cardio/menuPrincipal/clientes');
}



//Metodo que actualiza un cliente y devuelve a la vista de ver todos los clientes
update():void{


  //Manda el equipo seteado a traves de la api
  this.clientesService.updateCliente(this.cliente).subscribe();

 this.router.navigateByUrl('/cardio/menuPrincipal/clientes');
}

IrAsignarEspacio(){

  if(this.espacio.id>0){
    this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/'+this.espacio.id);

}

}
IrAsignarCurso(){

    if(this.curso.id>0){
    this.router.navigateByUrl('/cardio/menuPrincipal/cursos/edit/'+this.curso.id);

  }
}


}
