import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Users } from "./entities/users.entity";
import { UsersRepository } from "./users.repository";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly usersRepository: UsersRepository
  ) {
    super({
      secretOrKey: process.env.SECRET_KEY,
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
    })
  }

  async validate(payload) {
    const { nickname } = payload;
    const user: Users = await this.usersRepository.findOne({ nickname })
    
    if(!user) throw new UnauthorizedException("User Not Exist");

    return user;
  }
}