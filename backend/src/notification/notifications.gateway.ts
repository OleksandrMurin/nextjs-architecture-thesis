import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' } })
export class NotificationGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;

  handleConnection(client: Socket) {
    console.log('WS connected:', client.id);
  }
  handleDisconnect(client: Socket) {
    console.log('WS disconnected:', client.id);
  }

  emitExhibitCreated(payload: any) {
    this.server.emit('exhibit.created', payload);
  }
}
