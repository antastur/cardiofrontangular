import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Curso } from 'src/app/shared/models/curso';
import { CursosService } from 'src/app/shared/services/cursos.service';
import {MatTableModule} from '@angular/material/table';
import { Cliente } from 'src/app/shared/models/cliente';
import { ClientesService } from 'src/app/shared/services/clientes.service';










@Component({
  selector: 'app-vercursos',
  templateUrl: './vercursos.component.html',
  styleUrls: ['./vercursos.component.css']
})
export class VercursosComponent implements OnInit {


  cliente!: Cliente;
   //Declaracion de variables
   cursos!: Curso[];
   //curso!: Curso;


   //Constructor
  constructor(public clienteServicio: ClientesService,public cursoService: CursosService,private router: Router,private activatedRoute: ActivatedRoute){}

   ngOnInit(): void {


    this.cliente=new Cliente();

    this.cargar();
   }



   cargar():void{
    this.activatedRoute.params.subscribe(
      a=>{
        let id=a['id'];
        if(id){
          this.clienteServicio.getCursosUnCliente(id).subscribe(

             as=>this.cursos=as
          );
          this.clienteServicio.getCliente(id).subscribe(
            as=>this.cliente=as
          );
        }
      })}




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



