import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/messages' })
export class MessagesGateway {
  @WebSocketServer()
  server: Server;

  private userSockets = new Map<string, Set<string>>();

  @SubscribeMessage('join')
  handleJoin(@MessageBody() data: { userId: string }, @ConnectedSocket() client: Socket) {
    if (!this.userSockets.has(data.userId)) {
      this.userSockets.set(data.userId, new Set());
    }
    this.userSockets.get(data.userId).add(client.id);
    return { success: true };
  }

  @SubscribeMessage('join_conversation')
  handleJoinConversation(@MessageBody() data: { conversationId: string }, @ConnectedSocket() client: Socket) {
    client.join(`conv:${data.conversationId}`);
  }

  @SubscribeMessage('send_message')
  handleSendMessage(@MessageBody() data: any) {
    this.server.to(`conv:${data.conversationId}`).emit('new_message', data);

    // Send notification to offline users
    const userId = data.recipientId;
    if (this.userSockets.has(userId)) {
      this.userSockets.get(userId).forEach(socketId => {
        this.server.to(socketId).emit('message_notification', data);
      });
    }
  }

  @SubscribeMessage('typing')
  handleTyping(@MessageBody() data: { conversationId: string; userId: string }, @ConnectedSocket() client: Socket) {
    client.to(`conv:${data.conversationId}`).emit('user_typing', data);
  }

  @SubscribeMessage('read')
  handleRead(@MessageBody() data: { conversationId: string; messageId: string }) {
    this.server.to(`conv:${data.conversationId}`).emit('message_read', data);
  }
}
