export class Equipo {
  id!: number;
  numSerie!: string;
  marca!: string;
  modelo!: string;
  fabricante!: string;
  fechaFabricacion!: Date;
  fechaCaducidad!: Date;
  fechaMantenimiento!: Date;
  fechaEntrega!: Date;
  codAiviago!: string;
  pin!: string;
  puk!: string;
  operador!: string;
  numtlfnoAiviago!: string;
  numSerieCabina!: string;
  refCabina!: string;
  condicionUsado:boolean = false;
  docUsoCreada: boolean = false;
  senaletica: boolean = false;
  asignado: boolean =false;


}
