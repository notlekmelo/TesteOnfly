import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
/**
 * Main search app
 */
export class CodesDto {
  // @ArrayUnique()
  @Transform(function ({ value }) {
    if (typeof value === 'object') return value;
    return value.split(',');
  })
  @ApiProperty({ type: String, example: 'CODE01,CODE02' })
  codes?: string[];

  //Aux for cache
  @ApiHideProperty()
  key: string;
}
