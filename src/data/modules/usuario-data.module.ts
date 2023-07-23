import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsuarioRepository } from '../usuario/repositories/usuario.repository';
import { UsuarioEntity } from '../usuario/entities/usuario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UsuarioEntity])],
  providers: [UsuarioRepository],
  exports: [TypeOrmModule, UsuarioRepository],
})
export class UsuarioDataModule {}
