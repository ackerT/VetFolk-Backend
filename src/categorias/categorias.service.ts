import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Categorias } from '../entities/Categorias';
import { Repository } from 'typeorm';

@Injectable()
export class CategoriasService {
    constructor(
        @InjectRepository(Categorias)
        private categoriaRepository: Repository<Categorias>,
      ) {}

  async obtenerTodasLasCategoriasConProductos() {
    const categorias = await this.categoriaRepository.find({
      relations: ['productos'], // Carga las relaciones de productos
    });

    return categorias;
  }
}


