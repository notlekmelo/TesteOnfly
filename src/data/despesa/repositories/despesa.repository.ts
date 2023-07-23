import { BaseRepository } from '@common/data/base/base.repository';
import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { DespesaEntity } from '../entities/despesa.entity';

@Injectable()
export class DespesaRepository extends BaseRepository<DespesaEntity> {
  constructor(protected dataSource: DataSource) {
    super(DespesaEntity, dataSource);
  }
}
