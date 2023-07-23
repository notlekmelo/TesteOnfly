import { MessageDto } from '@common/dto';
import { JwtPayload } from '@modules/auth/dto';
import { Injectable } from '@nestjs/common';
import { Argon2Util } from '@shared';
import { USUARIO_CONSTANTS } from './constants/usuario.constants';
import { PostUsuarioDto, PatchUsuarioDto } from './dto';
import { IUsuarioUsecase } from './interfaces/iusuario.usecase';
import { UsuarioEntity, UsuarioRepository } from '@data';
import { handleBadRequest } from '@global';
import { Not } from 'typeorm';

@Injectable()
export class UsuarioService implements IUsuarioUsecase {
  constructor(
    private usuarioRepository: UsuarioRepository,
  ) {}

  async save(body: PostUsuarioDto) {
    
    const hash = await Argon2Util.hashData(body.senha);

    const usuarioExistente = await this.usuarioRepository.findOne({
      where: {
        login: body.login
      }
    })
    if (usuarioExistente) {
      handleBadRequest(null, "O login informado já foi cadastrado para outro usuário")
    }

    const usuario = await this.usuarioRepository.save({
      nome: body.nome,
      cpf: body.cpf,
      createdAt: new Date(),
      login: body.login,
      primeiroAcesso: 'S',
      senha: hash,
      email: body.email
    });

    delete usuario.senha;

    return usuario;
  }

  async update(body: PatchUsuarioDto, payload: JwtPayload) {
    const usuario = await this.usuarioRepository.findById(payload.usuarioID);

    let hash: string = '';
    if (body.senha && body.senhaAtual) {
      const matching = await Argon2Util.verify(usuario.senha, body.senhaAtual);

      if (!matching) {
        handleBadRequest(null, USUARIO_CONSTANTS.USER_WRONG_CURRENT_PASSWORD);
      }
      hash = await Argon2Util.hashData(body.senha);
    }

    const usuarioExistente = await this.usuarioRepository.findOne({
      where: {
        login: body.login,
        id: Not(payload.usuarioID)
      }
    })
    if (usuarioExistente) {
      handleBadRequest(null, "O login informado já foi cadastrado para outro usuário")
    }

    await this.usuarioRepository.update(payload.usuarioID, {
      senha: hash ? hash : usuario.senha,
      primeiroAcesso: 'N',
      updatedAt: new Date(),
      cpf: body.cpf,
      email: body.email, 
      login: body.login,
      nome: body.nome
    });

    delete usuario.senha;

    return new MessageDto(USUARIO_CONSTANTS.USER_UPDATE);
  }

  async updateRefreshToken(id: number, refreshToken: string) {
    await this.usuarioRepository.updateRefreshToken(id, refreshToken);
    return true;
  }

  async get(payload: JwtPayload): Promise<UsuarioEntity> {
    const usuario = await this.usuarioRepository.findById(payload.usuarioID);
    delete usuario.senha;
    return usuario
  }
}
