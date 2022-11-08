import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePostDTO } from './dto/create-post.dto';
import { updatePostDTO } from './dto/update-post.dto';
import { PostsRepository } from './posts.repository';




@Injectable()
export class PostsService {
  constructor( 
    @InjectRepository(PostsRepository)
    private readonly postsRepository: PostsRepository ) {}


  async createPost(user_id: number, postData: CreatePostDTO) {
    await this.postsRepository.createPost(user_id, postData); 
  }


  async getAllPosts() {
    return await this.postsRepository.getAllPosts();
  }


  async getPostById(post_id: number) {
    return await this.postsRepository.getPostById(post_id);
  }


  async updatePostById(user_id: number, post_id: number, postData: updatePostDTO) {
    const post = await this.postsRepository.getPostById(post_id);
    
    if(!post) throw new NotFoundException("Post Not Exist")

    if(post.user_id === user_id) await this.postsRepository.updatePostById(post_id, postData);
    else throw new ForbiddenException()
  }


  async deletePostById(user_id: number, post_id: number) {
    const post = await this.postsRepository.getPostById(post_id);
    
    if(!post) throw new NotFoundException("Post Not Exist")
    
    if(post.user_id === user_id) await this.postsRepository.deletePostById(post_id);
    else throw new ForbiddenException()
  }
}
