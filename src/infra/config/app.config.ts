import { ApiConfig } from './api-config';
import { IMssqlConfig } from './mssql.config';
import { ServerConfig } from './server.config';

/**
 * App Config
 *
 * Encapsulates environment variables
 *
 */
export class AppConfig {
  mssqlConfig: IMssqlConfig;
  redis: ServerConfig;
  apiEmail: ApiConfig;
  apiAuthentication: ApiConfig;
  diretorioAnexos: string;
  //TODO integration
  // apiStorage: ApiConfig;

  /**
   * Config should be loading
   *
   * @param config
   */
  constructor(config: any) {
    this.mssqlConfig = {
      server: config.TYPEORM_HOST,
      database: config.TYPEORM_DATABASE,
      port: +config.TYPEORM_PORT,
      user: config.TYPEORM_USERNAME,
      password: config.TYPEORM_PASSWORD,
      connectionTimeout: +config.TYPEORM_CONNECTION_TIMEOUT,
      requestTimeout: +config.TYPEORM_REQUEST_TIMEOUT,
      pool: {
        min: +config.TYPEORM_POOL_MIN,
        max: +config.TYPEORM_POOL_MAX,
      },
      extra: {
        trustServerCertificate: true,
      },
      options: {
        encrypt: false,
        enableArithAbort: true,
        useUTC: true,
      },
    };

    //redis instance
    this.redis = new ServerConfig({
      name: 'REDIS',
      host: config.REDIS_HOST,
      port: config.REDIS_PORT,
    });
    this.apiAuthentication = new ApiConfig({
      url: config.API_AUTHENTICATION_URL,
    });
    this.apiEmail = new ApiConfig({
      url: config.API_EMAIL_URL,
      username: config.API_EMAIL_USERNAME,
      password: config.API_EMAIL_PASSWORD,
    });

    this.diretorioAnexos = config.DIRETORIO_ANEXOS;
  }
}
