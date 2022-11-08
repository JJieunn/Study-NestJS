import { EntityRepository, Repository } from "typeorm";
import { commentDTO } from "./dto/comment.dto";
import { Comments } from "./entities/comments.entity";



@EntityRepository(Comments)
export class CommentsRepository extends Repository<Comments> {
  
  async getCommentById(comment_id: number): Promise<Comments> {
    return this.findOne(comment_id);
  }


  async getCommentsByPostId(post_id: number): Promise<Comments[]> {
    return this.find({ where: {post_id}, order: {updated_at: "DESC"}});
  }


  async createComment(user_id: number, post_id: number, commentData: commentDTO): Promise<void> {
    const { comment } = commentData;
    const comments = this.create({ user_id, post_id, comment });
    
    await this.save(comments);
  }


  async updateComment(comment_id: number, commentData: commentDTO): Promise<void> {
    await this.update(comment_id, commentData);
  }


  async deleteComment(comment_id: number): Promise<void> {
    await this.delete(comment_id);
  }
  
}
