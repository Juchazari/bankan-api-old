import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Attachment } from './entities';
import { UsersService } from '../users';

@Injectable()
export class AttachmentsService {
  constructor(
    @InjectRepository(Attachment)
    private attachmentsRepo: Repository<Attachment>,
    private readonly usersService: UsersService
  ) {}
}
