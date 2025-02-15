import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Consultas } from 'src/entities/Consultas';
import { Repository } from 'typeorm';
import { CreateConsultaDto } from 'src/dtos/CrearConsultaDto';
import { UpdateConsultaDto } from 'src/dtos/UpdateConsultaDto';
import { NotFoundException } from '@nestjs/common';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ConsultasService {
    constructor(
      @InjectRepository(Consultas)
      private readonly consultasRepository: Repository<Consultas>,
      private cloudinaryService: CloudinaryService
    ) {}
  
   
    async createConsulta(createConsultaDto: CreateConsultaDto, files: Express.Multer.File[]): Promise<Consultas> {
      if (!createConsultaDto.idVeterinario || isNaN(createConsultaDto.idVeterinario)) {
        createConsultaDto.idVeterinario = null; // Si es vacío o no es un número válido, asigna null
      }
    
      // Subir imágenes a AWS S3
      let imagenesUrls: string[] = [];
      if (files && files.length > 0) {
        imagenesUrls = await this.cloudinaryService.uploadFiles(files);
      }
    
      // Asociar las URLs de las imágenes al DTO
      createConsultaDto.imagenes = imagenesUrls;
    
      const nuevaConsulta = this.consultasRepository.create(createConsultaDto);
      return await this.consultasRepository.save(nuevaConsulta);
    }
    
      
  
    
    async findAllConsultas(): Promise<Consultas[]> {
      return await this.consultasRepository.find({
        relations: ['idExpediente2', 'idVeterinario2', 'idCita2'],
      });
    }

    async obtenerConsultasPorExpediente(idExpediente: number): Promise<Consultas[]> {
        try {
          return await this.consultasRepository.find({
            where: { idExpediente },
            relations: ['idExpediente2', 'idVeterinario2', 'idCita2'], // Relaciones opcionales según tus necesidades
          });
        } catch (error) {
          throw new Error(`Error al obtener las consultas: ${error.message}`);
        }
      } 


      async getConsultasByExpedienteId(idExpediente: number): Promise<Consultas[]> {
        return await this.consultasRepository.find({
          where: { idExpediente },
          relations: ['idExpediente2', 'idVeterinario2'], // Para incluir detalles adicionales
        });
      }

      async updateConsulta(
        idConsultas: number,
        updateConsultaDto: UpdateConsultaDto
      ): Promise<Consultas> {
        const consulta = await this.consultasRepository.findOne({
          where: { idConsultas },
        });
      
        if (!consulta) {
          throw new Error("Consulta no encontrada");
        }
      
        // Actualizar solo los campos que se pasan en el DTO
        consulta.motivoConsulta = updateConsultaDto.motivoConsulta;
        consulta.diagnostico = updateConsultaDto.diagnostico;
        consulta.tratamiento = updateConsultaDto.tratamiento;
        if (updateConsultaDto.observaciones) {
          consulta.observaciones = updateConsultaDto.observaciones;
        }
      
        // Si se envían imágenes, subirlas a S3
        if (updateConsultaDto.imagenes && updateConsultaDto.imagenes.length > 0) {
          // Subir todas las imágenes nuevas
          const uploadPromises = updateConsultaDto.imagenes.map(file =>
            this.cloudinaryService.uploadFile(file)
          );
          const imageUrls = await Promise.all(uploadPromises);
          consulta.imagenes = imageUrls; // Guardamos las URLs de las imágenes subidas
        } else {
          // Si no se envían imágenes, aseguramos que el campo de imágenes esté vacío
          consulta.imagenes = [];
        }
      
        // Guardar la consulta actualizada
        return this.consultasRepository.save(consulta);
      }
      
      
      async getConsultaById(idConsulta: number): Promise<Consultas> {
        const consulta = await this.consultasRepository.findOne({
          where: { idConsultas: idConsulta }, // Asegúrate de que el nombre del campo coincida con el de tu base de datos
        });
    
        if (!consulta) {
          throw new NotFoundException('Consulta no encontrada');
        }
    
        return consulta;
      }
  }
