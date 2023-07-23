import {
  ResponseMessage,
  ResponsePostMessage,
} from '@common/interfaces/response-message';
import { Injectable } from '@nestjs/common';

export interface IServiceGetByIdUsecase {
  /**
   * Get item by id
   */
  getById(id: number): Promise<any>;
}

export interface IServiceGetUsecase {
  /**
   * Get items
   */
  find(query: any): Promise<any[]>;
}

export interface IServicePostUsecase {
  /**
   * Save data
   */
  post(body: any): Promise<any | ResponsePostMessage>;
}

export interface IServicePutUsecase {
  /**
   * Update data
   */
  put(id: number, body: any): Promise<ResponseMessage>;
}

export interface IServicePatchUsecase {
  /**
   * Update partial data
   */
  patch(id: number, body: any): Promise<ResponseMessage>;
}

export interface IServiceDeleteUsecase {
  /**
   * Delete data by id
   */
  deleteById(id: number): Promise<ResponseMessage>;
}

@Injectable()
export abstract class IServiceUsecase
  implements
    IServiceGetByIdUsecase,
    IServiceGetUsecase,
    IServicePostUsecase,
    IServicePutUsecase,
    IServicePatchUsecase,
    IServiceDeleteUsecase
{
  /**
   * Get item by id
   */
  abstract getById(id: number): Promise<any>;

  /**
   * Get items
   */
  abstract find(query: any): Promise<any[] | []>;

  /*
   * Save data
   */
  abstract post(body: any): Promise<any | ResponseMessage>;

  /*
   * Update data
   */
  abstract put(id: number, body: any): Promise<any | ResponseMessage>;

  /*
   * Update data
   */
  abstract patch(id: number, body: any): Promise<any | ResponseMessage>;

  /**
   * Delete data by id
   */
  abstract deleteById(id: number): Promise<ResponseMessage>;
}

export type IServiceUsecaseType =
  | IServiceGetByIdUsecase
  | IServiceGetUsecase
  | IServicePostUsecase
  | IServicePutUsecase
  | IServiceDeleteUsecase;
