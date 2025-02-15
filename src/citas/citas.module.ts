import { Module } from '@nestjs/common';
import { CitasService } from './citas.service';
import { CitasController } from './citas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Citas } from 'src/entities/Citas';
import { Estados } from 'src/entities/Estados';
import { Servicios } from 'src/entities/Servicios';
import { NotificacionesModule } from 'src/notificacion/notificacion.module';
import { Notificacion } from 'src/entities/Notificacion';
import { NotificacionesService } from 'src/notificacion/notificacion.service';

@Module({
  imports:[TypeOrmModule.forFeature([Citas, Estados, Servicios, Notificacion])],
  providers: [CitasService,NotificacionesService],
  controllers: [CitasController]
})
export class CitasModule {}
