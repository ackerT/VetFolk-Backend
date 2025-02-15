import { Module } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CategoriasController } from './categorias.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Categorias } from '../entities/Categorias';

@Module({
  imports: [TypeOrmModule.forFeature([Categorias])],
  providers: [CategoriasService],
  controllers: [CategoriasController]
})
export class CategoriasModule {}
