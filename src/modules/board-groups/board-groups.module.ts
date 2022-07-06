import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from '../users';
import { BoardsModule } from '../boards';
import { BoardGroupsController } from './board-groups.controller';
import { BoardGroupsService } from './board-groups.service';
import { BoardGroup } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([BoardGroup]), UsersModule, BoardsModule],
  controllers: [BoardGroupsController],
  providers: [BoardGroupsService],
  exports: [BoardGroupsService]
})
export class BoardGroupsModule {}
