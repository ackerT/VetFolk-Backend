import { Module } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { Servicios } from '../entities/Servicios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AwsS3Service } from '../aws-s3/aws-s3.service';
import { Citas } from 'src/entities/Citas';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports:[TypeOrmModule.forFeature([Servicios, Citas]),
],

  providers: [ServiciosService, CloudinaryService],
  controllers: [ServiciosController]
})
export class ServiciosModule {}
