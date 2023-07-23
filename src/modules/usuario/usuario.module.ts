import { Module } from '@nestjs/common';
import { IUsuarioUsecase } from './interfaces/iusuario.usecase';
import { UsuarioController } from './usuario.controller';
import { UsuarioService } from './usuario.service';
import {
  UsuarioDataModule,
} from '@data/modules';

@Module({
  imports: [UsuarioDataModule],
  providers: [
    UsuarioService,
    {
      provide: IUsuarioUsecase,
      useClass: UsuarioService,
    },
  ],
  exports: [UsuarioDataModule, UsuarioService],
  controllers: [UsuarioController],
})
export class UsuarioModule {}
