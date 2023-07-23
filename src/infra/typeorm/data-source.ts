import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { loadConfig } from '../config/load.config';
import CustomNameConstraintStrategy from './custom-name-constraint.strategy';

loadConfig();

export const AppDataSource = new DataSource({
  type: 'mssql',
  host: process.env.TYPEORM_HOST,
  port: +process.env.TYPEORM_PORT,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  synchronize: false,
  logging: false,
  subscribers: [],
  extra: {
    trustServerCertificate: true,
  },
  options: {
    enableArithAbort: true,
    useUTC: true,
  },
  entities: [__dirname + '/../../data/**/*.entity{.ts.js}'],
  migrations: [__dirname + '/../typeorm/migrations/**/*{.ts,.js}'],
  namingStrategy: new CustomNameConstraintStrategy(),
});
