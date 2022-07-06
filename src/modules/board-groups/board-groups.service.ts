import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { BoardGroup } from './entities';
import { CreateBoardGroupDto, UpdateBoardGroupDto } from './dto';
import { UsersService } from '../users';

@Injectable()
export class BoardGroupsService {
  constructor(
    @InjectRepository(BoardGroup)
    private boardGroupsRepo: Repository<BoardGroup>,
    private readonly usersService: UsersService
  ) {}

  async create(
    userId: string,
    createBoardGroupDto: CreateBoardGroupDto
  ): Promise<Omit<BoardGroup, 'owner'>> {
    const owner = await this.usersService.getOneById(userId);

    const createBoardGroup = this.boardGroupsRepo.create({
      ...createBoardGroupDto,
      owner
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { owner: _, ...boardGroup } = await this.boardGroupsRepo.save(
      createBoardGroup
    );

    return boardGroup;
  }

  async getAll(userId: string): Promise<BoardGroup[]> {
    const query = this.boardGroupsRepo
      .createQueryBuilder('boardGroup')
      .leftJoin('boardGroup.owner', 'owner')
      .where('owner.id = :userId', { userId });

    return await query.getMany();
  }

  async getOne(userId: string, id: number): Promise<BoardGroup> {
    const boardGroup = await this.boardGroupsRepo
      .createQueryBuilder('boardGroup')
      .leftJoin('boardGroup.owner', 'owner')
      .where('owner.id = :userId', { userId })
      .andWhere('boardGroup.id = :id', { id })
      .getOne();

    if (!boardGroup) throw new NotFoundException();

    return boardGroup;
  }

  async update(
    userId: string,
    id: number,
    updateBoardGroupDto: UpdateBoardGroupDto
  ): Promise<void> {
    const owner = await this.usersService.getOneById(userId);
    const result = await this.boardGroupsRepo.update(
      { owner, id },
      updateBoardGroupDto
    );

    if (!result.affected) throw new NotFoundException();

    return Promise.resolve();
  }

  async delete(userId: string, id: number): Promise<void> {
    const owner = await this.usersService.getOneById(userId);
    const result = await this.boardGroupsRepo.delete({ owner, id });

    if (!result.affected) throw new NotFoundException();

    return Promise.resolve();
  }

  private addRelationQueries(query: SelectQueryBuilder<BoardGroup>): void {
    query
      .leftJoin('boardGroup.boards', 'board')
      .addSelect(['board.id', 'board.name', 'board.boardGroupId']);
  }
}
