import { MessageDto } from '@common/dto';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Argon2Util } from '@shared/utils/argon2.util';
import { AUTH_CONSTANTS } from './constants/auth.constants';
import { SignInDto } from './dto';
import { JwtPayload } from './dto/jwt-payload.dto';
import { JwtTokenDto } from './dto/token-jwt.dto';
import { IAuthUsecase } from './interfaces/iauth.usecase';

import {
  UsuarioEntity,
  UsuarioRepository,
} from '@data';

@Injectable()
export class AuthService implements IAuthUsecase {
  constructor(
    private usuarioRepository: UsuarioRepository,
    private jwtService: JwtService,
  ) {}

  async signIn(data: SignInDto): Promise<JwtTokenDto> {
    const usuario = await this.usuarioRepository.findOne({
      where: {
        login: data.login
      },
    });

    if (!usuario) {
      throw new BadRequestException(AUTH_CONSTANTS.AUTH_WRONG_CREDENTIALS);
    }

    const matching = await Argon2Util.verify(usuario.senha, data.senha);

    if (!matching) {
      throw new BadRequestException(AUTH_CONSTANTS.AUTH_WRONG_CREDENTIALS);
    }

    const tokens = await this.generateTokens(usuario);
    await this.updateRefreshToken(usuario.id, tokens.refreshToken);

    return {
      accessToken: tokens.accessToken,
      refreshToken: tokens.refreshToken,
      primeiroAcesso: usuario.primeiroAcesso,
      usuario: {
        nome: usuario.nome,
      },
    };
  }

  async signOut(payload: JwtPayload): Promise<MessageDto> {
    await this.usuarioRepository.updateRefreshToken(payload.usuarioID, null);
    return new MessageDto(AUTH_CONSTANTS.AUTH_LOGOUT_SUCCESS);
  }

  async refreshToken(payload: JwtPayload) {
    const { usuarioID, refreshToken } = payload;

    const user = await this.usuarioRepository.findById(usuarioID);

    if (!user || !user.refreshToken) {
      throw new ForbiddenException(AUTH_CONSTANTS.AUTH_ACCESS_DENIED);
    }

    const refreshTokenMatches = await Argon2Util.verify(
      user.refreshToken,
      refreshToken,
    );

    if (!refreshTokenMatches) {
      throw new ForbiddenException(AUTH_CONSTANTS.AUTH_ACCESS_DENIED);
    }

    const tokens = await this.generateTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  private async updateRefreshToken(userId: number, refreshToken: string) {
    const hashedRefreshToken = await Argon2Util.hashData(refreshToken);
    await this.usuarioRepository.updateRefreshToken(userId, hashedRefreshToken);
  }

  /**
   * Generates Token's JWT
   *
   * accessToken: expiresIn 2d
   * refreshToken: expiresIn 7d
   */
  private async generateTokens(user: UsuarioEntity) {
    const payload: JwtPayload = {
      usuarioID: user.id,
      email: user.email,
      refreshToken: null,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_ACCESS_SECRET,
        expiresIn: '2d',
      }),
      this.jwtService.signAsync(payload, {
        secret: process.env.JWT_REFRESH_SECRET,
        expiresIn: '7d',
      }),
    ]);

    return { accessToken, refreshToken };
  }
}
