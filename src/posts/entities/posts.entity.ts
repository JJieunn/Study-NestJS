import { Comments } from "src/comments/entities/comments.entity";
import { Users } from "src/users/entities/users.entity";
import { BaseEntity, Column, CreateDateColumn, UpdateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity("posts")
export class Posts extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("varchar", { length: 30 })
  title: string;

  @Column("varchar", { length: 1500 })
  content: string;

  @Column("varchar", { nullable: true, length: 2000, default: null })
  image_url: string;

  @Column("int")
  user_id: number;

  @CreateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)"
  })
  created_at: Date;

  @UpdateDateColumn({
    type: "timestamp",
    default: () => "CURRENT_TIMESTAMP(6)",
    onUpdate: "CURRENT_TIMESTAMP(6)",
  })
  updated_at!: Date;

  @ManyToOne(() => Users, (user) => user.posts)
  @JoinColumn({ name: "user_id", referencedColumnName: "id" })
  user: Users;

  @OneToMany(() => Comments, (comment) => comment.post)
  comments: Comments[];
}