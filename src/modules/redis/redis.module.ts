import { Module } from '@nestjs/common';
import * as Redis from 'redis';

export const REDIS = Symbol('AUTH:REDIS');

@Module({
  providers: [
    {
      provide: REDIS,
      useValue: Redis.createClient({ url: 'redis://127.0.0.1:6379' })
    }
  ],
  exports: [REDIS]
})
export class RedisModule {}
