import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostsRepository } from 'src/posts/posts.repository';
import { CommentsRepository } from './comments.repository';
import { commentDTO } from './dto/comment.dto';



@Injectable()
export class CommentsService {
  constructor( 
    @InjectRepository(CommentsRepository)
    @InjectRepository(PostsRepository)
    private readonly commentsRepository: CommentsRepository,
    private readonly postsRepository: PostsRepository ) {}

  
  async createComment(user_id: number, post_id: number, commentData: commentDTO) {
    const post = await this.postsRepository.getPostById(post_id);
    if(!post) throw new NotFoundException("Post Not Exist")

    await this.commentsRepository.createComment(user_id, post_id, commentData);
  }

  
  async getAllComments(post_id: number) {
    const post = await this.postsRepository.getPostById(post_id);
    if(!post) throw new NotFoundException("Post Not Exist")

    return await this.commentsRepository.getCommentsByPostId(post.id)
  }


  async updateComment(user_id: number, comment_id: number, commentData: commentDTO) {
    const comment = await this.commentsRepository.getCommentById(comment_id);
    
    if(comment.user_id === user_id) await this.commentsRepository.updateComment(comment_id, commentData);
    else throw new ForbiddenException()
  }


  async deleteComment(user_id: number, comment_id: number) {
    const comment = await this.commentsRepository.getCommentById(comment_id);

    if(comment.user_id === user_id) await this.commentsRepository.deleteComment(comment_id);
    else throw new ForbiddenException()
  }
}
