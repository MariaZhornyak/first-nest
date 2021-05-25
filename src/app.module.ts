import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PublicationModule } from './publication/publication.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { config } from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PublicationController } from './publication/publication.controller';

@Module({
  imports: [
    PublicationModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: config.dbURL,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer
      .apply(AuthMiddleware)
      .exclude(
        { path: 'posts', method: RequestMethod.POST },
        { path: 'posts', method: RequestMethod.PUT },
        { path: 'posts', method: RequestMethod.DELETE },
        'posts/(.*)'
      )
      .forRoutes(PublicationController);
  }
}
