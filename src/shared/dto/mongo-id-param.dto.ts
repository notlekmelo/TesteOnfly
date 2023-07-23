import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsString, Length } from 'class-validator';

export class MongoIdParamDto {
  @Length(24, 24, {
    message: '$property must be contains $constraint2 characteres',
  })
  @IsString({ message: '$property is required and string' })
  @ApiProperty({ required: false, default: '', type: String })
  @Expose({ name: 'id' })
  id: string;
}
