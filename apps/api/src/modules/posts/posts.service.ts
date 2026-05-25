import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { PostLike } from './entities/post-like.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postRepo: Repository<Post>,
    @InjectRepository(Comment)
    private commentRepo: Repository<Comment>,
    @InjectRepository(PostLike)
    private likeRepo: Repository<PostLike>,
  ) {}

  async create(authorId: string, dto: any) {
    const hashtags = this.extractHashtags(dto.content);
    const mentions = this.extractMentions(dto.content);

    const post = this.postRepo.create({
      ...dto,
      authorId,
      hashtags,
      mentions,
    });
    return this.postRepo.save(post);
  }

  async findAll(filters: any) {
    const [posts, total] = await this.postRepo.findAndCount({
      relations: ['author'],
      order: { createdAt: 'DESC' },
      take: filters.limit || 20,
      skip: (filters.page - 1) || 0,
    });
    return { posts, total };
  }

  async findOne(id: string) {
    const post = await this.postRepo.findOne({
      where: { id },
      relations: ['author'],
    });
    if (!post) throw new NotFoundException('Post not found');

    return post;
  }

  async update(id: string, dto: any) {
    await this.postRepo.update(id, dto);
    return this.findOne(id);
  }

  async delete(id: string) {
    await this.postRepo.delete(id);
    return { success: true };
  }

  async like(postId: string, userId: string) {
    const existing = await this.likeRepo.findOne({ where: { postId, userId } as any });
    if (existing) return { liked: true };

    const like = this.likeRepo.create({ postId, userId });
    await this.likeRepo.save(like);
    return { liked: true };
  }

  async unlike(postId: string, userId: string) {
    await this.likeRepo.delete({ postId, userId } as any);
    return { liked: false };
  }

  async addComment(postId: string, userId: string, dto: any) {
    const comment = this.commentRepo.create({
      ...dto,
      postId,
      userId,
    });
    await this.postRepo.increment({ id: postId }, 'commentsCount', 1);
    return comment;
  }

  async getComments(postId: string) {
    return this.commentRepo.find({
      where: { postId },
      order: { createdAt: 'ASC' },
    });
  }

  private extractHashtags(content: string): string[] {
    const matches = content.match(/#\w+/g);
    return matches ? matches.map(h => h.slice(1)) : [];
  }

  private extractMentions(content: string): string[] {
    const matches = content.match(/@\w+/g);
    return matches ? matches.map(m => m.slice(1)) : [];
  }
}
