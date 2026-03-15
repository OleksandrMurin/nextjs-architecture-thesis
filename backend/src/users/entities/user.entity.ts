import { Comment } from 'src/comments/entities/comment.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Post } from '../../posts/entities/post.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column({ select: false })
  passwordHash: string;

  @OneToMany(() => Post, (post) => post.user, { cascade: true })
  posts: Post[];

  @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
  comments: Comment[];
}
