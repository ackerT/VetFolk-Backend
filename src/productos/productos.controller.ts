import { Controller, Get, Put, Param, Query, Post, Body, UploadedFile, UseInterceptors, HttpCode, Patch, HttpStatus  } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { Productos } from '../entities/Productos';
import { NotFoundException } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UpdateStockDto } from '../dtos/UpdateStockDto';

@Controller('productos')
export class ProductosController {

    constructor(private readonly productosService: ProductosService) {}

    // Ruta para obtener todos los productos
    @Get()
    async obtenerTodosLosProductos(): Promise<Productos[]> {
        return await this.productosService.obtenerTodosLosProductos();
    }

    // Ruta para obtener productos por categoría
    @Get('/categoria/:id')
    async obtenerProductosPorCategoria(@Param('id') id: number): Promise<Productos[]> {
        return await this.productosService.obtenerProductosPorCategoria(id);
    } 

    @Get('buscar')
    async buscarProductoPorNombre(@Query('nombre') nombre: string): Promise<Productos[]> {
      if (!nombre) {
        throw new NotFoundException('El parámetro "nombre" es obligatorio');
      }
      return this.productosService.buscarProductoPorNombre(nombre);
    }
  

    @Post('crear')
  @UseInterceptors(FileInterceptor('file'))
  async create(@Body() body: any, @UploadedFile() file: Express.Multer.File) {
    return this.productosService.createProducto(body, file);
  }

  @Patch('update-stock')
  @HttpCode(HttpStatus.OK)
  async updateStock(@Body() updateStockDto: UpdateStockDto) {
    const { idProducto, cantidad } = updateStockDto;
    return this.productosService.updateStock(idProducto, cantidad);
  }

// Endpoint para obtener productos por categoría
@Get('por-categoria')
async obtenerProductosPorCategoria2(@Query('idCategoria') idCategoria: number): Promise<Productos[]> {
  if (!idCategoria) {
    throw new NotFoundException('El parámetro "idCategoria" es obligatorio');
  }
  return this.productosService.obtenerProductosPorCategoria(idCategoria);
} 

// Endpoint para editar un producto
@Put(':id')
@UseInterceptors(FileInterceptor('file'))
async editarProducto(
  @Param('id') id: number,
  @Body() body: any,
  @UploadedFile() file?: Express.Multer.File,
) {
  return this.productosService.editarProducto(id, body, file);
}



}
