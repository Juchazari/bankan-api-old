import { PartialType } from '@nestjs/mapped-types';

import { Label } from '../entities';

export class UpdateLabelDto extends PartialType(Label) {}
