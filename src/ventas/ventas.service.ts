import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Ventas } from 'src/entities/Ventas';
import { Ventasproductos } from 'src/entities/Ventasproductos';
import { Facturas } from 'src/entities/Facturas';
import { CreateVentaDto } from 'src/dtos/CrearVentaDto';
import { CreateFacturaDto } from 'src/dtos/CrearFacturaDto';
import { Productos } from 'src/entities/Productos'; 
import { GetVentasResponseDto } from 'src/dtos/ObtenerVentasDto';

@Injectable()
export class VentasService {
    constructor(
        @InjectRepository(Ventas)
        private readonly ventasRepository: Repository<Ventas>,
        
        @InjectRepository(Ventasproductos)
        private readonly ventasProductosRepository: Repository<Ventasproductos>,
        
        @InjectRepository(Facturas)
        private readonly facturasRepository: Repository<Facturas>,
        
        @InjectRepository(Productos)
        private readonly productosRepository: Repository<Productos> // Repositorio de Productos
    ) {}

    async crearVenta(createVentaDto: CreateVentaDto) {
        const { idCliente, serieFactura, fecha, total, productos } = createVentaDto;
        
        const fechaFormateada = new Date(fecha).toISOString().split('T')[0]; // Solo 'YYYY-MM-DD'
        const nuevaVenta = this.ventasRepository.create({ idCliente, serieFactura, fecha:fechaFormateada, total });
        const ventaGuardada = await this.ventasRepository.save(nuevaVenta);

        // Guardar productos de la venta
        for (const producto of productos) {
            await this.ventasProductosRepository.save({
                idVenta: ventaGuardada.idVenta,
                idProducto: producto.idProducto,
                cantidad: producto.cantidad,
                precioUnitario: producto.precioUnitario,
            });
            
            // Actualizar el stock del producto
            await this.actualizarStock(producto.idProducto, producto.cantidad);
        }

        return ventaGuardada;
    }

    async crearFactura(createFacturaDto: CreateFacturaDto) {
        const nuevaFactura = this.facturasRepository.create(createFacturaDto);
        return await this.facturasRepository.save(nuevaFactura);
    }

    private async actualizarStock(idProducto: number, cantidadVendida: number) {
        const producto = await this.productosRepository.findOne({ where: { idProducto } });
        
        if (producto) {
            producto.stock = producto.stock - cantidadVendida;
            await this.productosRepository.save(producto);
        }
    } 


    async obtenerVentas(): Promise<GetVentasResponseDto[]> {
        // Consultamos todas las ventas con sus productos relacionados
        const ventas = await this.ventasRepository.find({
            relations: ['ventasproductos', 'ventasproductos.idProducto2'], // Relacionar con los productos
        });

        // Mapeamos los resultados para adaptarlos al formato deseado
        return ventas.map(venta => ({
            idVenta: venta.idVenta,
            fecha: venta.fecha, // La fecha ya debe estar en el formato correcto
            total: venta.total,
            productos: venta.ventasproductos.map(item => ({
                idProducto: item.idProducto,
                nombreProducto: item.idProducto2.nombre,  // Agregar el nombre del producto
                cantidad: item.cantidad,
                precioUnitario: item.precioUnitario,
            })),
        }));
    }
}
