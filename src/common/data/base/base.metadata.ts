import { EntityMetadata, Repository } from 'typeorm';
export class BaseMetadata<T> {
  constructor(protected dataSource: Repository<T>) {}

  get metadata(): EntityMetadata {
    return this.dataSource.metadata;
  }
  get tableName(): string {
    return this.metadata.tableName;
  }

  get getPrimaryKey(): string {
    const entity = this.metadata;
    return entity.primaryColumns.length > 0
      ? entity.primaryColumns[0].databaseName
      : '';
  }

  checkPropertiesInvalid(data: any): Promise<any> {
    // all columns
    const columns = this.metadata.ownColumns.map(
      (column) => column.propertyName,
    );
    // all keys
    const keys = Object.keys(data);
    // attributs not belong entity
    const attribInvalid = keys.filter(
      (atributo) => !columns.includes(atributo),
    );
    // delete attribut invalid
    for (const att of attribInvalid) {
      delete data[att];
    }
    return data;
  }
}
