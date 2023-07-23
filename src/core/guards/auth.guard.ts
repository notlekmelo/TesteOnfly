import { IS_PUBLIC_KEY } from '@common/decorators/public.decorator';
import { ROLES_KEY } from '@common/decorators/roles.decorator';
import { JwtPayload } from '@modules/auth/dto';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ProfileRoleEnum } from '@shared/roles/profile.role.enum';
import { Request } from 'express';
/**
 * Validate roles at route level
 */
@Injectable()
export class AuthGuard implements CanActivate {
  private logger = new Logger(AuthGuard.name);
  constructor(
    @Inject(Reflector)
    private readonly reflector: Reflector,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) {
      return true;
    }
    const request: Request = context.switchToHttp().getRequest();

    //validate request
    return this._handleRequest(request);
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  private _handleRequest(request: Request): boolean {
    //TODO validate request
    // const method = req.method;
    // if (method === 'POST' || method === 'PATCH' || method === 'PUT') {
    // } else if (method === 'GET') {
    // } else {
    //   //delete or other
    // }
    return true;
  }
}
