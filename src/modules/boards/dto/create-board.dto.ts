import { ApiProperty } from '@nestjs/swagger';

export class CreateBoardDto {
  @ApiProperty({
    description: 'The name of the board',
    example: 'Bankan Board'
  })
  name: string;

  @ApiProperty({
    description: 'The description of the board',
    default: null,
    required: false
  })
  description?: string;

  @ApiProperty({
    description: 'The id of the board group it will be placed in'
  })
  boardGroupId: number;
}
