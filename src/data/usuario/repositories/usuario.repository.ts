import { BaseRepository } from '@common/data/base/base.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { UsuarioEntity } from '../entities/usuario.entity';

@Injectable()
export class UsuarioRepository extends BaseRepository<UsuarioEntity> {
  constructor(protected dataSource: DataSource) {
    super(UsuarioEntity, dataSource);
  }

  /**
   * Save refresh token
   */
  async updateRefreshToken(id: number, refreshToken: string): Promise<void> {
    this.logger.log('updateRefreshToken', { id, refreshToken });
    await this.update(id, {
      updatedAt: new Date().toDateGMT3Offset(),
      refreshToken,
    });
  }
}
