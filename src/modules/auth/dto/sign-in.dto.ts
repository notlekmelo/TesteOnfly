import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional } from 'class-validator';

export class SignInDto {
  @ApiProperty({ description: 'login', required: false })
  login: string;

  @ApiProperty({ description: 'Password', required: true })
  senha: string;
}
