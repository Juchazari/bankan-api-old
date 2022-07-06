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
import { Section } from '../../sections/entities';
import { Label } from '../../labels/entities';
import { Comment } from '../../comments/entities';
import { Attachment } from '../../attachmets/entities';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column()
  public name: string;

  @Column('text', { nullable: true })
  public description: string;

  @Column({ nullable: true })
  public banner: string;

  @Column({ type: 'timestamptz', nullable: true })
  public dueDate: Date;

  @ManyToOne(() => User, (user) => user.tasks)
  public owner: User;

  @Column()
  public sectionId: number;

  @ManyToOne(() => Section, (section) => section.tasks, { onDelete: 'CASCADE' })
  public section: Section;

  @OneToMany(() => Label, (label) => label.task)
  public labels: Label[];

  @OneToMany(() => Comment, (comment) => comment.task)
  public comments: Comment[];

  @OneToMany(() => Attachment, (attachment) => attachment.task)
  public attachments: Attachment[];

  @Column()
  @CreateDateColumn()
  public createdAt: Date;

  @Column()
  @UpdateDateColumn()
  public updatedAt: Date;
}
