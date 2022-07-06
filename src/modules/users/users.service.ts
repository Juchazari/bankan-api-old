import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities';
import { CreateUserDto } from './dto';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepo: Repository<User>) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const user = this.usersRepo.create(createUserDto);
    return await this.usersRepo.save(user);
  }

  async getOneById(id: string): Promise<User> {
    const user = await this.usersRepo.findOne(id);

    if (!user) throw new NotFoundException();

    return user;
  }

  async getOneByEmail(email: string, passthrough = false): Promise<User> {
    const user = await this.usersRepo.findOne({
      where: { email }
    });

    if (!user && !passthrough) throw new NotFoundException();

    return user;
  }

  async delete(id: string): Promise<void> {
    await this.getOneById(id);
    await this.usersRepo.delete(id);

    return Promise.resolve();
  }
}
