import { PartialType } from '@nestjs/mapped-types';

import { Board } from '../entities';

export class UpdateBoardDto extends PartialType(Board) {}
