import { DeepPartial } from 'typeorm';

export interface IRepository<T> {
  save(
    body: DeepPartial<T>[] | DeepPartial<T>,
  ): Promise<DeepPartial<T>[] | DeepPartial<T>>;
  update(id: number, body: any): Promise<any>;
  findById(id: number): Promise<T>;
  find(criteria: any): Promise<T[]>;
  findAll(): Promise<T[]>;
  deleteById(id: number): Promise<any>;
  delete(criteria: any): Promise<any>;
}
