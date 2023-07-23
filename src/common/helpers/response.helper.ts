import { Response } from 'express';

export interface TypeCacheControl {
  cacheControl:
    | 'max-age=1d'
    | 'max-age=7d'
    | 'max-age=10d'
    | 'max-age=15d'
    | 'max-age=20d'
    | 'max-age=30d'
    | 'max-age=60d';
}

interface IDataWrite {
  contentType: string;
  buffer: Buffer;
}

export type IResponseData = TypeCacheControl & IDataWrite;

export class ResponseHelper {
  /**
   * Download file from buffer
   */
  static download(res: Response, data: IResponseData) {
    res.setHeader('Content-Type', data.contentType);
    res.setHeader('Cache-Control', data.cacheControl);
    res.end(data.buffer);
  }

  /**
   * Create cache data to be downloaded
   */
  static createCacheData(
    data: IDataWrite,
    cacheControl:
      | 'max-age=1d'
      | 'max-age=7d'
      | 'max-age=10d'
      | 'max-age=15d'
      | 'max-age=20d'
      | 'max-age=30d'
      | 'max-age=60d'
      | undefined,
  ): IResponseData {
    return {
      contentType: data.contentType,
      buffer: data.buffer,
      cacheControl: cacheControl ?? 'max-age=30d',
    };
  }
}
