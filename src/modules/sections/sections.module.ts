import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users';
import { TasksModule } from '../tasks';
import { SectionsController } from './sections.controller';
import { SectionsService } from './sections.service';
import { Section } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Section]), UsersModule, TasksModule],
  controllers: [SectionsController],
  providers: [SectionsService],
  exports: [SectionsService]
})
export class SectionsModule {}
