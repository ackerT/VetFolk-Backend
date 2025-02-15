import { Controller, Get, Param, Query, Put } from '@nestjs/common';
import { NotificacionesService } from 'src/notificacion/notificacion.service';

@Controller('notificaciones')
export class NotificacionesController {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  @Get(':idUsuario')
  async obtenerNotificaciones(@Param('idUsuario') idUsuario: number) {
    return this.notificacionesService.obtenerNotificaciones(idUsuario);
  }

  @Put('marcar-leida/:idNotificacion')
  async marcarComoLeida(@Param('idNotificacion') idNotificacion: number) {
    return this.notificacionesService.marcarComoLeida(idNotificacion);
  }
}
