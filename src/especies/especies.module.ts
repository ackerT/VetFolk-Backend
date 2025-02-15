import { Module } from '@nestjs/common';
import { EspeciesService } from './especies.service';
import { EspeciesController } from './especies.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Especies } from 'src/entities/Especies';

@Module({
  imports: [TypeOrmModule.forFeature([Especies])],
  providers: [EspeciesService],
  controllers: [EspeciesController]
})
export class EspeciesModule {}
