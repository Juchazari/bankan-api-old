import {
  Controller,
  Get,
  Post,
  Req,
  Res,
  Body,
  UseGuards,
  HttpException,
  HttpStatus
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { LocalGuard } from './guards';
import { AuthService } from './auth.service';
import { SignupDto } from './dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('authenticated')
  async authenticated(@Req() req: Request) {
    return req.isAuthenticated();
  }

  @Post('signup')
  async signup(@Req() req: Request, @Body() signupDto: SignupDto) {
    const user = await this.authService.signup(signupDto);

    req.login(user, (err) => {
      if (err) throw new HttpException(err, HttpStatus.OK);
    });

    return req.session;
  }

  @UseGuards(LocalGuard)
  @Post('login')
  async login(@Req() req: Request) {
    return req.session;
  }

  @Post('logout')
  logout(@Req() req: Request, @Res({ passthrough: true }) res: Response) {
    req.logout();

    req.session.destroy((err) => {
      if (err) throw new HttpException(err, HttpStatus.OK);
    });

    res.clearCookie('connect.sid').status(201).send();
  }
}
