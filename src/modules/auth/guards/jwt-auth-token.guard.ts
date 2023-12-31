import { IS_PUBLIC_KEY } from '@common/decorators/public.decorator';
import {
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  canActivate(context: ExecutionContext) {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
  handleRequest(err: Error, user: any, info: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      let message = info?.message;
      if (message.includes('expired')) {
        message = 'Token jwt expired';
      }
      throw err || new ForbiddenException(message);
    }
    return user;
  }
}
