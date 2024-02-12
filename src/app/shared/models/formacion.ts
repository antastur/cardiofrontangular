import { Curso } from "./curso";

export class Formacion {
  id!: number;
  tipo!: string;
  dateFormacion!: Date;
  recuerdo!: Date;
  senaletica!: boolean;
  numAsistentes!: number;
  estado!: boolean;
  impartidor!: string;
  diplomas!: object[];
  alumnos!: object[];
  curso!: Curso;

}
