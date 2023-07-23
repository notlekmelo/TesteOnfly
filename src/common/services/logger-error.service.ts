import { Logger } from '@nestjs/common';

/**
 * Generate log with constructor name
 */
export class LoggerErrorService {
  private readonly logger: Logger;
  private readonly _className: string;
  readonly showLog: boolean;
  /**
   * Builder logger class
   *
   * @param classObj Use this
   * @param showLog Flag to enable or disable logs
   */
  constructor(classObj: any, showLog = true) {
    if (!classObj || !classObj?.constructor) {
      throw new Error('Class object required at ' + LoggerErrorService.name);
    }
    this._className = classObj.constructor.name;
    this.showLog = showLog;
    this.logger = new Logger(this._className);
    if (showLog === false) {
      const none = function () {
        return;
      };
      //cancel all logs except error
      this.log = none;
      this.debug = none;
      this.warn = none;
      this.verbose = none;
    }
  }

  log(err: any, optionalParams?: any) {
    const message = err instanceof Error ? err.message : err;
    if (optionalParams) {
      const params =
        optionalParams instanceof Object
          ? JSON.stringify(optionalParams)
          : optionalParams;
      this.logger.log(`${message} ${params}`);
    } else {
      this.logger.log(`${message}`);
    }
  }
  error(err: any) {
    const message = err instanceof Error ? err.message : err;
    this.logger.error(`${message}`);
  }
  debug(err: any) {
    const message = err instanceof Error ? err.message : err;
    this.logger.debug(`${message}`);
  }
  verbose(err: any) {
    const message = err instanceof Error ? err.message : err;
    this.logger.verbose(`${message}`);
  }
  warn(err: any) {
    const message = err instanceof Error ? err.message : err;
    this.logger.warn(`${message}`);
  }
}
