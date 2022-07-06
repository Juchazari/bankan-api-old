import { Controller, UseGuards } from '@nestjs/common';

import { AuthenticatedGuard } from '../auth/guards';
import { AttachmentsService } from './attachments.service';

@UseGuards(AuthenticatedGuard)
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}
}
