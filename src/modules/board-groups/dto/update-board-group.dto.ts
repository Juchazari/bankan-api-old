import { PartialType } from '@nestjs/mapped-types';

import { BoardGroup } from '../entities';

export class UpdateBoardGroupDto extends PartialType(BoardGroup) {}
