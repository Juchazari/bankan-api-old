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
import { BoardGroup } from '../../board-groups/entities';
import { Section } from '../../sections/entities';
import { File } from '../../files/entities';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @ManyToOne(() => User, (user) => user.boards, { onDelete: 'CASCADE' })
  public owner: User;

  @Column()
  public boardGroupId: number;

  @ManyToOne(() => BoardGroup, (boardGroup) => boardGroup.boards, { onDelete: 'CASCADE' })
  public boardGroup: BoardGroup;

  @OneToMany(() => Section, (section) => section.board)
  public sections: Section[];

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}
