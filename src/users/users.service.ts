import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDTO } from './dto/create-user.dto';
import { SignInUserDTO } from './dto/signin-user.dto';
import { UpdateUserDTO } from './dto/update-user.dto';
import { UsersRepository } from './users.repository';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';



@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository,
    private jwtService: JwtService
  ) {}



  async createUser(userData: CreateUserDTO) {
    const salt = bcrypt.genSaltSync(11);
    const hashedPw = bcrypt.hashSync(userData.password, salt);
    userData.password = hashedPw
    
    await this.usersRepository.createUser(userData);
  }


  async signInUser(userData: SignInUserDTO) {
    const user = await this.usersRepository.getUserByOptions({where: {email: userData.email}})
    
    if(!user) throw new NotFoundException("User Not Exist")
    
    if(user && (bcrypt.compareSync(userData.password, user.password))) {
      const token = this.jwtService.sign({ nickname: user.nickname });
      return {nickname: user.nickname, token};
    } else throw new UnauthorizedException("Login Fail")
  }


  /* 
  수정 필요
  async updateUser(user_id: number, userData: UpdateUserDTO) {
    await this.usersRepository.updateUser(user_id, userData);
  } */


  async deleteUser(user_id: number) {
    await this.usersRepository.deleteUser(user_id);
  }
}
