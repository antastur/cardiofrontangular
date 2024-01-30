import { Equipo } from "./equipo";
import { Espacio } from "./espacio";

export class Lugar {
  id!: number;
  ubicacion!: string;
  equipo!: Equipo;
  espacio!: Espacio;
}
