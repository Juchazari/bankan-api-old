import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: 'The users full name',
    example: 'John Doe'
  })
  fullName: string;

  @ApiProperty({
    description: 'The users email address',
    example: 'email@example.com'
  })
  email: string;

  @ApiProperty({
    description: 'The users password',
    example: 'pas$123'
  })
  password: string;
}
