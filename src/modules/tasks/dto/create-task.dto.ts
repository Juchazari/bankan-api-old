import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskDto {
  @ApiProperty({
    description: 'The name of the task',
    example: 'Create Bankan webapp'
  })
  name: string;

  @ApiProperty({
    description: 'The id of the section it will be created for'
  })
  sectionId: number;
}
