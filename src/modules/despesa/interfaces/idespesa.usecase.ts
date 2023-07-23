import { IDataResults, QueryDto } from '@common';
import { DespesaEntity } from '@data';
import { JwtPayload } from '@modules/auth/dto';
import { Injectable } from '@nestjs/common';
import { DespesaDto } from '../dto';
import { DespesaModel } from '../model';
import { DeepPartial, DeleteResult, UpdateResult } from 'typeorm';

@Injectable()
export abstract class IDespesaUsecase {
  /**
   * Get Despesas data
   */
  abstract get(
    params: QueryDto,
    payload: JwtPayload,
  ): Promise<IDataResults<DespesaEntity>>;
  
  abstract getID(
    despesaID: number,
    payload: JwtPayload,
  ): Promise<DespesaDto>;
  
  abstract post(
    body: DespesaModel,
    payload: JwtPayload,
  ): Promise<DeepPartial<DespesaEntity>>;
  
  abstract put(
    despesaID: number,
    body: DespesaModel,
    payload: JwtPayload,
  ): Promise<UpdateResult>;

  abstract delete(
    despesaID: number,
    payload: JwtPayload,
  ): Promise<DeleteResult>;
}
