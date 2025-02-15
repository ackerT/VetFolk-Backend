import { Module } from '@nestjs/common';
import { EstadosService } from './estados.service';
import { EstadosController } from './estados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Estados } from 'src/entities/Estados';

@Module({
  imports: [TypeOrmModule.forFeature([Estados])],
  providers: [EstadosService],
  controllers: [EstadosController],
})
export class EstadosModule {}
