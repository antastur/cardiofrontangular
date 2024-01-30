import { Alumno } from "./alumno";
import { Formacion } from "./formacion";

export class Diploma {

  id!: number;
  dni!: string;
  nombre!: string;
  apellidos!: string;
  fecha!: Date;
  impartidor!: string;
  formacion!: Formacion;
  alumno!: Alumno;


}
