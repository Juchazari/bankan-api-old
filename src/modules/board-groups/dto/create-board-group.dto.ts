import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardGroupDto {
  @ApiProperty({
    description: 'The name of the board group'
  })
  name: string;
}
