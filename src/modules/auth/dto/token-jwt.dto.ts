import { ApiProperty } from '@nestjs/swagger';

export class UsuarioDto {
  @ApiProperty()
  nome: string;
}

export class JwtTokenDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;

  @ApiProperty()
  primeiroAcesso: 'S' | 'N';

  @ApiProperty()
  usuario: UsuarioDto;
}
