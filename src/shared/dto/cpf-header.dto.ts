import { ApiProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { IsDefined, Length } from 'class-validator';

export class CpfHeaderDto {
  @IsDefined({ message: 'CPF required' })
  @Length(11, 11, {
    message: 'CPF must be $constraint1 caracteres',
  })
  @ApiProperty()
  @Expose({ name: 'cpf' })
  cpf: string;
}
