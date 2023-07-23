import { ApiProperty } from '@nestjs/swagger';

/**
 * Response error api
 */
export class ResponseErrorMessage {
  @ApiProperty()
  message: string[];
  @ApiProperty()
  status: number;
  @ApiProperty()
  statusText: string;
  @ApiProperty()
  log: string;
  @ApiProperty()
  path: string;
}

/**
 * Response message api
 */
export class ResponseMessage {
  @ApiProperty()
  message: string;
}

/**
 * Response post api
 */
export class ResponsePostMessage {
  @ApiProperty()
  id: string;
  @ApiProperty()
  message: string;
}
