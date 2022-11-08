import { Comments } from "src/comments/entities/comments.entity";
import { Posts } from "src/posts/entities/posts.entity";
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, DeleteDateColumn } from "typeorm";

@Entity("users")
export class Users extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { unique: true, length: 15 })
  email: string;

  @Column("varchar", { length: 1500 })
  password: string;
  
  @Column("varchar", { length: 15 })
  nickname: string;

  @Column("varchar", { unique: true, length: 20 })
  phone_number: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at!: Date;

  @OneToMany(() => Posts, (post) => post.user)
  posts: Posts[];

  @OneToMany(() => Comments, (comment) => comment.user)
  comments: Comments[];
}