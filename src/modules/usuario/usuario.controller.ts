import { X_API_KEY } from '@common/constants';
import { ApiDataResponse, ApiErrorResponse, Public } from '@common/decorators';
import { ResponseMessage } from '@common/interfaces/response-message';
import {
  Body,
  Controller,
  HttpStatus,
  Patch,
  Post,
  UseGuards,
  Get
} from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards';
import { JwtPayload } from '@modules/auth/dto';
import { UserQuery } from '@shared';
import { IUsuarioUsecase } from './interfaces/iusuario.usecase';
import { PatchUsuarioDto, PostUsuarioDto } from './dto';

@ApiTags('Usuários')
@Controller('usuarios')
export class UsuarioController {
  constructor(private service: IUsuarioUsecase) {}

  @Public()
  @Post()
  @ApiDataResponse({
    status: HttpStatus.CREATED,
    description: 'Created',
    type: ResponseMessage,
  })
  @ApiErrorResponse()
  post(
    @Body() body: PostUsuarioDto,
  ) {
    return this.service.save(body);
  }

  @ApiSecurity(X_API_KEY)
  @UseGuards(JwtAuthGuard)
  @Patch()
  @ApiDataResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: ResponseMessage,
  })
  @ApiErrorResponse()
  patch(@Body() body: PatchUsuarioDto, @UserQuery() payload: JwtPayload) {
    return this.service.update(body, payload);
  }

  @ApiSecurity(X_API_KEY)
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiDataResponse({
    status: HttpStatus.OK,
    description: 'OK',
    type: ResponseMessage,
  })
  @ApiErrorResponse()
  get(@UserQuery() payload: JwtPayload){
    return this.service.get(payload)
  }
}
