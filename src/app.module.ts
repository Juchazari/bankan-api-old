import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import {
  DatabaseModule,
  AuthModule,
  UsersModule,
  BoardGroupsModule,
  BoardsModule,
  SectionsModule,
  TasksModule,
  LabelsModule,
  CommentsModule,
  AttachmentsModule
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    AuthModule,
    UsersModule,
    BoardGroupsModule,
    BoardsModule,
    SectionsModule,
    TasksModule,
    LabelsModule,
    CommentsModule,
    AttachmentsModule
  ]
})
export class AppModule {}
