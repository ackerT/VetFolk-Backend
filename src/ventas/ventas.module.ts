import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VentasService } from './ventas.service';
import { VentasController } from './ventas.controller';
import { Ventas } from '../entities/Ventas';
import { Ventasproductos } from '../entities/Ventasproductos';
import { Facturas } from '../entities/Facturas';
import { Productos } from '../entities/Productos';

@Module({
  imports: [TypeOrmModule.forFeature([Ventas, Ventasproductos, Facturas, Productos])],
  providers: [VentasService],
  controllers: [VentasController],
})
export class VentasModule {}
