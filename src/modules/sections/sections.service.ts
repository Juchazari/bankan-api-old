import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Section } from './entities';
import { CreateSectionDto, UpdateSectionDto } from './dto';
import { UsersService } from '../users';

@Injectable()
export class SectionsService {
  constructor(
    @InjectRepository(Section) private sectionsRepo: Repository<Section>,
    private readonly usersService: UsersService
  ) {}

  async create(
    userId: string,
    createSectionDto: CreateSectionDto
  ): Promise<Omit<Section, 'owner'>> {
    const owner = await this.usersService.getOneById(userId);

    const createSection = this.sectionsRepo.create({
      ...createSectionDto,
      owner
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { owner: _, ...section } = await this.sectionsRepo.save(
      createSection
    );

    return section;
  }

  async getAll(userId: string, boardId?: number): Promise<Section[]> {
    const query = this.sectionsRepo
      .createQueryBuilder('section')
      .leftJoin('section.owner', 'owner')
      .where('owner.id = :userId', { userId })
      .orderBy('section.createdAt', 'ASC');

    if (boardId) {
      query
        .leftJoin('section.board', 'board')
        .andWhere('board.id = :boardId', { boardId });
    }

    return await query.getMany();
  }

  async getOne(userId: string, id: number): Promise<Section> {
    const section = await this.sectionsRepo
      .createQueryBuilder('section')
      .leftJoin('section.owner', 'owner')
      .where('owner.id = :userId', { userId })
      .andWhere('section.id = :id', { id })
      .getOne();

    if (!section) throw new NotFoundException();

    return section;
  }

  async update(
    userId: string,
    id: number,
    updateSectionDto: UpdateSectionDto
  ): Promise<void> {
    const owner = await this.usersService.getOneById(userId);
    const result = await this.sectionsRepo.update(
      { owner, id },
      updateSectionDto
    );

    if (!result.affected) throw new NotFoundException();

    return Promise.resolve();
  }

  async delete(userId: string, id: number): Promise<void> {
    const owner = await this.usersService.getOneById(userId);
    const result = await this.sectionsRepo.delete({ owner, id });

    if (!result.affected) throw new NotFoundException();

    return Promise.resolve();
  }
}
