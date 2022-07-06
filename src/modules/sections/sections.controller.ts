import {
  Controller,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Get
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthenticatedGuard } from '../auth/guards';
import { User } from '../../core/decorators';
import { SectionsService } from './sections.service';
import { Section } from './entities';
import { CreateSectionDto, UpdateSectionDto } from './dto';
import { Task } from '../tasks/entities';
import { TasksService } from '../tasks';

@ApiTags('Sections')
@UseGuards(AuthenticatedGuard)
@Controller('sections')
export class SectionsController {
  constructor(
    private readonly sectionsService: SectionsService,
    private readonly tasksService: TasksService
  ) {}

  @Post()
  async create(
    @User('id') userId: string,
    @Body() createSectionDto: CreateSectionDto
  ): Promise<Omit<Section, 'owner'>> {
    return this.sectionsService.create(userId, createSectionDto);
  }

  @Get()
  async getAll(@User('id') userId: string): Promise<Section[]> {
    return this.sectionsService.getAll(userId);
  }

  @Get(':id')
  async getOne(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<Section> {
    return this.sectionsService.getOne(userId, +id);
  }

  @Patch(':id')
  update(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body() updateSectionDto: UpdateSectionDto
  ): Promise<void> {
    return this.sectionsService.update(userId, +id, updateSectionDto);
  }

  @Delete(':id')
  async delete(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<void> {
    return this.sectionsService.delete(userId, +id);
  }

  @Get(':id/tasks')
  async getAllTasks(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<Task[]> {
    return this.tasksService.getAll(userId, +id);
  }
}
