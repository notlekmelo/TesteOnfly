import { MessageDto } from '@common';
import { Injectable } from '@nestjs/common';
import {
  JwtPayload,
  JwtTokenDto,
  SignInDto
} from '../dto';

@Injectable()
export abstract class IAuthUsecase {
  /**
   * Authenticate user and get tokens
   */
  abstract signIn(data: SignInDto): Promise<JwtTokenDto>;

  /**
   * Revoke refresh token
   */
  abstract signOut(data: JwtPayload): Promise<MessageDto>;

  /**
   * Renew access token
   */
  abstract refreshToken(data: JwtPayload): Promise<any>;
}
