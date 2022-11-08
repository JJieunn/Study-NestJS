import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { PostsController } from './posts.controller';
import { PostsRepository } from './posts.repository';
import { PostsService } from './posts.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([PostsRepository]),
    UsersModule
  ],
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
