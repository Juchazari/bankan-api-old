import { PartialType } from '@nestjs/mapped-types';

import { Comment } from '../entities';

export class UpdateCommentDto extends PartialType(Comment) {}
