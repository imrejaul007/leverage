import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { PostsGateway } from './posts.gateway';
import { Post } from './entities/post.entity';
import { Comment } from './entities/comment.entity';
import { PostLike } from './entities/post-like.entity';
import { Community } from './entities/community.entity';
import { CommunityMember } from './entities/community-member.entity';
import { CompanyProfile } from '../companies/entities/company-profile.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Comment, PostLike, Community, CommunityMember, CompanyProfile])],
  controllers: [PostsController],
  providers: [PostsService, PostsGateway],
  exports: [PostsService],
})
export class PostsModule {}
