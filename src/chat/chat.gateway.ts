import { WebSocketGateway, WebSocketServer, SubscribeMessage, MessageBody, OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({
  namespace: 'chat',  // Define the namespace, e.g., 'chat'
})
export class ChatGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer() server: Server; // WebSocket server instance

  // Called once the gateway is initialized
  afterInit() {
    console.log('WebSocket Gateway Initialized');
  }

  // Called whenever a client connects
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  // Called whenever a client disconnects
  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  // Listener for incoming 'message' events from clients
  @SubscribeMessage('message')
  handleMessage(@MessageBody() data: { msg: string }): void {
    console.log(`Message received: ${data.msg}`);

    // Emit message to all connected clients
    this.server.emit('message', { msg: `Server received: ${data.msg}` });
  }

  // Example method to emit messages to all clients at regular intervals
  startBroadcast() {
    setInterval(() => {
      this.server.emit('message', { msg: 'Broadcast message from server' });
    }, 1000);  // Sends a broadcast every 5 seconds
  }
}
