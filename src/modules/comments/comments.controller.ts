import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthenticatedGuard } from '../auth/guards';
import { User } from '../../core/decorators';
import { CommentsService } from './comments.service';
import { Comment } from './entities';
import { CreateCommentDto, UpdateCommentDto } from './dto';

@ApiTags('Comments')
@UseGuards(AuthenticatedGuard)
@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post()
  async create(
    @User('id') userId: string,
    @Body() createCommentDto: CreateCommentDto
  ): Promise<Omit<Comment, 'owner'>> {
    return this.commentsService.create(userId, createCommentDto);
  }

  @Get()
  async getAll(@User('id') userId: string): Promise<Comment[]> {
    return this.commentsService.getAll(userId);
  }

  @Get(':id')
  async getOne(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<Comment> {
    return this.commentsService.getOne(userId, +id);
  }

  @Patch(':id')
  async update(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto
  ): Promise<void> {
    return this.commentsService.update(userId, +id, updateCommentDto);
  }

  @Delete(':id')
  async delete(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<void> {
    return this.commentsService.delete(userId, +id);
  }
}
