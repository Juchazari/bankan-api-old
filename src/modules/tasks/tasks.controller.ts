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
import { TasksService } from './tasks.service';
import { Task } from './entities';
import { CreateTaskDto, UpdateTaskDto } from './dto';
import { LabelsService } from '../labels';
import { Label } from '../labels/entities';
import { CommentsService } from '../comments';
import { Comment } from '../comments/entities';

@ApiTags('Tasks')
@UseGuards(AuthenticatedGuard)
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly labelsService: LabelsService,
    private readonly commentsService: CommentsService
  ) {}

  @Post()
  async create(
    @User('id') userId: string,
    @Body() createTaskDto: CreateTaskDto
  ): Promise<Omit<Task, 'owner'>> {
    return this.tasksService.create(userId, createTaskDto);
  }

  @Get()
  async getAll(@User('id') userId: string): Promise<Task[]> {
    return this.tasksService.getAll(userId);
  }

  @Get(':id')
  async getOne(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<Task> {
    return this.tasksService.getOne(userId, +id);
  }

  @Patch(':id')
  async update(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto
  ): Promise<void> {
    return this.tasksService.update(userId, +id, updateTaskDto);
  }

  @Delete(':id')
  async delete(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<void> {
    return this.tasksService.delete(userId, +id);
  }

  @Get(':id/labels')
  async getAllLabels(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<Label[]> {
    return this.labelsService.getAll(userId, +id);
  }

  @Get(':id/comments')
  async getAllComments(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<Comment[]> {
    return this.commentsService.getAll(userId, +id);
  }
}
