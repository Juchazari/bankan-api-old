import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';

import { Board } from './entities';
import { CreateBoardDto, UpdateBoardDto } from './dto';
import { UsersService } from '../users';

@Injectable()
export class BoardsService {
  constructor(
    @InjectRepository(Board) private boardsRepo: Repository<Board>,
    private readonly usersService: UsersService
  ) {}

  async create(
    userId: string,
    createBoardDto: CreateBoardDto
  ): Promise<Omit<Board, 'owner'>> {
    const owner = await this.usersService.getOneById(userId);

    const createBoard = this.boardsRepo.create({
      ...createBoardDto,
      owner
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { owner: _, ...board } = await this.boardsRepo.save(createBoard);

    return board;
  }

  async getAll(userId: string, boardGroupId?: number): Promise<Board[]> {
    const query = this.boardsRepo
      .createQueryBuilder('board')
      .leftJoin('board.owner', 'owner')
      .where('owner.id = :userId', { userId });

    if (boardGroupId) {
      query
        .leftJoin('board.boardGroup', 'boardGroup')
        .andWhere('boardGroup.id = :boardGroupId', { boardGroupId });
    }

    return await query.getMany();
  }

  async getOne(userId: string, id: number): Promise<Board> {
    const board = await this.boardsRepo
      .createQueryBuilder('board')
      .leftJoin('board.owner', 'owner')
      .where('owner.id = :userId', { userId })
      .andWhere('board.id = :id', { id })
      .getOne();

    if (!board) throw new NotFoundException();

    return board;
  }

  async update(
    userId: string,
    id: number,
    updateBoardDto: UpdateBoardDto
  ): Promise<void> {
    const owner = await this.usersService.getOneById(userId);
    const result = await this.boardsRepo.update({ owner, id }, updateBoardDto);

    if (!result.affected) throw new NotFoundException();

    return Promise.resolve();
  }

  async delete(userId: string, id: number): Promise<void> {
    const owner = await this.usersService.getOneById(userId);
    const result = await this.boardsRepo.delete({ owner, id });

    if (!result.affected) throw new NotFoundException();

    return Promise.resolve();
  }

  private addRelationQueries(query: SelectQueryBuilder<Board>): void {
    query
      .leftJoinAndSelect('board.icon', 'icon')
      .leftJoinAndSelect('board.sections', 'section')
      .leftJoinAndSelect('section.tasks', 'task')
      .addOrderBy('section.createdAt', 'ASC');
  }
}
