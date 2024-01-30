import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Cliente } from 'src/app/shared/models/cliente';
import { ClientesService } from 'src/app/shared/services/clientes.service';

@Component({
  selector: 'app-verclientes',
  templateUrl: './verclientes.component.html',
  styleUrls: ['./verclientes.component.css']
})
export class VerclientesComponent {
    //Declaracion de variables
    clientes!: Cliente[];

  //Constructor
  constructor(public clientesServicio: ClientesService,private router: Router){}

  ngOnInit(): void {
     //se cargan todos los alumnos de BD
     this.reloadData();
  }


  reloadData(){
    this.clientesServicio.getClientes().subscribe(e=>this.clientes=e);
  }


  //Metodo para borrar un
  deleteCliente(cliente: Cliente):void{
    console.log('borrado');
    console.log(cliente.id);
    this.clientesServicio.deleteCliente(cliente.id).subscribe(
      res =>this.clientesServicio.getClientes().subscribe(
        response=>this.clientes=response
      ));

      }
}
