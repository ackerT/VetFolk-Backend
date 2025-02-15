import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpedientesService } from './expedientes.service';
import { ExpedientesController } from './expedientes.controller';
import { Expedientes } from '../entities/Expedientes';

@Module({
  imports: [TypeOrmModule.forFeature([Expedientes])],
  controllers: [ExpedientesController],
  providers: [ExpedientesService],
})
export class ExpedientesModule {}
