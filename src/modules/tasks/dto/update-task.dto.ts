import { PartialType } from '@nestjs/mapped-types';

import { Task } from '../entities';

export class UpdateTaskDto extends PartialType(Task) {}
