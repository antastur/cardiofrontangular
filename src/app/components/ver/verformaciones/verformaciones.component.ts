import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/shared/models/curso';
import { Formacion } from 'src/app/shared/models/formacion';
import { CursosService } from 'src/app/shared/services/cursos.service';
import { FormacionesService } from 'src/app/shared/services/formacionesService';

@Component({
  selector: 'app-verformaciones',
  templateUrl: './verformaciones.component.html',
  styleUrls: ['./verformaciones.component.css']
})
export class VerformacionesComponent implements OnInit{
  curso!: Curso;
   //Declaracion de variables
   formaciones!: Formacion[];



   //Constructor
  constructor(public cursoServicio: CursosService,public formacionesService: FormacionesService,private router: Router,private activatedRoute: ActivatedRoute){}

   ngOnInit(): void {


    this.curso=new Curso();

    this.cargar();
   }



   cargar():void{
    this.activatedRoute.params.subscribe(
      a=>{
        let id=a['id'];
        if(id){
          this.cursoServicio.getFormacionesUnCurso(id).subscribe(

             as=>this.formaciones=as
          );
          this.cursoServicio.getCurso(id).subscribe(
            as=>this.curso=as
          );
        }
      })}




//Metodo para borrar un curso de BD
deleteCurso(formacion: Curso):void{
  console.log('borrado');
  console.log(formacion.id);
  this.formacionesService.deleteFormacion(formacion.id).subscribe(
    res =>this.formacionesService.getFormaciones().subscribe(
      response=>this.formaciones=response
    ));

    }



}
