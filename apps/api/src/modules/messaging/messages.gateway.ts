import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WsException,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { JwtService } from '@nestjs/jwt';
import { Logger, UseGuards } from '@nestjs/common';

interface AuthenticatedSocket extends Socket {
  userId?: string;
}

@WebSocketGateway({
  cors: {
    origin: process.env.ALLOWED_ORIGINS?.split(',') || [process.env.FRONTEND_URL || 'http://localhost:3000'],
    credentials: true,
  },
  namespace: '/messages',
})
export class MessagesGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(MessagesGateway.name);
  private userSockets = new Map<string, Set<string>>();

  constructor(private jwtService: JwtService) {}

  async handleConnection(client: AuthenticatedSocket) {
    try {
      const token = this.extractToken(client);
      if (!token) {
        this.logger.warn(`Client ${client.id} connected without token - disconnecting`);
        client.disconnect();
        return;
      }

      const payload = await this.jwtService.verifyAsync(token);
      client.userId = payload.sub;
      client.join(`user:${payload.sub}`);

      if (!this.userSockets.has(payload.sub)) {
        this.userSockets.set(payload.sub, new Set());
      }
      this.userSockets.get(payload.sub).add(client.id);

      this.logger.log(`User ${payload.sub} connected with socket ${client.id}`);
    } catch (error) {
      this.logger.warn(`Client ${client.id} authentication failed - disconnecting`);
      client.disconnect();
    }
  }

  handleDisconnect(client: AuthenticatedSocket) {
    if (client.userId) {
      const sockets = this.userSockets.get(client.userId);
      if (sockets) {
        sockets.delete(client.id);
        if (sockets.size === 0) {
          this.userSockets.delete(client.userId);
        }
      }
      this.logger.log(`User ${client.userId} disconnected socket ${client.id}`);
    }
  }

  private extractToken(client: Socket): string | null {
    const authHeader = client.handshake.headers.authorization;
    if (authHeader?.startsWith('Bearer ')) {
      return authHeader.substring(7);
    }

    const token = client.handshake.auth?.token || client.handshake.query?.token;
    return token as string || null;
  }

  @SubscribeMessage('join')
  handleJoin(@MessageBody() data: { userId?: string }, @ConnectedSocket() client: AuthenticatedSocket) {
    if (!client.userId) {
      throw new WsException('Not authenticated');
    }

    const targetUserId = data.userId || client.userId;

    if (!this.userSockets.has(targetUserId)) {
      this.userSockets.set(targetUserId, new Set());
    }
    this.userSockets.get(targetUserId).add(client.id);
    client.join(`conv:${targetUserId}`);

    return { success: true, userId: targetUserId };
  }

  @SubscribeMessage('join_conversation')
  handleJoinConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    if (!client.userId) {
      throw new WsException('Not authenticated');
    }

    client.join(`conv:${data.conversationId}`);
    client.to(`conv:${data.conversationId}`).emit('user_joined', { userId: client.userId });

    return { success: true, conversationId: data.conversationId };
  }

  @SubscribeMessage('leave_conversation')
  handleLeaveConversation(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    if (!client.userId) {
      throw new WsException('Not authenticated');
    }

    client.leave(`conv:${data.conversationId}`);
    client.to(`conv:${data.conversationId}`).emit('user_left', { userId: client.userId });

    return { success: true, conversationId: data.conversationId };
  }

  @SubscribeMessage('send_message')
  handleSendMessage(@MessageBody() data: { conversationId: string; recipientId?: string; content: string }, @ConnectedSocket() client: AuthenticatedSocket) {
    if (!client.userId) {
      throw new WsException('Not authenticated');
    }

    const messageData = {
      ...data,
      senderId: client.userId,
      timestamp: new Date().toISOString(),
    };

    this.server.to(`conv:${data.conversationId}`).emit('new_message', messageData);

    if (data.recipientId && this.userSockets.has(data.recipientId)) {
      this.userSockets.get(data.recipientId).forEach(socketId => {
        this.server.to(socketId).emit('message_notification', messageData);
      });
    }

    return { success: true, message: messageData };
  }

  @SubscribeMessage('typing')
  handleTyping(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    if (!client.userId) {
      throw new WsException('Not authenticated');
    }

    client.to(`conv:${data.conversationId}`).emit('user_typing', {
      conversationId: data.conversationId,
      userId: client.userId,
    });
  }

  @SubscribeMessage('stop_typing')
  handleStopTyping(
    @MessageBody() data: { conversationId: string },
    @ConnectedSocket() client: AuthenticatedSocket,
  ) {
    if (!client.userId) {
      throw new WsException('Not authenticated');
    }

    client.to(`conv:${data.conversationId}`).emit('user_stopped_typing', {
      conversationId: data.conversationId,
      userId: client.userId,
    });
  }

  @SubscribeMessage('read')
  handleRead(@MessageBody() data: { conversationId: string; messageId: string }, @ConnectedSocket() client: AuthenticatedSocket) {
    if (!client.userId) {
      throw new WsException('Not authenticated');
    }

    this.server.to(`conv:${data.conversationId}`).emit('message_read', {
      ...data,
      readBy: client.userId,
    });
  }

  emitToUser(userId: string, event: string, data: unknown) {
    this.server.to(`user:${userId}`).emit(event, data);
  }

  emitToConversation(conversationId: string, event: string, data: unknown) {
    this.server.to(`conv:${conversationId}`).emit(event, data);
  }
}
