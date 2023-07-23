import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsOptional, Length } from 'class-validator';

export class UsuarioQueryDto {
  @IsOptional()
  @Length(24, 24, {
    message: '$property must be contains $constraint2 characteres',
  })
  @ApiProperty({ required: false, example: '' })
  @Expose({ name: 'userId' })
  userId: number;

  @ApiHideProperty()
  user: any;
}
