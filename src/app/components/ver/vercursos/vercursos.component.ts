import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Curso } from 'src/app/shared/models/curso';
import { CursosService } from 'src/app/shared/services/cursos.service';
import {MatTableModule} from '@angular/material/table';










@Component({
  selector: 'app-vercursos',
  templateUrl: './vercursos.component.html',
  styleUrls: ['./vercursos.component.css']
})
export class VercursosComponent implements OnInit {



   //Declaracion de variables
   cursos!: Curso[];



   //Constructor
  constructor(public cursoService: CursosService,private router: Router){}

   ngOnInit(): void {
     //se cargan todos los cursos de BD
     this.reloadData();
   }



 reloadData(){
    this.cursoService.getCursos().subscribe(e=>this.cursos=e);
  }


//Metodo para borrar un curso de BD
deleteCurso(curso: Curso):void{
  console.log('borrado');
  console.log(curso.id);
  this.cursoService.deleteCurso(curso.id).subscribe(
    res =>this.cursoService.getCursos().subscribe(
      response=>this.cursos=response
    ));

    }



}



