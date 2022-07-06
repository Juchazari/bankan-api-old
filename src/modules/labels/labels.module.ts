import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LabelsController } from './labels.controller';
import { LabelsService } from './labels.service';
import { Label } from './entities';
import { UsersModule } from '../users';

@Module({
  imports: [TypeOrmModule.forFeature([Label]), UsersModule],
  controllers: [LabelsController],
  providers: [LabelsService],
  exports: [LabelsService]
})
export class LabelsModule {}
