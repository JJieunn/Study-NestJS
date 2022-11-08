import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { Posts } from "src/posts/entities/posts.entity";
import { Comments } from "src/comments/entities/comments.entity";
import { Users } from "src/users/entities/users.entity";
import * as dotenv from "dotenv"

dotenv.config();

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: "mysql",
  host: process.env.TYPEORM_HOST,
  port: 3306,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  entities:[Users, Posts, Comments],
  synchronize: false
}
