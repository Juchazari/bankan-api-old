import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from 'typeorm';

import { User } from '../../users/entities';
import { Board } from '../../boards/entities';
import { Task } from '../../tasks/entities';

@Entity()
export class Section {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(() => User, (user) => user.sections)
  public owner: User;

  @Column()
  public boardId: number;

  @ManyToOne(() => Board, (board) => board.sections, { onDelete: 'CASCADE' })
  public board: Board;

  @OneToMany(() => Task, (task) => task.section)
  public tasks: Task[];

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}
