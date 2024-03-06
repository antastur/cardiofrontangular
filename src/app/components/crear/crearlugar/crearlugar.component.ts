import { Subscription } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { LugaresService } from './../../../shared/services/lugares.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente';
import { Equipo } from 'src/app/shared/models/equipo';
import { Espacio } from 'src/app/shared/models/espacio';
import { Lugar } from 'src/app/shared/models/lugar';
import { Vehiculo } from 'src/app/shared/models/vehiculo';
import { ClienteidService } from 'src/app/shared/data/clienteid.service';
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
  subscription!: Subscription;

  //Constructor inyectando servicios necesarios
  constructor(private $clienteid: ClienteidService, private $lugaresService: LugaresService,
    private $vehiculoService: VehiculosService,private router: Router, private activatedRoute: ActivatedRoute,
    private toastrService: ToastrService) {
 }

 //Método en el que se inician variables y servicios necesarios
  ngOnInit() {
    this.lugar=new Lugar();
    this.vehiculo=new Vehiculo();
    this.espacio=new Espacio();
    //Se recupera el espacio guardado en el servicio de datos
    this.subscription=this.$clienteid.getEspacioObservable().subscribe(a=>this.espacio=a);
    this.equipo=new Equipo();
    this.cliente=new Cliente();
    //Se recupera el cliente guardado en el servicio de datos
    this.subscription=this.$clienteid.getClienteObservable().subscribe(a=>this.cliente=a);
    this.cargar();
  }

  //Metodo que redirecciona a un cliente en particular o deja uno vacio
  cargar(): void {

    this.activatedRoute.params.subscribe(
      a => {
        let id = a['id'];
        if (id) {
        //Obtención del lugar sobre el que se trabaja
        this.subscription=this.$lugaresService.getLugar(id).subscribe(ae => this.lugar = ae);
        this.equipo=this.lugar.equipo;
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

              //Si en la vista se ha escrito matricula será vehiculo
              if(this.lugar.matricula){
                    //Se setea el vehiculo con los datos del lugar(como tal se trata en la vista)
                    this.vehiculo.id=this.lugar.id;
                    this.vehiculo.espacio=this.espacio;
                    this.vehiculo.marca=this.lugar.marca;
                    this.vehiculo.matricula=this.lugar.matricula;
                    this.vehiculo.modelo=this.lugar.modelo;
                    this.vehiculo.telefono=this.lugar.telefono;
                    this.vehiculo.ubicacion=this.lugar.ubicacion;
                    //Se persiste ,da aviso y redirecciona CrearEspacio
                    this.subscription=this.$vehiculoService.createVehiculo(this.vehiculo).subscribe(()=>{
                    this.toastrService.success("Accion realizada");
                    this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/' + this.espacio.id);
                    });

                }
                //En caso de persistirse como lugar
                if(!this.lugar.matricula){
                     this.lugar.espacio=this.espacio;
                     this.subscription=this.$lugaresService.createLugar(this.lugar).subscribe(()=>{
                      this.toastrService.success("Accion realizada");
                      this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/' + this.espacio.id);
                    });

                   }

   }



//Método que persiste el lugar que se modifica teniendo en cuenta si es lugar o vehiculo y si tiene equipo asignado o no
update(){

  //Si el lugar tiene un equipo
  if(this.equipo){
                  //y es vehiculo se setean su equipo y espacio se actualiza notifica y reenvia a listar lugares
             if(this.lugar.matricula){

                this.lugar.equipo=this.equipo;
                this.lugar.espacio=this.espacio;
                this.subscription=this.$vehiculoService.updateVehiculo(this.lugar).subscribe(()=>{
                this.toastrService.success("Accion realizada");
                this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/' + this.espacio.id);
                });

              }
            //si es un lugar se hace lo mismo que si fuese vehiculo
            if(!this.lugar.matricula){


                this.lugar.equipo=this.equipo;
                this.lugar.espacio=this.espacio;
                console.log("espacio"+this.espacio.direccion)
                this.subscription=this.$lugaresService.updateLugar(this.lugar).subscribe(()=>{
                  this.toastrService.success("Accion realizada");
                  this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/' + this.espacio.id);
                });

                }
//si el lugar no tiene equipo solo se setea espacio sea vehiculo o lugar
  }else{

         if(this.lugar.matricula){

                this.lugar.espacio=this.espacio;
                this.subscription=this.$vehiculoService.updateVehiculo(this.lugar).subscribe(()=>{
                    this.toastrService.success("Accion realizada");
                    this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/' + this.espacio.id);
                    });

                }

            if(!this.lugar.matricula){

                  this.lugar.espacio=this.espacio;
                  this.subscription=this.$lugaresService.updateLugar(this.lugar).subscribe(()=>{
                    this.toastrService.success("Accion realizada");
                    this.router.navigateByUrl('/cardio/menuPrincipal/espacios/edit/' + this.espacio.id);
                  });

      }
    }
  }
}
