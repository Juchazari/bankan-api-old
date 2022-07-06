import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users';
import { SectionsModule } from '../sections';
import { BoardsController } from './boards.controller';
import { BoardsService } from './boards.service';
import { Board } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), UsersModule, SectionsModule],
  controllers: [BoardsController],
  providers: [BoardsService],
  exports: [BoardsService]
})
export class BoardsModule {}
