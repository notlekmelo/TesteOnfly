import { Logger } from '@nestjs/common';
import * as mssql from 'mssql';
import { Configuration } from './../config/configuration';
const logger = new Logger('mssql-check-connection');

export default async function mssqCheckConnection(callback?: any) {
  const client = new mssql.ConnectionPool(Configuration.I.mssqlConfig);
  try {
    // connect the client to the server
    await client.connect();
    if (callback) callback();
    logger.log('Connected successfully to server');
    return true;
  } catch (err) {
    logger.error(`Fail connect sql server: ${err.message}`);
    throw err;
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
