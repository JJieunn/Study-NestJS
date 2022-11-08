import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsRepository } from 'src/posts/posts.repository';
import { UsersModule } from 'src/users/users.module';
import { CommentsController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { CommentsService } from './comments.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([CommentsRepository, PostsRepository]),
    UsersModule
  ],
  controllers: [CommentsController],
  providers: [CommentsService]
})
export class CommentsModule {}
