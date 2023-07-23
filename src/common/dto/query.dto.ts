import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryDto {
  @ApiProperty({
    description: 'Indica a query de busca',
  })
  @IsOptional()
  search?: string;

  @ApiProperty({
    description: 'Indica o número da página',
    required: true,
  })
  page: number;

  @ApiProperty({
    description: 'Indica o início dos resultados',
    required: true,
  })
  offset: number;

  @ApiProperty({
    description: 'Indica quantos resultados devem ser exibidos por página',
    required: true,
  })
  limit: number;
}
