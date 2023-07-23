import {
  BaseEntity,
  BaseRepository,
  IQueryPage,
  MessageDto,
  PageDto,
  PageMetaDto,
  PostMessageDto,
} from '@common';
import { handleDefaultError, handleNotFound } from '@global';
import { IServiceUsecase } from '../../interfaces/iservice.usecase';

import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export abstract class BaseService<
  T extends BaseEntity,
> extends IServiceUsecase {
  protected logger: Logger;
  constructor(protected readonly repository: BaseRepository<T>) {
    super();
    this.logger = new Logger(this.constructor.name);
  }

  async post(body: any) {
    const result = await this.repository.save(body);
    handleDefaultError(result);
    return new PostMessageDto(result.id, 'Data saved sucessfully');
  }

  async getById(id: number): Promise<T> {
    const result = await this.repository.findById(id);
    handleNotFound(result);
    return result;
  }

  async put(id: number, body: any) {
    const result = await this.repository.update(id, body);
    handleDefaultError(result);
    return new MessageDto('Data updated sucessfully');
  }

  async deleteById(id: number) {
    const result = await this.repository.deleteById(id);
    handleDefaultError(result);
    return new MessageDto('Data deleted sucessfully');
  }

  async find(query: any): Promise<T[]> {
    const documents = await this.repository.find(query);
    return documents;
  }

  async findWithPagination(query: IQueryPage<any>): Promise<PageDto<T>> {
    const { filter, pageOptions } = query;
    const { results, count } = await this.repository.findWithPagination(
      filter,
      pageOptions,
    );
    const pageMetaDto = new PageMetaDto({ pageOptions, count });
    return new PageDto(results, pageMetaDto);
  }

  async findAll(): Promise<T[]> {
    const documents = await this.repository.findAll();
    return documents;
  }

  delete(criteria: any) {
    return this.repository.delete(criteria);
  }
}
