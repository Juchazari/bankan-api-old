import { PartialType } from '@nestjs/mapped-types';

import { Section } from '../entities';

export class UpdateSectionDto extends PartialType(Section) {}
