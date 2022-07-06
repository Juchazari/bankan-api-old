import { Module, Inject, MiddlewareConsumer, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import * as RedisStore from 'connect-redis';
import * as session from 'express-session';
import * as passport from 'passport';
import { RedisClient } from 'redis';

import {
  DatabaseModule,
  RedisModule,
  REDIS,
  AuthModule,
  UsersModule,
  BoardGroupsModule,
  BoardsModule,
  SectionsModule,
  TasksModule,
  LabelsModule,
  CommentsModule,
  AttachmentsModule
} from './modules';

@Module({
  imports: [
    ConfigModule.forRoot(),
    DatabaseModule,
    RedisModule,
    AuthModule,
    UsersModule,
    BoardGroupsModule,
    BoardsModule,
    SectionsModule,
    TasksModule,
    LabelsModule,
    CommentsModule,
    AttachmentsModule
  ]
})
export class AppModule implements NestModule {
  constructor(
    @Inject(REDIS) private readonly redis: RedisClient,
    private configService: ConfigService
  ) {}

  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(
        session({
          store: new (RedisStore(session))({
            client: this.redis,
            logErrors: true
          }),
          saveUninitialized: false,
          secret: this.configService.get('SECRET'),
          resave: false,
          unset: 'destroy',
          cookie: {
            sameSite: true,
            httpOnly: false,
            maxAge: 24 * 60 * 60 * 1000
          }
        }),
        passport.initialize(),
        passport.session()
      )
      .forRoutes('*');
  }
}
