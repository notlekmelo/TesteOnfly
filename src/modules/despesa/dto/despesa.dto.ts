import { ApiProperty } from '@nestjs/swagger';

export class DespesaDto {
  @ApiProperty()
  id: number;

  @ApiProperty()
  descricao: string;

  @ApiProperty()
  valor: number;

  @ApiProperty()
  data: Date;

  @ApiProperty()
  usuarioId: number;

  @ApiProperty()
  usuario: string;

  @ApiProperty()
  inseridoEm: Date;

  @ApiProperty()
  modificadoEm: Date;
}
