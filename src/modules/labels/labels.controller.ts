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
import { LabelsService } from './labels.service';
import { User } from 'src/core/decorators';
import { CreateLabelDto, UpdateLabelDto } from './dto';
import { Label } from './entities';

@ApiTags('Labels')
@UseGuards(AuthenticatedGuard)
@Controller('labels')
export class LabelsController {
  constructor(private readonly labelsService: LabelsService) {}

  @Post()
  async create(
    @User('id') userId: string,
    @Body() createLabelDto: CreateLabelDto
  ): Promise<Omit<Label, 'owner'>> {
    return this.labelsService.create(userId, createLabelDto);
  }

  @Get()
  async getAll(@User('id') userId: string): Promise<Label[]> {
    return this.labelsService.getAll(userId);
  }

  @Get(':id')
  async getOne(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<Label> {
    return this.labelsService.getOne(userId, +id);
  }

  @Patch(':id')
  async update(
    @User('id') userId: string,
    @Param('id') id: string,
    @Body() updateLabelDto: UpdateLabelDto
  ): Promise<void> {
    return this.labelsService.update(userId, +id, updateLabelDto);
  }

  @Delete(':id')
  async delete(
    @User('id') userId: string,
    @Param('id') id: string
  ): Promise<void> {
    return this.labelsService.delete(userId, +id);
  }
}
