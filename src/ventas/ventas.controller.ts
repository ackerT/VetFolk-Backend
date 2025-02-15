import { Controller, Post, Body, Get} from '@nestjs/common';
import { VentasService } from './ventas.service';
import { CreateVentaDto } from 'src/dtos/CrearVentaDto';
import { CreateFacturaDto } from 'src/dtos/CrearFacturaDto';
import { GetVentasResponseDto } from 'src/dtos/ObtenerVentasDto';

@Controller('ventas')
export class VentasController {
    constructor(private readonly ventasService: VentasService) {}

    @Post()
    async crearVenta(@Body() createVentaDto: CreateVentaDto) {
        const venta = await this.ventasService.crearVenta(createVentaDto);
        
        const createFacturaDto: CreateFacturaDto = {
            idVenta: venta.idVenta,
            numeroFactura: createVentaDto.serieFactura,
            fecha: new Date(), // Fecha como string
            subtotal: (parseFloat(venta.total) / 1.15).toFixed(2), // Calculamos el subtotal
            isv: (parseFloat(venta.total) * 0.15).toFixed(2), // Calculamos el ISV
            total: venta.total
        };

        const factura = await this.ventasService.crearFactura(createFacturaDto);

        return { venta, factura };
    } 

    @Get('obtener')
    async obtenerVentas(): Promise<GetVentasResponseDto[]> {
        return await this.ventasService.obtenerVentas();
    }   
}