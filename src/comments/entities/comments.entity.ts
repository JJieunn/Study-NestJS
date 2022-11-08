import { Posts } from "src/posts/entities/posts.entity";
import { Users } from "src/users/entities/users.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("comments")
export class Comments extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 255 })
  comment: string;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)"
  })
  updated_at: Date;

  @Column("int")
  user_id: number;

  @Column("int")
  post_id: number;

  @ManyToOne(() => Users, (user) => user.comments)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: Users;

  @ManyToOne(() => Posts, (post) => post.comments)
  @JoinColumn({ name: "post_id", referencedColumnName: "id" })
  post: Posts;
}