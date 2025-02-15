import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Productos } from '../entities/Productos';
import { AwsS3Service } from '../aws-s3/aws-s3.service';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';

@Module({
  imports: [TypeOrmModule.forFeature([Productos])],
  providers: [ProductosService, AwsS3Service, CloudinaryService],
  controllers: [ProductosController]
})
export class ProductosModule {}
