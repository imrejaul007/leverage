import { WebSocketGateway, WebSocketServer, SubscribeMessage } from '@nestjs/websockets';
import { Server } from 'socket.io';

@WebSocketGateway({ cors: { origin: '*' }, namespace: '/posts' })
export class PostsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('new_post')
  handleNewPost(data: any) {
    this.server.emit('post_created', data);
  }

  @SubscribeMessage('like_post')
  handleLike(data: { postId: string; userId: string }) {
    this.server.to(`post:${data.postId}`).emit('post_liked', data);
  }

  @SubscribeMessage('comment_post')
  handleComment(data: any) {
    this.server.to(`post:${data.postId}`).emit('new_comment', data);
  }
}
