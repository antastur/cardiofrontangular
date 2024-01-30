import { Cliente } from "./cliente";
import { Formacion } from "./formacion";

export class Curso {
  id!: number;
  nombre!: string;
  formaciones!: Formacion[];
  cliente!: Cliente;
}
