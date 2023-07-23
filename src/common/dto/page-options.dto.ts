import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsBoolean, IsInt, IsOptional, Max, Min } from 'class-validator';
/**
 * Pagination parameters default
 */
export class PageOptionsDto {
  @IsBoolean()
  @Transform(({ value }) => value === 'true')
  @ApiPropertyOptional({ default: true })
  readonly paginate: boolean = true;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @IsOptional()
  readonly page: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    default: 20,
    // maximum: 50,
  })
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(50)
  @IsOptional()
  readonly limit: number = 20;

  /**
   * Offset from page
   */
  get offset(): number {
    return (this.page - 1) * this.limit;
  }
}
