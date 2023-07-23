// import mssql from 'mssql';
export interface IMssqlConfig {
  server: string;
  database: string;
  port: number;
  user: string;
  password: string;
  connectionTimeout: number;
  requestTimeout: number;
  pool: {
    min: number;
    max: number;
  };
  extra: {
    trustServerCertificate: boolean;
  };
  options: {
    encrypt: boolean; // for azure use true
    enableArithAbort: boolean;
    useUTC: boolean;
  };
}
