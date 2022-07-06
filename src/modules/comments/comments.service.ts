import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Comment } from './entities';
import { CreateCommentDto, UpdateCommentDto } from './dto';
import { UsersService } from '../users';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comment)
    private commentsRepo: Repository<Comment>,
    private readonly usersService: UsersService
  ) {}

  async create(
    userId: string,
    createCommentDto: CreateCommentDto
  ): Promise<Omit<Comment, 'owner'>> {
    const owner = await this.usersService.getOneById(userId);

    const createComment = this.commentsRepo.create({
      ...createCommentDto,
      owner
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { owner: _, ...comment } = await this.commentsRepo.save(
      createComment
    );

    return comment;
  }

  async getAll(userId: string, taskId?: number): Promise<Comment[]> {
    const query = this.commentsRepo
      .createQueryBuilder('comment')
      .leftJoin('comment.owner', 'owner')
      .where('owner.id = :userId', { userId });

    if (taskId) {
      query
        .leftJoin('comment.task', 'task')
        .andWhere('task.id = :taskId', { taskId });
    }

    return await query.getMany();
  }

  async getOne(userId: string, id: number): Promise<Comment> {
    const comment = await this.commentsRepo
      .createQueryBuilder('comment')
      .leftJoin('comment.owner', 'owner')
      .where('owner.id = :userId', { userId })
      .andWhere('comment.id = :id', { id })
      .getOne();

    if (!comment) throw new NotFoundException();

    return comment;
  }

  async update(
    userId: string,
    id: number,
    updateCommentDto: UpdateCommentDto
  ): Promise<void> {
    const owner = await this.usersService.getOneById(userId);
    const result = await this.commentsRepo.update(
      { owner, id },
      updateCommentDto
    );

    if (!result.affected) throw new NotFoundException();

    return Promise.resolve();
  }

  async delete(userId: string, id: number): Promise<void> {
    const owner = await this.usersService.getOneById(userId);
    const result = await this.commentsRepo.delete({ owner, id });

    if (!result.affected) throw new NotFoundException();

    return Promise.resolve();
  }
}
