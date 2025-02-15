import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from 'src/entities/Notificacion';
import { Socket } from 'socket.io';

@Injectable()
export class NotificacionesService {
  constructor(
    @InjectRepository(Notificacion)
    private notificacionRepository: Repository<Notificacion>,
  ) {}

  private socket: Socket;

  // Configura tu servidor WebSocket
  setSocket(socket: Socket) {
    this.socket = socket;
  }

  async create(notificacionData: { idUsuario: number; mensaje: string; fecha: Date }): Promise<Notificacion> {
    const notificacion = this.notificacionRepository.create(notificacionData);
    const nuevaNotificacion = await this.notificacionRepository.save(notificacion);
    if (this.socket) {
      this.socket.emit('nueva_notificacion', nuevaNotificacion);
    }

    return nuevaNotificacion;
  }

  async obtenerNotificaciones(idUsuario: number): Promise<Notificacion[]> {
    return this.notificacionRepository.find({
      where: { idUsuario },
      order: { fecha: 'DESC' },
    });
  }

  // Puedes agregar un método para marcar las notificaciones como leídas, si lo necesitas.
  async marcarComoLeida(idNotificacion: number): Promise<void> {
    await this.notificacionRepository.update(idNotificacion, { leida: true });
  }
}
