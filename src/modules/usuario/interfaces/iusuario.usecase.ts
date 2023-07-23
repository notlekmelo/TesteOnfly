import { MessageDto } from '@common';
import { UsuarioEntity } from '@data';
import { JwtPayload } from '@modules/auth/dto';
import { Injectable } from '@nestjs/common';
import { DeepPartial } from 'typeorm';
import { PatchUsuarioDto } from '../dto';
import { PostUsuarioDto } from '../dto/post-usuario.dto';

@Injectable()
export abstract class IUsuarioUsecase {
  /**
   * Save usuario's data
   */
  abstract save(
    body: PostUsuarioDto,
  ): Promise<DeepPartial<UsuarioEntity>>;
  /**
   * Save usuario's data
   */
  abstract update(
    body: PatchUsuarioDto,
    payload: JwtPayload,
  ): Promise<MessageDto>;

  /**
   * Save refresh token
   */
  abstract updateRefreshToken(
    id: number,
    refreshToken: string,
  ): Promise<boolean>;

  abstract get(
    payload: JwtPayload,
  ): Promise<UsuarioEntity>
}
