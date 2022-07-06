import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException
} from '@nestjs/common';

@Injectable()
export class AuthenticatedGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const authenticated = context
      .switchToHttp()
      .getRequest()
      .isAuthenticated() as boolean;

    if (!authenticated) throw new UnauthorizedException();

    return authenticated;
  }
}
