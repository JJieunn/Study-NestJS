import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersController } from './users.controller';
import { UsersRepository } from './users.repository';
import { UsersService } from './users.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports : [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
      signOptions: {
        expiresIn: 120 * 60
      }
    }), 
    TypeOrmModule.forFeature([UsersRepository])],
  controllers: [UsersController],
  providers: [UsersService, JwtStrategy],
  exports: [PassportModule, JwtStrategy]
})
export class UsersModule {}
