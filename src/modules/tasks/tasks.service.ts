import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './entities';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { UsersService } from '../users';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task) private tasksRepo: Repository<Task>,
    private readonly usersService: UsersService
  ) {}

  async create(
    userId: string,
    createTaskDto: CreateTaskDto
  ): Promise<Omit<Task, 'owner'>> {
    const owner = await this.usersService.getOneById(userId);

    const createTask = this.tasksRepo.create({
      ...createTaskDto,
      owner
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { owner: _, ...task } = await this.tasksRepo.save(createTask);

    return task;
  }

  async getAll(userId: string, sectionId?: number): Promise<Task[]> {
    const query = this.tasksRepo
      .createQueryBuilder('task')
      .leftJoin('task.owner', 'owner')
      .where('owner.id = :userId', { userId });

    if (sectionId) {
      query
        .leftJoin('task.section', 'section')
        .andWhere('section.id = :sectionId', { sectionId });
    }

    return await query.getMany();
  }

  async getOne(userId: string, id: number): Promise<Task> {
    const task = await this.tasksRepo
      .createQueryBuilder('task')
      .leftJoin('task.owner', 'owner')
      .where('owner.id = :userId', { userId })
      .andWhere('task.id = :id', { id })
      .getOne();

    if (!task) throw new NotFoundException();

    return task;
  }

  async update(
    userId: string,
    id: number,
    updateTaskDto: UpdateTaskDto
  ): Promise<void> {
    const owner = await this.usersService.getOneById(userId);
    const result = await this.tasksRepo.update({ owner, id }, updateTaskDto);

    if (!result.affected) throw new NotFoundException();

    return Promise.resolve();
  }

  async delete(userId: string, id: number): Promise<void> {
    const owner = await this.usersService.getOneById(userId);
    const result = await this.tasksRepo.delete({ owner, id });

    if (!result.affected) throw new NotFoundException();

    return Promise.resolve();
  }
}
