import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Expedientes } from '../entities/Expedientes';
import { CreateExpedienteDto } from '../dtos/CrearExpedienteDto';
import { UpdateExpedienteDto } from 'src/dtos/UpdateExpedienteDto';

@Injectable()
export class ExpedientesService {
  constructor(
    @InjectRepository(Expedientes)
    private expedienteRepository: Repository<Expedientes>,
  ) {}

  // Método para crear un expediente
  async create(createExpedienteDto: CreateExpedienteDto): Promise<Expedientes> {
    const expediente = this.expedienteRepository.create(createExpedienteDto);
    return await this.expedienteRepository.save(expediente);
  }

  // Método para obtener todos los expedientes
  async findAll(): Promise<Expedientes[]> {
    return await this.expedienteRepository.find({
      relations: ['idMascota2', 'consultas'], // Cargar relaciones si es necesario
    });
  }

  async obtenerConsultasPorExpediente(idExpediente: number): Promise<Expedientes[]> {
    try {
      return await this.expedienteRepository.find({
        where: { idExpediente },
        relations: ['consultas'], // Relaciones opcionales según tus necesidades
      });
    } catch (error) {
      throw new Error(`Error al obtener las consultas: ${error.message}`);
    }
  }

  async getExpedientesByMascotaId(idMascota: number): Promise<Expedientes[]> {
    return await this.expedienteRepository.find({
      where: { idMascota },
      relations: ['idMascota2'], // Para incluir detalles de la mascota si es necesario
    });
  }

  // Método para obtener un expediente por idExpediente
  async findOne(idExpediente: number): Promise<Expedientes> {
    const expediente = await this.expedienteRepository.findOne({
      where: { idExpediente },
      relations: ['idMascota2', 'consultas'],
    });

    if (!expediente) {
      throw new Error(`Expediente con id ${idExpediente} no encontrado`);
    }

    return expediente;
  }

  // Método para actualizar un expediente
  async update(idExpediente: number, updateExpedienteDto: UpdateExpedienteDto): Promise<Expedientes> {
    const expediente = await this.expedienteRepository.findOne({
      where: { idExpediente },
    });

    if (!expediente) {
      throw new Error(`Expediente con id ${idExpediente} no encontrado`);
    }

    // Actualizar los campos del expediente con la nueva información
    Object.assign(expediente, updateExpedienteDto);

    return await this.expedienteRepository.save(expediente);
  }
}


