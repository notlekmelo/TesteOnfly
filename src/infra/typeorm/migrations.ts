import { Logger } from '@nestjs/common/services';
import 'reflect-metadata';
import { AppDataSource } from './data-source';
const logger = new Logger('TypeOrm.migrations');
// funcao para rodar todas as migrations pendentes
export async function runMigrations() {
  const dataSource = await AppDataSource.initialize();
  logger.log('Running migrations ' + process.env.NODE_ENV);
  return dataSource.runMigrations();
}
