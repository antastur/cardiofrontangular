import { Cliente } from "./cliente";
import { Lugar } from "./lugar";

export class Espacio {
  id!: number;
  direccion!: string;
  horario!: string;
  numTelef!: string;
  email!: string;
  fechRegDga!: Date;
  cliente!: Cliente;
  lugares!: Lugar[];
}
