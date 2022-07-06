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

@Entity()
export class BoardGroup {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(() => User, (user) => user.boardGroups, { onDelete: 'CASCADE' })
  public owner: User;

  @OneToMany(() => Board, (board) => board.boardGroup)
  public boards: Board[];

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}
