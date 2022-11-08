import { EntityRepository, Repository } from "typeorm";
import { CreatePostDTO } from "./dto/create-post.dto";
import { updatePostDTO } from "./dto/update-post.dto";
import { Posts } from "./entities/posts.entity";

@EntityRepository(Posts)
export class PostsRepository extends Repository<Posts> {
  
  async createPost(user_id: number, postData: CreatePostDTO): Promise<void> {
    const { title, content, image_url } = postData;
    const post = this.create({ user_id, title, content, image_url })
    
    await this.save(post);
  }

  async getAllPosts(): Promise<Posts[]> {
    return await this.find({ order: {created_at: "DESC"} });
  }

  async getPostById(post_id: number): Promise<Posts> {
    return await this.findOne(post_id);
  }

  async updatePostById(post_id: number, updateData: updatePostDTO): Promise<void> {
    await this.update(post_id, updateData);
  }

  async deletePostById(post_id: number): Promise<void> {
    await this.delete(post_id);
  }

}
