import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DespesaRepository } from '../despesa/repositories/despesa.repository';
import { DespesaEntity } from '../despesa/entities/despesa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DespesaEntity])],
  providers: [DespesaRepository],
  exports: [TypeOrmModule, DespesaRepository],
})
export class DespesaDataModule {}
