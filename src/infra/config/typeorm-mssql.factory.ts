import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class TypeOrmMssqlFactory implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mssql',
      host: this.configService.get('TYPEORM_HOST'),
      port: +this.configService.get('TYPEORM_PORT'),
      username: this.configService.get('TYPEORM_USERNAME'),
      password: this.configService.get('TYPEORM_PASSWORD'),
      database: this.configService.get('TYPEORM_DATABASE'),
      // entities: [__dirname + '/../../modules/test/**/*.entity{.ts,.js}'],
      entities: [__dirname + '/../../data/**/*.entity{.ts,.js}'],
      migrations: [__dirname + '/../../infra/typeorm/migrations/**/*.ts'],
      synchronize: false,
      logging: false,
      logger: 'file',
      extra: {
        trustServerCertificate: true,
      },
      options: {
        encrypt: false,
        enableArithAbort: true,
        useUTC: true,
      },
    };
  }
}
