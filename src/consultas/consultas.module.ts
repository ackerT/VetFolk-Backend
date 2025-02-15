import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsultasService } from './consultas.service';
import { ConsultasController } from './consultas.controller';
import { Consultas } from 'src/entities/Consultas';
import { AwsS3Service } from 'src/aws-s3/aws-s3.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Consultas])],
  controllers: [ConsultasController],
  providers: [ConsultasService, AwsS3Service, CloudinaryService],
  exports: [ConsultasService], // Si necesitas usar el servicio en otros módulos
})
export class ConsultasModule {}
