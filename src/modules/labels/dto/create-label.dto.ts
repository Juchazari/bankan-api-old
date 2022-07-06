import { ApiProperty } from '@nestjs/swagger';

export class CreateLabelDto {
  @ApiProperty({
    description: 'The name of the label',
    example: 'important'
  })
  name: string;

  @ApiProperty({
    description: 'The color of the label in hex form',
    example: '#4287f5',
    required: false
  })
  color?: string;

  @ApiProperty({
    description: 'The id of the task it will be created for'
  })
  taskId: number;
}
