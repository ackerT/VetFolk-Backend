import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Servicios } from 'src/entities/Servicios';
import { AwsS3Service } from '../aws-s3/aws-s3.service';
import { Citas } from 'src/entities/Citas';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ServiciosService {
    

  constructor(
    @InjectRepository(Servicios)
    private serviciosRepository: Repository<Servicios>,
    @InjectRepository(Citas)
    private citasRepository: Repository<Citas>,
    private cloudinaryService : CloudinaryService,

  ) {}

  findAll() {
    return this.serviciosRepository.find();
  }
 
  async createServicio(data: any, file?: Express.Multer.File): Promise<Servicios> {
    const imagenUrl = await this.cloudinaryService.uploadFile(file);

    // Crear el objeto de servicio
    const nuevoServicio = this.serviciosRepository.create({
      tipoServicio: data.tipoServicio,
      descripcion: data.descripcion,
      precio: data.precio,
      detalles: data.detalles,
      imagenUrl: imagenUrl,
    });

    // Guardar en la base de datos
    return await this.serviciosRepository.save(nuevoServicio);
  }

  async deleteServicio(id: number): Promise<void> {
    // Buscar el servicio por id
    const servicio = await this.serviciosRepository.findOne({
      where: { idServicio: id },
      relations: ['citas'], // Asegurarse de cargar las citas asociadas
    });

    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }

    // Eliminar las citas asociadas al servicio
    for (const cita of servicio.citas) {
      await this.citasRepository.remove(cita);
    }

    // Eliminar el servicio
    await this.serviciosRepository.remove(servicio);
  }


  async updateServicio(id: number, data: any, file?: Express.Multer.File): Promise<Servicios> {
    // Buscar el servicio por id
    const servicio = await this.serviciosRepository.findOne({
      where: { idServicio: id },
      relations: ['citas'], // Asegurarse de cargar las citas asociadas
    });

    if (!servicio) {
      throw new NotFoundException(`Servicio con ID ${id} no encontrado`);
    }

    // Si se proporciona un nuevo archivo de imagen, subirlo a S3 y actualizar la URL
    let imagenUrl = servicio.imagenUrl; // Mantener la URL actual si no hay nueva imagen
    if (file) {
      imagenUrl = await this.cloudinaryService.uploadFile(file);
    }

    // Actualizar los campos del servicio
    servicio.tipoServicio = data.tipoServicio || servicio.tipoServicio;
    servicio.descripcion = data.descripcion || servicio.descripcion;
    servicio.precio = data.precio || servicio.precio;
    servicio.detalles = data.detalles || servicio.detalles;
    servicio.imagenUrl = imagenUrl;

    // Guardar los cambios en la base de datos
    return await this.serviciosRepository.save(servicio);
  }

}
