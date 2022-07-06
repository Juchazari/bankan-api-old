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
export class Label {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column()
  public color: string;

  @ManyToOne(() => User, (user) => user.labels)
  public owner: User;

  @Column()
  public taskId: number;

  @ManyToOne(() => Task, (task) => task.labels)
  public task: Task;

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}
