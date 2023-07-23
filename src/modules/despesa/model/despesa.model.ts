import { ApiProperty } from "@nestjs/swagger";

export class DespesaModel {
    @ApiProperty()
    descricao: string;
    
    @ApiProperty()
    data: string;
    
    @ApiProperty()
    valor: number;
}