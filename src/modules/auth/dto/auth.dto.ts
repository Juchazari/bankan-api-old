import { ApiProperty } from '@nestjs/swagger';

import { CreateUserDto } from '../../users/dto';

export class LoginDto {
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

export class SignupDto extends CreateUserDto {}
