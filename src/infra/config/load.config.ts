import * as dotenv from 'dotenv';
import { AppConfig } from './app.config';
import { Configuration } from './configuration';
/**
 * Initialize env config
 */
export function loadConfig(): AppConfig {
  if (!process.env.NODE_ENV) {
    throw new Error(`Env config invalid`);
  }
  //env default is production
  const env = `${process.env.NODE_ENV}.env`;
  //load env file
  const envConfig = dotenv.config({ path: env }).parsed;
  //load dotenv to process env
  const keys = Object.keys(envConfig);
  //process env never override
  for (const key of keys) {
    //already env var
    if (process.env[key]) {
      //transfer new value for env config
      envConfig[key] = process.env[key];
    }
  }
  //set app port
  process.env.PORT = process.env.PORT || envConfig.PORT;
  //set app config and return
  return (Configuration.config = new AppConfig(envConfig));
}
