import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { User } from '../../users/entities';
import { Task } from '../../tasks/entities';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public body: string;

  @ManyToOne(() => User, (user) => user.comments)
  public owner: User;

  @Column()
  public taskId: number;

  @ManyToOne(() => Task, (task) => task.comments)
  public task: Task;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}
