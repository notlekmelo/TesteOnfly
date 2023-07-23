import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsOptional, Length } from 'class-validator';

export class PostUsuarioDto {
  @ApiProperty({ description: 'Nome completo' })
  @Length(4, 100, { message: 'O nome deve conter entre 4 e 100 caracteres' })
  nome: string;

  @ApiProperty({ description: 'Email', required: false })
  @IsEmail({}, { message: 'Email is not valid' })
  @Length(4, 100, { message: 'O email deve conter até 100 caracteres' })
  @IsOptional()
  email: string;
  
  @ApiProperty({ description: 'Login', required: false })
  @Length(4, 100, { message: 'O login deve conter entre 4 e 30 caracteres' })
  login: string;

  @ApiProperty({ description: 'CPF', required: false })
  @IsOptional()
  @Length(11, 11, { message: 'CPF deve conter 11 caracteres' })
  cpf: string;

  @ApiProperty({ description: 'Senha' })
  @Length(4, 30, { message: 'A senha deve conter entre 4 e 30 caracteres' })
  senha: string;
}
