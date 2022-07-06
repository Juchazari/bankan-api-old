import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany
} from 'typeorm';

import { BoardGroup } from '../../board-groups/entities';
import { Board } from '../../boards/entities';
import { Section } from '../../sections/entities';
import { Task } from '../../tasks/entities';
import { Label } from '../../labels/entities';
import { Comment } from '../../comments/entities';
import { Attachment } from '../../attachmets/entities';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @Column()
  public fullName: string;

  @Column({ unique: true })
  public email: string;

  @Column()
  public password: string;

  @OneToMany(() => BoardGroup, (boardGroup) => boardGroup.owner)
  public boardGroups: BoardGroup[];

  @OneToMany(() => Board, (board) => board.owner)
  public boards: Board[];

  @OneToMany(() => Section, (section) => section.owner)
  public sections: Section[];

  @OneToMany(() => Task, (task) => task.owner)
  public tasks: Task[];

  @OneToMany(() => Label, (label) => label.owner)
  public labels: Label[];

  @OneToMany(() => Comment, (comment) => comment.owner)
  public comments: Comment[];

  @OneToMany(() => Attachment, (attachment) => attachment.owner)
  public attachments: Attachment[];

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}
