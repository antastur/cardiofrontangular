import { Curso } from "./curso";
import { Espacio } from "./espacio";

export class Cliente {
  id!: number;
  cif!: string;
  nombEmp!: string;
  nombre!: string;
  apellidos!: string;
  dni!: string;
  direccionFiscal!: string;
  comercial!: string;
  espacios!: Espacio[];
  cursos!: Curso[];

}
