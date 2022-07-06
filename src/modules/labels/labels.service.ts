import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Label } from './entities';
import { CreateLabelDto, UpdateLabelDto } from './dto';
import { UsersService } from '../users';

@Injectable()
export class LabelsService {
  constructor(
    @InjectRepository(Label)
    private labelsRepo: Repository<Label>,
    private readonly usersService: UsersService
  ) {}

  async create(
    userId: string,
    createLabelDto: CreateLabelDto
  ): Promise<Omit<Label, 'owner'>> {
    const owner = await this.usersService.getOneById(userId);

    const createLabel = this.labelsRepo.create({
      ...createLabelDto,
      owner
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { owner: _, ...label } = await this.labelsRepo.save(createLabel);

    return label;
  }

  async getAll(userId: string, taskId?: number): Promise<Label[]> {
    const query = this.labelsRepo
      .createQueryBuilder('label')
      .leftJoin('label.owner', 'owner')
      .where('owner.id = :userId', { userId });

    if (taskId) {
      query
        .leftJoin('label.task', 'task')
        .andWhere('task.id = :taskId', { taskId });
    }

    return await query.getMany();
  }

  async getOne(userId: string, id: number): Promise<Label> {
    const label = await this.labelsRepo
      .createQueryBuilder('label')
      .leftJoin('label.owner', 'owner')
      .where('owner.id = :userId', { userId })
      .andWhere('label.id = :id', { id })
      .getOne();

    if (!label) throw new NotFoundException();

    return label;
  }

  async update(
    userId: string,
    id: number,
    updateLabelDto: UpdateLabelDto
  ): Promise<void> {
    const owner = await this.usersService.getOneById(userId);
    const result = await this.labelsRepo.update({ owner, id }, updateLabelDto);

    if (!result.affected) throw new NotFoundException();

    return Promise.resolve();
  }

  async delete(userId: string, id: number): Promise<void> {
    const owner = await this.usersService.getOneById(userId);
    const result = await this.labelsRepo.delete({ owner, id });

    if (!result.affected) throw new NotFoundException();

    return Promise.resolve();
  }
}
