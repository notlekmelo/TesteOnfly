import { X_API_KEY } from '@common/constants';
import { ApiErrorResponse, ApiDataResponse } from '@common';
import { Controller, Get, Query, UseGuards, Post, Put, Body, Param, Delete } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards';
import { JwtPayload } from '@modules/auth/dto';
import { UserQuery } from '@shared';
import { IDespesaUsecase } from './interfaces/iDespesa.usecase'; 
import { DespesaDto } from './dto';
import { QueryDto } from '@common';
import { DespesaModel } from './model';
import { PostDespesaPipe } from './pipes/post-despesa.pipa';

@ApiSecurity(X_API_KEY)
@UseGuards(JwtAuthGuard)
@ApiTags('Despesas')
@Controller('despesas')
export class DespesaController {
  constructor(private service: IDespesaUsecase) {}

  // Busca todas as despesas do usuário
  @Get()
  @ApiDataResponse({ type: DespesaDto, isArray: true })
  @ApiErrorResponse()
  get(@Query() params: QueryDto, @UserQuery() payload: JwtPayload) {
    return this.service.get(params, payload);
  }

  // Busca uma despesa específica
  @Get(':id')
  @ApiDataResponse({ type: DespesaDto, isArray: false })
  @ApiErrorResponse()
  getId(@Param('id') despesaID: number, @UserQuery() payload: JwtPayload) {
    return this.service.getID(despesaID, payload);
  }
  
  // Cadastra uma despesa
  @Post()
  @ApiDataResponse({ type: DespesaDto, isArray: true })
  @ApiErrorResponse()
  post(@Body(PostDespesaPipe) despesa: DespesaModel, @UserQuery() payload: JwtPayload) {
    return this.service.post(despesa, payload);
  }

  // Atualiza uma despesa
  @Put(':id')
  @ApiDataResponse({ type: DespesaDto, isArray: true })
  @ApiErrorResponse()
  put(@Param('id') despesaID: number, @Body(PostDespesaPipe) body: DespesaModel, @UserQuery() payload: JwtPayload) {
    return this.service.put(despesaID, body, payload);
  }

  @Delete(':id')
  @ApiDataResponse({ type: DespesaDto, isArray: true })
  @ApiErrorResponse()
  delete(@Param('id') despesaID: number, @UserQuery() payload: JwtPayload) {
    return this.service.delete(despesaID, payload);
  }
}