import { Decimal128 } from "typeorm";

export class CrearMascotaDto {
  nombreMascota: string;
    edad: number;
    peso: Decimal128; 
    agresiva: boolean;
    esterilizada: boolean;
    fechaNacimiento?:Date;
    observaciones?: string;
    idEspecie?: number; 
    idPropietario?: number;
    idRaza?: number;
    idGenero?: number;
  }
  