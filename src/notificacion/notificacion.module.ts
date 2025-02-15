import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificacionesService } from './notificacion.service';
import { Notificacion } from 'src/entities/Notificacion';
import { Usuarios } from 'src/entities/Usuarios';
import { NotificacionesController } from './notificacion.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Notificacion, Usuarios])],
  providers: [NotificacionesService],
  controllers: [NotificacionesController], // Controlador de notificaciones
})
export class NotificacionesModule {}