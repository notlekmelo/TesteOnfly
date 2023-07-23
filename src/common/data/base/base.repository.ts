import {
  IDataResults,
  IRepository,
  MssqlQueryOptions,
} from '@common/data/interfaces';
import { LoggerRepository } from '@common/services/logger-repository.service';
import { Configuration } from '@infra/config';
import { ObjectLiteral } from 'nestjs-typeorm-paginate';
import {
  Between,
  DataSource,
  DeepPartial,
  DeleteResult,
  EntityTarget,
  FindManyOptions,
  FindOneOptions,
  FindOptionsWhere,
  In,
  IsNull,
  Like,
  Not,
  Raw,
  Repository,
  UpdateResult,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { BaseMetadata } from './base.metadata';
/**
 * Base Repository Typeorm SQL Server
 */
export abstract class BaseRepository<T extends BaseEntity>
  implements IRepository<T>
{
  private _showLog: boolean;
  protected readonly logger: LoggerRepository;
  private injectDateProperties: boolean;
  protected repository: Repository<T>;
  protected metadata: BaseMetadata<T>;

  constructor(
    entity: EntityTarget<T>,
    dataSourceOrRepository: DataSource | Repository<T>,
    injectDateProperties = true,
  ) {
    if (dataSourceOrRepository instanceof DataSource) {
      this.repository = dataSourceOrRepository.getRepository<T>(entity);
    } else {
      this.repository = dataSourceOrRepository;
    }
    this._showLog = Configuration.isLog();
    this.logger = new LoggerRepository(this, this._showLog);
    this.metadata = new BaseMetadata(this.repository);
    this.injectDateProperties = injectDateProperties;
  }

  /**
   * Save data
   *
   * @param body Body
   * @returns {Promise<T>}
   */
  async save(body: DeepPartial<T>): Promise<DeepPartial<T>> {
    try {
      if (this.injectDateProperties === true) {
        this.setDateProperties(body);
      }
      this.logger.save(body);
      const result = await this.repository.save(body);
      return result;
    } catch (err) {
      this.handleError(err, 'save');
    }
  }

  /**
   * Save many data
   * @param body Body
   * @returns {Promise<T[]>}
   */
  async saveMany(body: DeepPartial<T>[]): Promise<DeepPartial<T>[]> {
    try {
      if (this.injectDateProperties === true) {
        this.setDateProperties(body);
      }
      this.logger.save(body);
      const result = await this.repository.save(body);
      return result;
    } catch (err) {
      this.handleError(err, 'save');
    }
  }

  /**
   * Find data criteria
   *
   * @param criteria
   * @returns {Promise<T>}
   */
  async find(criteria: FindManyOptions<T>): Promise<T[]> {
    try {
      this.logger.find(criteria);

      const items = await this.repository.find(criteria);
      if (!items) {
        return [];
      }
      return items;
    } catch (err) {
      this.handleError(err, 'find');
    }
  }

  /**
   * Find data by id
   *
   * @param id
   * @returns {Promise<T>}
   */
  async findById(id: number | string, relations?: string[]): Promise<T> {
    try {
      this.logger.findById(id);
      const result = await this.repository.findOne({
        relations,
        where: { id: id as any },
      });
      return result;
    } catch (err) {
      this.handleError(err, 'findById');
    }
  }

  /**
   * Update from id
   *
   * @param id
   * @param body Body
   * @returns {Promise<T>}
   */
  async update(
    id: number,
    body: Partial<Omit<T, 'id'>>,
  ): Promise<UpdateResult> {
    try {
      this.logger.update(id, body);
      const result = await this.repository.update(id, body as any);
      if (this.injectDateProperties === true) {
        this.setDateProperties(body, true);
      }
      return result;
    } catch (err) {
      this.handleError(err, 'update');
    }
  }

  /**
   * Get all data
   *
   * @returns {T[]}
   */
  async findAll(): Promise<T[]> {
    try {
      this.logger.findAll();
      const items = await this.repository.find();
      if (!items || items.length == 0) {
        return [];
      }
      return items;
    } catch (err) {
      this.handleError(err, 'findAll');
    }
  }

  /**
   *
   * Delete data by id
   *
   * @param id
   * @returns {Promise<T>}
   */
  async deleteById(id: string | number): Promise<DeleteResult> {
    try {
      this.logger.deleteById(id);
      const result = await this.repository.delete(id);
      return result;
    } catch (err) {
      this.handleError(err, 'deleteById');
    }
  }

  /**
   * Find one data by id
   *
   * @param criteria
   * @returns {Promise<T>}
   */
  async findOne(criteria: FindOneOptions<T>): Promise<T> {
    try {
      this.logger.findOne(criteria);
      const result = await this.repository.findOne(criteria);
      return result;
    } catch (err) {
      this.handleError(err, 'findOne');
    }
  }

  /**
   * Find elements paginate
   */
  async findWithPagination(
    criteria: FindOptionsWhere<T>,
    options: MssqlQueryOptions,
    search?: string,
    relations?: string[],
  ): Promise<IDataResults<T>> {
    search = decodeURIComponent(search || '');

    this.logger.findWithPagination(criteria, options, search);

    let where = [criteria];

    if (search.length > 0) {
      const conditionsStr = search.split('&').filter(c => !c.includes('||'))
      const orConditionsStr = search.split('&').filter(c => c.includes('||')).map(c => c.replace('||', ''));

      let conditions: any = { ...this.formatConditions(conditionsStr)};
      conditions = this.verificaCondicoes(conditions, criteria);

      /**
       * Agrupar condições OR em um array
       */
      if(orConditionsStr.length) {
        const aux = [];
        const orConditions = this.formatConditions(orConditionsStr);

        for (const key in orConditions) {
          aux.push({ [key]: orConditions[key], ...conditions });
        }

        where = aux;
      } else {
        where = [conditions];
      }
    }

    const order = {};

    if (options.sort) {
      order[options.sort] = options.order;
    }

    const [results, count] = await this.repository.findAndCount({
      where,
      skip: options.offset,
      take: options.limit,
      relations,
      order,
    });

    return { results, count };
  }

  /**
   * Find elements
   */
  async findWhere(criteria: ObjectLiteral): Promise<IDataResults<T>> {
    this.logger.find(criteria);
    const queryBuilder = this.repository.createQueryBuilder(
      this.repository.target['name'],
    );
    queryBuilder.where(criteria);
    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();
    return { results: entities, count: itemCount };
  }

  /**
   *
   * Delete data by id
   *
   * @param criteria
   * @returns {Promise<T>}
   */
  async delete(criteria: FindOptionsWhere<T>): Promise<DeleteResult> {
    try {
      this.logger.delete(criteria);
      const result = await this.repository.delete(criteria);
      return result;
    } catch (err) {
      this.handleError(err, 'delete');
    }
  }

  protected formatConditions(conditions: string[]): object {
    const criteria = {};

    for (const condition of conditions) {
      const [key, value] = condition.split('=');

      let valueCriteria: any = value;

      if (value.includes('%')) {
        valueCriteria = Like(value);
      } else if (value.includes('?')) {
        valueCriteria = Raw((alias) => `(${alias} = '${value.replace('?', '')}' OR ${alias} IS NULL)`);
      } else if (value.includes(',')) {
        valueCriteria = In(value.split(','));
      } else if (value.includes('..')) {
        const [start, end] = value.split('..');
        valueCriteria = Between(start, end);
      } else if (value.includes('!')) {
        valueCriteria = Not(value.replace('!', ''));
      } else if (value.includes('null')) {
        valueCriteria = IsNull();
      }

      /**
       * Cria um objeto para o "value" se o "key" possuir "." (ponto)
       * Ex: key = veiculo.placa -> value = { placa: <value>}
       * Então: criteria = { veiculo: { placa: <value> } ... }
       */
      if (key.includes('.')) {
        const keys = key.split('.');
        const firstKey = keys.shift();

        let obj = {};

        for (let i = keys.length - 1; i >= 0; i--) {
          if (i === keys.length - 1) {
            obj = { [keys[i]]: valueCriteria };
          } else {
            obj = { [keys[i]]: obj };
          }
        }

        criteria[firstKey] = { ...criteria[firstKey], ...obj };
      } else {
        criteria[key] = valueCriteria;
      }
    }

    return criteria;
  }

  protected verificaCondicoes(condicoes: object, objeto: Object): object {
    for(const key in objeto) {
      if(condicoes[key] && condicoes[key] instanceof Object) {
          condicoes[key] = this.verificaCondicoes(condicoes[key], objeto[key])
      }
      else {
        condicoes[key] = objeto[key]
      }
    }
    return condicoes
  }

  /**
   * Set createAt and updatedAt with date GMT-3
   * Update false not set updateAt
   *
   * @param body T
   */
  protected setDateProperties(body: any, update = false) {
    if (body) {
      if (!update) {
        body.createdAt = new Date().toDateGMT3Offset();
        body.updatedAt = null;
      } else {
        body.updatedAt = new Date().toDateGMT3Offset();
      }
    }
  }
  /**
   * Handle error
   */
  protected handleError(error: any, funcName: string) {
    const message = error instanceof Error ? error.message : error;
    this.logger.error(`${funcName ?? ''}: ${message}`);
    // if ('errors' in error && error.errors?.status) {
    //   const internalMessage = error.errors.status;
    //   this.logger.error(`${funcName ?? ''} ${internalMessage}`);
    // }
    throw error;
  }

  /**
   * Print logs
   */
  protected log(message: any) {
    this.logger.log(message);
  }
}
/**
 * Builder repository from repository typeorm
 *
 * Use: ```@InjectRepository(T) protected repository: Repository<T>```
 */
export abstract class BaseEntityRepository<
  T extends BaseEntity,
> extends BaseRepository<T> {
  constructor(repository: Repository<T>) {
    super(undefined, repository);
  }
}
