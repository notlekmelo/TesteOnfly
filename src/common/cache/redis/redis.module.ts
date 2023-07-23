// import { RedisConfigFactory } from '@infra/config/redis.config';
import { CacheModule, Global, Module } from '@nestjs/common';
import { CACHE_1_DAY } from '@shared/constants';
import { RedisService } from './redis.service';
@Global()
@Module({
  imports: [
    CacheModule.register({
      isGlobal: true,
      ttl: CACHE_1_DAY, //default
    }),
    // i wont use redis
    // CacheModule.registerAsync({
    //   useClass: RedisConfigFactory,
    //   isGlobal: true,
    // }),
  ],
  providers: [RedisService],
  exports: [RedisService],
})
export class RedisModule {}
