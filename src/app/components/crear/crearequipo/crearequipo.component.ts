import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente';
import { Equipo } from 'src/app/shared/models/equipo';
import { ClientesService } from 'src/app/shared/services/clientes.service';
import { EquiposService } from 'src/app/shared/services/equipos.service';

@Component({
  selector: 'app-crearequipo',
  templateUrl: './crearequipo.component.html',
  styleUrls: ['./crearequipo.component.css']
})
export class CrearequipoComponent implements OnInit{

  //Equipo sobre el que trabajar
  selectedEquipo!: Equipo;
   //para controlar una vista u otra
   marcador!: Boolean;
   clientes!: Cliente[];
   cliente!: Cliente;

   //constructor
  constructor(public equiposService: EquiposService,public router: Router,private activatedRoute: ActivatedRoute) { }


  ngOnInit(): void {

    this.selectedEquipo=new Equipo();
    this.marcador=false;
    this.cliente=new Cliente();
    this.cliente.id=0;
     //este metodo se encarga de delimitar si hay pathvariable y si es asi carga en
    //selectedEquipo el de ese id
    this.cargar();
  }


  //Metodo que guarda el equipo al que se han dado valores en BD
  guardar():void{

    //Da la orden para mandar este equipo a traves de la api hacia el back
    this.equiposService.createEquipo(this.selectedEquipo).subscribe();
    this.router.navigateByUrl('/cardio/menuPrincipal/equipos');
 }


 //Metodo que actualiza un equipo y devuelve a la vista de ver todos los equipos
 update():void{


    //Manda el equipo seteado a traves de la api
    this.equiposService.update(this.selectedEquipo).subscribe();

   this.router.navigateByUrl('/cardio/menuPrincipal/equipos');
}

  IrAsignarCliente(){
    if(this.cliente.id>0){
      this.router.navigateByUrl('/cardio/menuPrincipal/clientes/edit/'+this.cliente.id);

    }
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
              this.equiposService.getClientes().subscribe(
                a=>this.clientes=a );
              this.equiposService.getEquipo(id).subscribe(
              as=>this.selectedEquipo=as );

          //marcador para mostrar en vista boton crear equipo
           }else{
            this.marcador=false;


             }
          }
        )
}


}
