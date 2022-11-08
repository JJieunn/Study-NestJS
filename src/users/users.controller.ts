import { Body, Controller, Delete, Param, ParseIntPipe, Patch, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDTO } from './dto/create-user.dto';
import { SignInUserDTO } from './dto/signin-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersService } from './users.service';



@Controller('users')
export class UsersController {
  constructor( private readonly usersService: UsersService ) {}

  @Post('/signup')
  async createUser( @Body() userData: CreateUserDTO, @Res() res: any) {
    await this.usersService.createUser(userData);
    res.status(201).json({ message: "User_Created" });
  }


  @Post('/signin')
  async signInUser( @Body() userData: SignInUserDTO ) {
    return await this.usersService.signInUser(userData);
  }


 /*  
 수정 필요
 @Patch()
  @UseGuards(AuthGuard())
  async updateUser( 
    @Req() req,
    @Body() userData: UpdateUserDTO,
    @Res() res ) {

    await this.usersService.updateUser(req.user.id, userData);
    res.status(201).json({ message: "User_Info_Updated" })
  } */

  // 비식별화 방식으로 수정 필요
  @Delete('/delete')
  @UseGuards(AuthGuard())
  async deleteUser(
    @Req() req,
    // @Param('user_id', ParseIntPipe) user_id: number,
    @Res() res ) {

    await this.usersService.deleteUser(req.user.id);
    res.status(204).json({ message: "User_Deleted" })
  }
}