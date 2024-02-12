import { Component, Input } from '@angular/core';
import { Equipo } from 'src/app/shared/models/equipo';
import { Espacio } from 'src/app/shared/models/espacio';
import { Vehiculo } from 'src/app/shared/models/vehiculo';

@Component({
  selector: 'app-vervehiculos',
  templateUrl: './vervehiculos.component.html',
  styleUrls: ['./vervehiculos.component.css']
})
export class VervehiculosComponent {


  equiposHijo!: Equipo[];
  vehiculos!: Vehiculo[];
  @Input() equipoHijo!: Equipo;
  espacio!: Espacio;
 //Constructor
 constructor(){

 }


  ngOnInit(): void {

    this.equipoHijo=new Equipo();
    this.espacio=new Espacio();
}









asignarEquipo(equipo: Equipo){

}






}
