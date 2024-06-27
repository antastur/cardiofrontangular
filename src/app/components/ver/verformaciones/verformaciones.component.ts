import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { FormacionDto } from 'src/app/shared/models/FormacionDto';
import { Curso } from 'src/app/shared/models/curso';
import { Formacion } from 'src/app/shared/models/formacion';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { FormacionesService } from 'src/app/shared/services/formacionesService';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmationDialogComponent } from "src/app/components/confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-verformaciones',
  templateUrl: './verformaciones.component.html',
  styleUrls: ['./verformaciones.component.css']
})
export class VerformacionesComponent implements OnInit{

  @Input() cursoHijo!: Curso;
  curso!: Curso;
   //Declaracion de variables
   formaciones!: Formacion[];
  //Subscripcion para gestionar todas y cerrarlas al salir del componente
  subscription!: Subscription;


   //Constructor
  constructor(public dialogo: MatDialog,public cursoServicio: CursosService,public formacionesService: FormacionesService,private router: Router,private activatedRoute: ActivatedRoute,private toastrService: ToastrService){}

   ngOnInit(): void {


    this.curso=new Curso();

    this.reloadData();
   }



  //Metodo para ejecutar en el inicio de la app y traer todos los equipos de la BD
  reloadData() {

 //this.curso=this.cursoHijo;
 this.subscription=this.cursoServicio.getFormacionesUnCurso(this.cursoHijo.id).subscribe(e=>this.formaciones=e);

 }



//Metodo para borrar un curso de BD
deleteCurso(formacion: Curso):void{
  console.log('borrado');
  console.log(formacion.id);
  this.formacionesService.deleteFormacion(formacion.id).subscribe(
    res =>this.formacionesService.getFormaciones().subscribe(
      response=>this.formaciones=response
    ));

    }



    //Metodo para borrar una formacion
    deleteFormacion(formacion: Formacion):void{


      //Se ejecuta el metodo y en la subscripcion se actualizan los datos de la vista y se lanza mensaje de ok
      this.subscription=this.formacionesService.deleteFormacion(formacion.id).subscribe(()=>{
      //Se fuerza el borrado de la formacion en la vista
      this.formaciones=this.formaciones.filter(a=> a !== formacion);
      //SE lanza mensaje de accion
       this.toastrService.success("Acción realizada")},
        );
    }


    mostrarDialogo(formacion: Formacion): void {
      this.dialogo
        .open(ConfirmationDialogComponent, {
          data: `¿Seguro que quieres borrar la formación?`
        })
        .afterClosed()
        .subscribe((confirmado: Boolean) => {
          if (confirmado) {
            this.deleteFormacion(formacion);
            this.toastrService.success("Formación borrada");

          } else {
            this.toastrService.success("Formación NO borrada");
          }
        });
    }




}
