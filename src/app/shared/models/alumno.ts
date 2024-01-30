import { Diploma } from "./diploma";
import { Formacion } from "./formacion";

export class Alumno {
  id!: number;
  dniAlumno!: string;
  nombre!: string;
  apellidos!: string;
  formacion!: Formacion;
  diploma!: Diploma;

}
