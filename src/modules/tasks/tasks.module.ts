import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { Task } from './entities';
import { UsersModule } from '../users';
import { LabelsModule } from '../labels';
import { CommentsModule } from '../comments';

@Module({
  imports: [
    TypeOrmModule.forFeature([Task]),
    UsersModule,
    LabelsModule,
    CommentsModule
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService]
})
export class TasksModule {}
