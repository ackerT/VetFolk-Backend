import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { Productos } from '../entities/Productos';
import { NotFoundException } from '@nestjs/common';
import { BadRequestException } from '@nestjs/common';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Injectable()
export class ProductosService {
    constructor(
        @InjectRepository(Productos)
        private readonly productoRepository: Repository<Productos>,
        private cloudinaryService : CloudinaryService

    ) {}

    // Obtener todos los productos
    async obtenerTodosLosProductos(): Promise<Productos[]> {
        return await this.productoRepository.find(); // Suponiendo que tienes una relación con la categoría
    }

    // Obtener productos por categoría
    async obtenerProductosPorCategoria(IdCategoria: number): Promise<Productos[]> {
        return await this.productoRepository.find({ where: { idCategoria : IdCategoria } } );
    } 

    async createProducto(data: any, file?: Express.Multer.File): Promise<Productos> {
        // Subir la imagen a S3 y obtener la URL
        const imagenUrl = await this.cloudinaryService.uploadFile(file);
        const nuevoProdcuto = this.productoRepository.create({
          idCategoria: data.idCategoria,
            nombre: data.nombre,
          descripcion: data.descripcion,
          precio: data.precio,
          stock: data.stock,
          imagenUrl: imagenUrl,
        });
    
        // Guardar en la base de datos
        return await this.productoRepository.save(nuevoProdcuto);
      }
    

      async buscarProductoPorNombre(nombre: string): Promise<Productos[]> {
        const productos = await this.productoRepository.find({
          where: { nombre: Like(`%${nombre}%`) },
          relations: ['idCategoria2'], // para incluir información de la categoría
        });
    
        if (!productos || productos.length === 0) {
          throw new NotFoundException(`No se encontraron productos con el nombre: ${nombre}`);
        }
        return productos;
      } 
      
      // Método para obtener todos los productos
  async findAll(): Promise<Productos[]> {
    return this.productoRepository.find();
  }

  // Método para actualizar el stock de un producto
  async updateStock(idProducto: number, cantidad: number): Promise<Productos> {
    const producto = await this.productoRepository.findOne({ where: { idProducto } });

    if (!producto) {
      throw new NotFoundException('Producto no encontrado');
    }

    if (producto.stock < cantidad) {
      throw new BadRequestException('Stock insuficiente');
    }

    producto.stock -= cantidad;
    return this.productoRepository.save(producto);
  } 

  // Servicio para obtener productos por categoría
async obtenerProductosPorCategoria2(idCategoria: number): Promise<Productos[]> {
  return await this.productoRepository.find({
    where: { idCategoria },
    relations: ['idCategoria2'], // Incluir la relación con la categoría
  });
}

// Servicio para editar un producto existente
async editarProducto(idProducto: number, data: any, file?: Express.Multer.File): Promise<Productos> {
  const producto = await this.productoRepository.findOne({ where: { idProducto } });
  if (!producto) {
    throw new NotFoundException(`Producto con id ${idProducto} no encontrado`);
  }

  // Subir nueva imagen si se proporciona
  if (file) {
    const imagenUrl = await this.cloudinaryService.uploadFile(file);
    producto.imagenUrl = imagenUrl;
  }

  // Actualizar otros campos
  producto.nombre = data.nombre;
  producto.descripcion = data.descripcion;
  producto.precio = data.precio;
  producto.stock = data.stock;
  producto.idCategoria = data.idCategoria;

  return await this.productoRepository.save(producto);
}





}
