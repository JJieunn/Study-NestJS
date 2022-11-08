import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { commentDTO } from './dto/comment.dto';
import { AuthGuard } from '@nestjs/passport';


@Controller('comments')
export class CommentsController {
  constructor(
    private readonly commentsService: CommentsService ) {}



  @Post(':post_id')
  @UseGuards(AuthGuard())
  async createComment(
    @Req() req,
    @Param('post_id', ParseIntPipe) post_id: number, 
    @Body() commentData: commentDTO,
    @Res() res ) {

    await this.commentsService.createComment(req.user.id, post_id, commentData);
    res.status(201).json({ "message": "Comment_Created" })
  }


  @Get(':post_id')
  async getAllComments( @Param('post_id', ParseIntPipe) post_id: number ) {
    return await this.commentsService.getAllComments(post_id);
  }


  @Patch(':comment_id')
  @UseGuards(AuthGuard())
  async updateComment(
    @Req() req,
    @Param('comment_id', ParseIntPipe) comment_id: number,
    @Body() commentData: commentDTO,
    @Res() res ) {

    await this.commentsService.updateComment(req.user.id, comment_id, commentData);
    res.status(201).json({ "message": "Comment_Updated" })
  }


  @Delete(':comment_id')
  @UseGuards(AuthGuard())
  async deleteComment(
    @Req() req,
    @Param('comment_id', ParseIntPipe) comment_id: number,
    @Res() res ) {

    await this.commentsService.deleteComment(req.user.id, comment_id);
    res.status(204).json({ "message": "Comment_Deleted" })
  }
}
