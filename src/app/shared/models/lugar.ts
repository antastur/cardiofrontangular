import { Equipo } from "./equipo";
import { Espacio } from "./espacio";

export class Lugar {
  id!: number;
  ubicacion!: string;
  equipo!: Equipo;
  espacio!: Espacio;
  marca!: string;
  modelo!: string;
  matricula!: string;
  telefono!: string;
  //dtype!:string;
}
