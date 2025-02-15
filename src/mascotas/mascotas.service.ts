import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mascotas } from 'src/entities/Mascotas';
import { CrearMascotaDto } from '../dtos/CrearMascotaDto';
import { NotFoundException } from '@nestjs/common';
import { UpdateMascotaDto } from 'src/dtos/UpdateMascotasDto';

@Injectable()
export class MascotasService {
  constructor(
    @InjectRepository(Mascotas)
    private mascotasRepository: Repository<Mascotas>,
  ) {}

  // Método para crear una mascota
  async create(createMascotaDto: CrearMascotaDto): Promise<Mascotas> {
    const { nombreMascota, edad, peso, agresiva, esterilizada, fechaNacimiento, observaciones, 
      idEspecie, idPropietario, idGenero, idRaza } = createMascotaDto;

    const mascota = this.mascotasRepository.create({
      nombreMascota,
      fechaNacimiento,
      edad,
      peso, 
      agresiva,
      esterilizada,
      observaciones,
      idEspecie,
      idRaza,
      idGenero,
      idPropietario,
    });

    return this.mascotasRepository.save(mascota);
  }

  async getAllMascotas(): Promise<Mascotas[]> {
    const mascotas = await this.mascotasRepository.find();

    return mascotas;
  } 

  async findAllExp(): Promise<Mascotas[]> {
    return await this.mascotasRepository.find({
      relations: ['expedientes'], // Cargar relaciones si es necesario
    });
  }


   // Método para encontrar una mascota por id
   async findById(idMascota: number): Promise<Mascotas> {
    const mascota = await this.mascotasRepository.findOne({
      where: { idMascota },
    });

    if (!mascota) {
      throw new NotFoundException('Mascota no encontrada');
    }

    return mascota;
  }

  // Método para actualizar una mascota
  async update(idMascota: number, updateMascotaDto: UpdateMascotaDto): Promise<Mascotas> {
    const mascota = await this.mascotasRepository.findOne({ where: { idMascota } });
    
    if (!mascota) {
      throw new Error('Mascota no encontrada');
    }

    const { nombreMascota, edad, peso, agresiva, esterilizada, fechaNacimiento, observaciones, 
      idEspecie, idPropietario, idGenero, idRaza } = updateMascotaDto;

    // Actualizar los campos de la mascota
    mascota.nombreMascota = nombreMascota ?? mascota.nombreMascota;
    mascota.edad = edad ?? mascota.edad;
    mascota.peso = peso ?? mascota.peso;
    mascota.agresiva = agresiva ?? mascota.agresiva;
    mascota.esterilizada = esterilizada ?? mascota.esterilizada;
    mascota.fechaNacimiento = fechaNacimiento ?? mascota.fechaNacimiento;
    mascota.observaciones = observaciones ?? mascota.observaciones;
    mascota.idEspecie = idEspecie ?? mascota.idEspecie;
    mascota.idRaza = idRaza ?? mascota.idRaza;
    mascota.idGenero = idGenero ?? mascota.idGenero;
    mascota.idPropietario = idPropietario ?? mascota.idPropietario;

    return this.mascotasRepository.save(mascota);
  }
}
