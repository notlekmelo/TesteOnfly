import {
  ApiDataResponse,
  ApiErrorResponse,
  Public,
  ResponseMessage,
} from '@common';
import { X_API_KEY } from '@common/constants';
import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Post,
  Req,
  UseGuards
} from '@nestjs/common';
import { ApiHeader, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { UserQuery } from '@shared';
import { Request } from 'express';
import { JwtPayload, JwtTokenDto, SignInDto } from './dto';
import { JwtAuthGuard, RefreshTokenGuard } from './guards';
import { IAuthUsecase } from './interfaces/iauth.usecase';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private service: IAuthUsecase) {}

  @Post('token')
  @ApiDataResponse({
    status: HttpStatus.CREATED,
    type: JwtTokenDto,
  })
  @ApiErrorResponse()
  @Public()
  signIn(@Body() body: SignInDto, @Req() req: Request) {
    return this.service.signIn(body);
  }

  /**
   * Refresh token
   * */
  @ApiDataResponse({ type: JwtTokenDto })
  @ApiErrorResponse()
  @Public()
  @UseGuards(RefreshTokenGuard)
  @Get('refresh-token')
  refreshToken(@Req() req: Request) {
    return this.service.refreshToken(req.user as JwtPayload);
  }

  /**
   * Revoke access and refresh token
   */
  @Get('logout')
  @ApiSecurity(X_API_KEY)
  @UseGuards(JwtAuthGuard)
  @ApiDataResponse({ status: HttpStatus.CREATED, type: ResponseMessage })
  @ApiErrorResponse()
  logout(@UserQuery() payload: JwtPayload) {
    return this.service.signOut(payload);
  }

}
