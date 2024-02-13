import { Equipo } from "./equipo";
import { Espacio } from "./espacio";
import { Lugar } from "./lugar";

export class Vehiculo extends Lugar {
  override id!: number;
  override ubicacion!: string;
  override equipo!: Equipo;
  override espacio!: Espacio;
   override marca!: string;
   override modelo!: string;
   override matricula!: string;
   override telefono!: string;

}


