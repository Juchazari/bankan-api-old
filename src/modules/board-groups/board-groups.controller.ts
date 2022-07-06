import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthenticatedGuard } from '../auth/guards';
import { User } from '../../core/decorators';
import { BoardGroupsService } from './board-groups.service';
import { BoardGroup } from './entities';
import { CreateBoardGroupDto, UpdateBoardGroupDto } from './dto';
import { BoardsService } from '../boards';
import { Board } from '../boards/entities';

@ApiTags('Board Groups')
@UseGuards(AuthenticatedGuard)
@Controller('board-groups')
export class BoardGroupsController {
  constructor(
    private readonly boardGroupsService: BoardGroupsService,
    private readonly boardsService: BoardsService
  ) {}

  @Post()
  async create(
    @User('id') userId: string,
    @Body() createBoardGroupDto: CreateBoardGroupDto
  ): Promise<Omit<BoardGroup, 'owner'>> {
    return this.boardGroupsService.create(userId, createBoardGroupDto);
  }

  @Get()
  async getAll(@User('id') userId: string): Promise<BoardGroup[]> {
    return this.boardGroupsService.getAll(userId);
  }

  @Get(':id')
  async getOne(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<BoardGroup> {
    return this.boardGroupsService.getOne(userId, +id);
  }

  @Patch(':id')
  async update(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body() updateBoardGroupDto: UpdateBoardGroupDto
  ): Promise<void> {
    return this.boardGroupsService.update(userId, +id, updateBoardGroupDto);
  }

  @Delete(':id')
  async delete(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<void> {
    return this.boardGroupsService.delete(userId, +id);
  }

  @Get(':id/boards')
  async getAllBoards(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<Board[]> {
    return this.boardsService.getAll(userId, +id);
  }
}
