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
export class Attachment {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public url: string;

  @Column()
  public key: string;

  @ManyToOne(() => User, (user) => user.attachments)
  public owner: User;

  @Column()
  public taskId: number;

  @ManyToOne(() => Task, (task) => task.attachments)
  public task: Task;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}
