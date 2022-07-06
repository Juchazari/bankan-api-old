import { ApiProperty } from '@nestjs/swagger';

export class CreateSectionDto {
  @ApiProperty({
    description: 'The name of the section',
    example: 'To Do'
  })
  name: string;

  @ApiProperty({
    description: 'The id of the board it will be created for'
  })
  boardId: number;
}
