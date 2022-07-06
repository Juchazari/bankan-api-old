import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Patch
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthenticatedGuard } from '../auth/guards';
import { User } from '../../core/decorators';
import { BoardsService } from './boards.service';
import { SectionsService } from '../sections';
import { Board } from './entities';
import { Section } from '../sections/entities';
import { CreateBoardDto, UpdateBoardDto } from './dto';

@ApiTags('Boards')
@UseGuards(AuthenticatedGuard)
@Controller('boards')
export class BoardsController {
  constructor(
    private readonly boardsService: BoardsService,
    private readonly sectionsService: SectionsService
  ) {}

  @Post()
  async create(
    @User('id') userId: string,
    @Body() createBoardDto: CreateBoardDto
  ): Promise<Omit<Board, 'owner'>> {
    return this.boardsService.create(userId, createBoardDto);
  }

  @Get()
  async getAll(@User('id') userId: string): Promise<Board[]> {
    return this.boardsService.getAll(userId);
  }

  @Get(':id')
  async getOne(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<Board> {
    return this.boardsService.getOne(userId, +id);
  }

  @Patch(':id')
  async update(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body() updateBoardDto: UpdateBoardDto
  ): Promise<void> {
    return this.boardsService.update(userId, +id, updateBoardDto);
  }

  @Delete(':id')
  async delete(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<void> {
    return this.boardsService.delete(userId, +id);
  }

  @Get(':id/sections')
  async getAllSections(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<Section[]> {
    return this.sectionsService.getAll(userId, +id);
  }
}
