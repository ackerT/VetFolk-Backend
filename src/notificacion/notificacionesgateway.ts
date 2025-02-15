import { WebSocketGateway, SubscribeMessage, MessageBody } from '@nestjs/websockets';
import { NotificacionesService } from './notificacion.service';
import { Socket } from 'socket.io';

@WebSocketGateway()
export class NotificacionesGateway {
  constructor(private readonly notificacionesService: NotificacionesService) {}

  // Conectar al WebSocket
  handleConnection(client: Socket) {
    console.log('Cliente conectado:', client.id);

    // Al conectar, guardamos la referencia del socket en el servicio
    this.notificacionesService.setSocket(client);
  }

  // Desconectar del WebSocket
  handleDisconnect(client: Socket) {
    console.log('Cliente desconectado:', client.id);
  }
}
