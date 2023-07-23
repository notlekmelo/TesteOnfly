import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import {
  AuthModule,
  DespesaModule,
  UsuarioModule,
} from './modules';

// import { EmailModule } from '@app/email';

import { RedisModule } from '@common';
import { AppInterceptor } from '@core';
import { TypeOrmMssqlFactory } from '@infra';
import { JwtAuthGuard } from '@modules/auth/guards';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: TypeOrmMssqlFactory,
    }),
    //Cache module
    RedisModule,
    //App modules
    AuthModule,
    DespesaModule,
    UsuarioModule,
    //Libs
    // EmailModule,
    //Global
  ],
  providers: [
    {
      /**
       * Use an interceptor to set default response { data }
       */
      provide: APP_INTERCEPTOR,
      useClass: AppInterceptor,
    },
    {
      /**
       * The vast majority of endpoints should be protected by default
       *
       * Register the authentication guard as a global guard and instead of using @UseGuards(JwtAuthGuard)
       *
       * Decorator on top of each controller, you could simply flag which routes should be public using @Public()
       *
       */
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
})
export class AppModule {}
