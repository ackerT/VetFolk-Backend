import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Citas } from 'src/entities/Citas';
import { CreateCitaDto } from './dto/createCita.dto'; 
import { NotFoundException } from '@nestjs/common';
import { UpdateCitaDto } from 'src/dtos/UpdateCitaDto';
import { NotificacionesService } from 'src/notificacion/notificacion.service';
import { Estados } from 'src/entities/Estados';
import { Servicios } from 'src/entities/Servicios';

@Injectable()
export class CitasService {
    constructor(
        @InjectRepository(Citas)
        private CitaRepository: Repository<Citas>,
        @InjectRepository(Estados)
        private EstadoRepository: Repository<Estados>,
        @InjectRepository(Servicios)
        private ServicioRepository: Repository<Servicios>,
        private readonly notificacionesService: NotificacionesService,

      ) {}
    

      async create(createCitaDto: CreateCitaDto): Promise<Citas> {
        const { idServicio, fecha, hora, idUsuario, nombreMascota } = createCitaDto;
    
        // Verificar si ya existe una cita con la misma fecha, hora y tipo de servicio
        const citaExistente = await this.CitaRepository.findOne({
          where: { fecha, hora, idServicio },
        });
    
        if (citaExistente) {
          throw new Error('Ya existe una cita para esta fecha, hora y tipo de servicio');
        }
    
        // Crear la cita y asignar idEstado a 1 automáticamente
        const cita = this.CitaRepository.create({
          ...createCitaDto,
          idEstado: 1, // Asignar estado inicial
        });
    
        const nuevaCita = await this.CitaRepository.save(cita);
    
        // Obtener detalles del servicio y estado
        const servicio = await this.ServicioRepository.findOne({ where: { idServicio } });
        const estado = await this.EstadoRepository.findOne({ where: { idEstado: 1 } }); // estado "Pendiente" por ejemplo
    
        // Crear la notificación
        await this.notificacionesService.create({
          idUsuario: idUsuario,
          mensaje: `Se ha creado una cita para ${nombreMascota} con el servicio de ${servicio?.tipoServicio} en estado ${estado?.estado}.`,
          fecha: new Date(),
        });
    
        return nuevaCita;
      }
    
    
      async verificarDisponibilidad(fecha: string, hora: string, idServicio: number): Promise<boolean> {
        const citaExistente = await this.CitaRepository.findOne({
          where: { fecha, hora, idServicio },
        });
        return !!citaExistente; // Devuelve true si existe la cita, false si no
      }
    
      async obtenerCitas(): Promise<Citas[]> {
        return this.CitaRepository.find();
      } 


      async getCitaById(idCita: number): Promise<Citas> {
        const persona = await this.CitaRepository.findOne({
          where: { idCita },
        });
    
        if (!persona) {
          throw new NotFoundException(`Persona con id ${idCita} no encontrada`);
        }
    
        return persona;
      } 


      async updateCita(idCita: number, updateCitaDto: UpdateCitaDto): Promise<Citas> {
        const cita = await this.CitaRepository.findOne({
          where: { idCita },
        });
    
        if (!cita) {
          throw new Error("Consulta no encontrada");
        }
    
        // Obtener los detalles de la cita antes de actualizar
        const { idUsuario, nombreMascota } = cita;
        const { idEstado, comentarios } = updateCitaDto;
    
        // Actualizar solo los campos que se pasan en el DTO
        cita.idEstado = idEstado;
        cita.comentarios = comentarios;
    
        // Obtener detalles del servicio y estado
        const servicio = await this.ServicioRepository.findOne({ where: { idServicio: cita.idServicio } });
        const estado = await this.EstadoRepository.findOne({ where: { idEstado } });
    
        // Guardar la consulta actualizada
        const updatedCita = await this.CitaRepository.save(cita);
    
        // Crear la notificación
        await this.notificacionesService.create({
          idUsuario: idUsuario,
          mensaje: `La cita para ${nombreMascota} con el servicio de ${servicio?.tipoServicio} ha cambiado a estado ${estado?.estado}.`,
          fecha: new Date(),
        });
    
        return updatedCita;
      }

      async obtenerCitasPorUsuario(idUsuario: number): Promise<any[]> {
        return this.CitaRepository
          .createQueryBuilder('citas')
          .leftJoinAndSelect('citas.idUsuario2', 'usuario') // Relación con Usuarios
          .leftJoinAndSelect('usuario.idUsuario2', 'persona') // Relación con Personas
          .leftJoinAndSelect('citas.idServicio2', 'servicio') // Relación con Servicios
          .leftJoinAndSelect('citas.idEstado2', 'estado') // Relación con Estados
          .select([
            'citas.idCita',
            'citas.fecha',
            'citas.hora',
            'citas.nombreMascota',
            'servicio.tipoServicio', // Nombre del servicio
            'estado.estado ', // Nombre del estado
          ])
          .where('usuario.idUsuario = :idUsuario', { idUsuario }) // Filtro por usuario
          .getRawMany(); // Usar getRawMany para devolver campos seleccionados personalizados
      }
      
      
   
}
