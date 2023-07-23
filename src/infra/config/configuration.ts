import { AppConfig } from './app.config';
/**
 * Configuration (Singletone)
 *
 */
export class Configuration {
  /** Env config */
  static config: AppConfig;

  /** Alias name for config */
  static get I(): AppConfig {
    return Configuration.config;
  }
  static isDev() {
    return process.env.NODE_ENV === 'development';
  }
  static isPrd() {
    return process.env.NODE_ENV === 'production';
  }
  static isLog() {
    return process.env.ENABLE_LOGGER === 'true';
  }
}
