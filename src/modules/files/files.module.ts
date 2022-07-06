import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { FilesService } from './files.service';
import { File } from './entities';

@Module({
  imports: [TypeOrmModule.forFeature([File]), ConfigModule],
  providers: [FilesService],
  exports: [FilesService]
})
export class FilesModule {}
