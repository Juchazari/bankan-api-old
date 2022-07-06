import { Injectable, ConflictException } from '@nestjs/common';
import { hash, compare } from 'bcrypt';

import { User } from '../users/entities';
import { LoginDto, SignupDto } from './dto';
import { UsersService } from '../users';

@Injectable()
export class AuthService {
  constructor(private readonly usersService: UsersService) {}

  async signup({ fullName, email, password }: SignupDto): Promise<User> {
    const user = await this.usersService.getOneByEmail(email, true);

    if (user)
      throw new ConflictException(
        'The email provided is already in use, try logging in instead'
      );

    const hashedPassword = await hash(password, 10);
    const newUser = await this.usersService.create({
      fullName,
      email,
      password: hashedPassword
    });

    return newUser;
  }

  async login({ email, password }: LoginDto): Promise<User> {
    try {
      const user = await this.usersService.getOneByEmail(email);
      const isPasswordMatching = await compare(password, user.password);

      if (isPasswordMatching) return user;

      throw new Error();
    } catch {
      throw new ConflictException('Incorrect credentials, please try again');
    }
  }

  async findById(id: string): Promise<Omit<User, 'password'>> {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...user } = await this.usersService.getOneById(id);
    return user;
  }
}
