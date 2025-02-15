import { IsNotEmpty, IsOptional, IsString, IsInt, IsDateString } from 'class-validator';

export class CreateConsultaDto {

  idExpediente?: number;

  @IsOptional()
  idVeterinario?: number;

  idCita?: number;

  fechaConsulta: string;

  motivoConsulta: string;
 
  diagnostico: string;

  tratamiento: string;

  observaciones?: string;

imagenes?: string[];
  
}
