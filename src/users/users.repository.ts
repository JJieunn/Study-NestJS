import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import { EntityRepository, FindOneOptions, Repository } from "typeorm";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdateUserDTO } from "./dto/update-user.dto";
import { Users } from "./entities/users.entity";



@EntityRepository(Users)
export class UsersRepository extends Repository<Users> {


  async getUserByOptions(options: FindOneOptions<CreateUserDTO> ): Promise<CreateUserDTO> | undefined {
    return await this.findOne(options);
  }


  async createUser(userData: CreateUserDTO): Promise<void> {
    const { email, password, nickname, phone_number } = userData;
    const user = this.create({ email, password, nickname, phone_number })

    try {
      await this.save(user);
    } catch (error) {
      if(error.errno === 1062) throw new ConflictException("Existing Email");
      else throw new InternalServerErrorException();
    }
  }


/* 
  수정 필요
  async updateUser(user_id: number, userData: UpdateUserDTO): Promise<void> {
    await this.update(user_id, userData);
  } */


  async deleteUser(user_id: number): Promise<void> {
    await this.delete(user_id);
  }
}
