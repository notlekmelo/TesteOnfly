import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { IAuthUsecase } from './interfaces/iauth.usecase';
import { RefreshTokenStrategy, AccessTokenStrategy } from './strategies';

import {
  UsuarioDataModule,
} from '@data/modules';

@Module({
  imports: [
    UsuarioDataModule,
    PassportModule.register({ session: true }),
    JwtModule.register({
      signOptions: { expiresIn: '2d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: IAuthUsecase,
      useClass: AuthService,
    },
    AccessTokenStrategy,
    RefreshTokenStrategy,
  ],
  exports: [],
})
export class AuthModule {}
