import { Controller, Get } from '@nestjs/common';
import { CategoriasService } from './categorias.service';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriaService: CategoriasService) {}

  @Get('/obtener')
  async obtenerCategoriasConProductos() {
    return this.categoriaService.obtenerTodasLasCategoriasConProductos();
  }
}
