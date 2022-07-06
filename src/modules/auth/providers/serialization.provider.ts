import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';

import { AuthService } from '../auth.service';
import { User } from '../../users/entities';

@Injectable()
export class AuthSerializer extends PassportSerializer {
  constructor(private readonly authService: AuthService) {
    super();
  }

  serializeUser(user: User, done: (err: Error, user: { id: string }) => void) {
    done(null, { id: user.id });
  }

  async deserializeUser(
    payload: { id: string },
    done: (err: Error, user: Omit<User, 'password'>) => void
  ) {
    const user = await this.authService.findById(payload.id);
    done(null, user);
  }
}
