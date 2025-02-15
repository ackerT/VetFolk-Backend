import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mascotas } from '../entities/Mascotas';
import { MascotasService } from './mascotas.service';
import { MascotasController } from './mascotas.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Mascotas])],
  providers: [MascotasService],
  controllers: [MascotasController],
})
export class MascotasModule {}
