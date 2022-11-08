import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CreatePostDTO } from './dto/create-post.dto';
import { updatePostDTO } from './dto/update-post.dto';
import { PostsService } from './posts.service';
import { AuthGuard } from '@nestjs/passport'


@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService ) {}



  @Post()
  @UseGuards(AuthGuard())
  async createPost(
    @Req() req,
    @Body() postData: CreatePostDTO,
    @Res() res) {
    
    await this.postsService.createPost(req.user.id, postData); 
    res.status(200).json({ message: "Post_Created" });
  }


  @Get()
  async getAllPosts() {
    return await this.postsService.getAllPosts(); 
  }


  @Get(':post_id')
  async getPostById( @Param('post_id', ParseIntPipe) post_id: number ) {
    return await this.postsService.getPostById(post_id); 
  }


  @Patch(':post_id')
  @UseGuards(AuthGuard())
  async updatePostById(
    @Req() req,
    @Param('post_id', ParseIntPipe) post_id: number,
    @Body() postData: updatePostDTO,
    @Res() res: any) {

    await this.postsService.updatePostById(req.user.id, post_id, postData);
    res.status(200).json({ message: "Post_Updated" });
  }


  @Delete(':post_id')
  @UseGuards(AuthGuard())
  async deletePostById( 
    @Req() req,
    @Param('post_id', ParseIntPipe) post_id: number,
    @Res() res: any) {

    await this.postsService.deletePostById(req.user.id, post_id);
    res.status(204).json({ message: "Post_Deleted" });
  }
}
