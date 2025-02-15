export class UpdateConsultaDto {
    motivoConsulta?: string;
    diagnostico?: string;
    tratamiento?: string;
    observaciones?: string;  
    imagenes?: Express.Multer.File[];
  }