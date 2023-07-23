import { ApiProperty } from '@nestjs/swagger';
import { Length } from 'class-validator';

export class PatchUsuarioDto {
  @ApiProperty({ description: 'Nome completo', required: false })
  @Length(4, 100, { message: 'O nome deve conter entre 4 e 100 caracteres' })
  nome: string;

  @ApiProperty({ description: 'Email', required: false })
  @Length(0, 100, { message: 'O email deve conter até  100 caracteres' })
  email: string;
  
  @ApiProperty({ description: 'Login', required: false })
  @Length(4, 30, { message: 'O nome deve conter entre 4 e 30 caracteres' })
  login: string;

  @ApiProperty({ description: 'CPF', required: false })
  @Length(11, 11, { message: 'O nome deve conter entre 4 e 100 caracteres' })
  cpf: string;

  @ApiProperty({ description: 'Senha atual', required: false })
  senhaAtual: string;

  @ApiProperty({ description: 'Senha', required: false })
  @Length(4, 30, { message: 'A senha deve conter entre 4 e 30 caracteres' })
  senha: string;
}
